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

# Read FAQ file
with open("data/customer_faq.txt", "r", encoding="utf-8") as file:
    text = file.read()

# Split FAQ into smaller sections
chunks = [chunk.strip() for chunk in text.split("\n\n") if chunk.strip()]

# Create embeddings
embeddings = model.encode(chunks)

# Prepare vectors for Pinecone
vectors = []

for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
    vectors.append({
        "id": f"faq-{i}",
        "values": embedding.tolist(),
        "metadata": {
            "text": chunk
        }
    })

# Upload vectors
index.upsert(vectors=vectors)

print(f"Successfully uploaded {len(vectors)} FAQ sections to Pinecone!")