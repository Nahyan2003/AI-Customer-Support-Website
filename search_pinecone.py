from dotenv import load_dotenv
from pinecone import Pinecone
from sentence_transformers import SentenceTransformer
import os

load_dotenv()

# Load embedding model
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

# Connect to Pinecone
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
index = pc.Index("customer-support-agent")

# User question
question = "How long do I have to request a refund?"

# Convert question into an embedding
query_embedding = model.encode(question).tolist()

# Search Pinecone
results = index.query(
    vector=query_embedding,
    top_k=3,
    include_metadata=True
)

print("\nRelevant information:\n")

for match in results["matches"]:
    print(match["metadata"]["text"])
    print("Score:", match["score"])
    print("---")