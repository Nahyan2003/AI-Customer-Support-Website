from dotenv import load_dotenv
from pinecone import Pinecone
from sentence_transformers import SentenceTransformer
from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate
from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint
import os

load_dotenv()

# Pinecone
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
index = pc.Index("customer-support-agent")

# Embedding model
embedding_model = SentenceTransformer(
    "sentence-transformers/all-MiniLM-L6-v2"
)

# Hugging Face chat model
endpoint = HuggingFaceEndpoint(
    repo_id="Qwen/Qwen2.5-7B-Instruct",
    huggingfacehub_api_token=os.getenv("HF_TOKEN"),
    max_new_tokens=200,
    temperature=0.2
)

llm = ChatHuggingFace(llm=endpoint)


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


prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """You are a helpful customer support agent.

Use ONLY the information provided in the company knowledge base.

If the answer is not available in the knowledge base,
say that you do not have enough information.

Company Knowledge Base:
{context}"""
    ),
    (
        "human",
        "{question}"
    )
])


question = "Can I get a refund after 20 days?"

documents = retrieve_documents(question)

context = "\n\n".join(
    document.page_content
    for document in documents
)

messages = prompt.format_messages(
    context=context,
    question=question
)

response = llm.invoke(messages)

print("\nAI Response:\n")
print(response.content)