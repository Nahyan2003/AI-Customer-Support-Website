from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from pinecone import Pinecone
from sentence_transformers import SentenceTransformer
from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate
from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint
from policy_checker import check_policy
import os

# Load environment variables
load_dotenv()

app = FastAPI()

# ---------------------------
# CORS - Allow Lovable Frontend
# ---------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------
# Pinecone
# ---------------------------
pc = Pinecone(
    api_key=os.getenv("PINECONE_API_KEY")
)

index = pc.Index("customer-support-agent")


# ---------------------------
# Embedding Model
# ---------------------------
embedding_model = SentenceTransformer(
    "sentence-transformers/all-MiniLM-L6-v2"
)


# ---------------------------
# Hugging Face LLM
# ---------------------------
endpoint = HuggingFaceEndpoint(
    repo_id="Qwen/Qwen2.5-7B-Instruct",
    huggingfacehub_api_token=os.getenv("HF_TOKEN"),
    max_new_tokens=200,
    temperature=0.2
)

llm = ChatHuggingFace(
    llm=endpoint
)


# ---------------------------
# Request Model
# ---------------------------
class Question(BaseModel):
    question: str


# ---------------------------
# Retrieve Documents
# ---------------------------
def retrieve_documents(question: str):

    query_embedding = embedding_model.encode(
        question
    ).tolist()

    results = index.query(
        vector=query_embedding,
        top_k=3,
        include_metadata=True
    )

    documents = []

    for match in results["matches"]:

        documents.append(
            Document(
                page_content=match["metadata"]["text"],
                metadata={
                    "score": match["score"]
                }
            )
        )

    return documents


# ---------------------------
# Prompt
# ---------------------------
prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """You are a professional customer support agent.

Answer the customer's question using ONLY the company
knowledge base.

Rules:

- Do not invent information.
- Do not contradict the knowledge base.
- If the answer is not available, say:
  "I don't have enough information in the company knowledge base
  to answer this question."
- Keep the answer short and professional.

Company Knowledge Base:
{context}"""
    ),
    (
        "human",
        "Customer Question: {question}"
    )
])


# ---------------------------
# Home
# ---------------------------
@app.get("/")
def home():

    return {
        "message": "AI Customer Support Agent is running!"
    }


# ---------------------------
# Ask
# ---------------------------
@app.post("/ask")
def ask_question(data: Question):

    # --------------------------------
    # 1. Check deterministic policies
    # --------------------------------

    policy_answer = check_policy(
        data.question
    )

    if policy_answer:

        return {
            "question": data.question,
            "answer": policy_answer,
            "confidence": 1.0,
            "source": "policy_checker"
        }


    # --------------------------------
    # 2. RAG Retrieval
    # --------------------------------

    documents = retrieve_documents(
        data.question
    )

    context = "\n\n".join(
        document.page_content
        for document in documents
    )

    confidence = (
        documents[0].metadata["score"]
        if documents
        else 0
    )


    # --------------------------------
    # 3. LLM Response
    # --------------------------------

    messages = prompt.format_messages(
        context=context,
        question=data.question
    )

    response = llm.invoke(
        messages
    )


    # --------------------------------
    # 4. Return Response
    # --------------------------------

    return {
        "question": data.question,
        "answer": response.content,
        "confidence": round(
            confidence,
            3
        ),
        "source": "rag"
    }