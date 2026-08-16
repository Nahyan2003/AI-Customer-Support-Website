# AI Customer Support Agent

An AI-powered customer support application that combines deterministic business rules with Retrieval-Augmented Generation (RAG) to answer customer questions accurately and efficiently.

## Features

* AI-powered customer support assistant
* FastAPI REST API backend
* Pinecone vector database integration
* LangChain RAG pipeline
* Hugging Face LLM integration
* Policy-based deterministic answers
* Confidence scoring
* Source attribution (Policy Checker / RAG)
* Escalation handling for unknown questions
* n8n workflow automation
* Modern Lovable frontend

## Architecture

User → Lovable Frontend → FastAPI → Policy Checker / RAG → Pinecone → Hugging Face LLM → Response

## Tech Stack

### Frontend

* Lovable
* React
* TypeScript
* Tailwind CSS

### Backend

* FastAPI
* Python

### AI & Data

* LangChain
* Pinecone
* Sentence Transformers
* Hugging Face

### Automation

* n8n

## Screenshots

(Add screenshots here)

## Installation

### Backend

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
npm install
npm run dev
```

## Example API Request

```json
{
  "question": "Can I get a refund after 20 days?"
}
```

## Example Response

```json
{
  "question": "Can I get a refund after 20 days?",
  "answer": "Yes. You can request a refund within 30 days of purchase, provided the product is unused and in its original condition.",
  "confidence": 1,
  "source": "policy_checker"
}
```
