# AI Customer Support Agent

An AI-powered customer support web application that combines deterministic business rules with Retrieval-Augmented Generation (RAG) to deliver accurate, context-aware customer support responses. The system uses a hybrid approach where business-critical policies are handled through predefined rules, while general customer queries are answered using a vector database and Large Language Model (LLM).

## Live Demo

Add your deployed application URL here:

```text
Frontend: https://your-frontend-url
Backend API: https://your-backend-url
```

## Features

* AI-powered customer support chatbot
* FastAPI REST API backend
* Modern interactive frontend built with Lovable
* Retrieval-Augmented Generation (RAG)
* Pinecone vector database integration
* Hugging Face LLM integration
* Sentence Transformer embeddings
* Policy-based deterministic responses
* Confidence scoring
* Source attribution (Policy Checker / RAG)
* Escalation handling for unknown questions
* Docker containerization
* Railway cloud deployment
* n8n workflow automation

## System Architecture

```text
User
  ↓
Lovable Frontend
  ↓
FastAPI Backend
  ↓
Policy Checker
       ↓
      OR
       ↓
Pinecone Vector Database
  ↓
LangChain RAG Pipeline
  ↓
Hugging Face LLM
  ↓
Response
```

## Tech Stack

### Frontend

* Lovable
* React
* TypeScript
* Tailwind CSS

### Backend

* FastAPI
* Python
* Pydantic
* Uvicorn

### AI & Machine Learning

* LangChain
* Pinecone
* Sentence Transformers
* Hugging Face Inference API
* Qwen 2.5 7B Instruct

### Automation & Deployment

* n8n
* Docker
* Railway
* GitHub

## Project Workflow

### Policy-Based Questions

Example:

> Can I get a refund after 20 days?

```text
User Question
      ↓
Policy Checker
      ↓
Direct Business Rule Match
      ↓
Response Returned
```

### General Knowledge Questions

Example:

> What is your shipping policy?

```text
User Question
      ↓
Generate Embedding
      ↓
Pinecone Search
      ↓
Retrieve Relevant Documents
      ↓
LLM Response Generation
      ↓
Response Returned
```

### Unknown Questions

Example:

> Do you provide international shipping?

```text
User Question
      ↓
RAG Search
      ↓
No Relevant Information
      ↓
Escalation Response
```

## Screenshots

### Home Page

Add screenshot here.

### Policy-Based Response

Add screenshot here.

### RAG-Based Response

Add screenshot here.

### Escalation Response

Add screenshot here.

### n8n Workflow

Add screenshot here.

### FastAPI Swagger Documentation

Add screenshot here.

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/AI-Customer-Support-Agent.git
cd AI-Customer-Support-Agent
```

### Backend Setup

Create a virtual environment:

```bash
python -m venv venv
```

Activate environment:

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file:

```env
PINECONE_API_KEY=your_pinecone_api_key
HF_TOKEN=your_huggingface_token
```

Start FastAPI:

```bash
uvicorn main:app --reload
```

Backend URL:

```text
http://localhost:8000
```

Swagger Documentation:

```text
http://localhost:8000/docs
```

### Frontend Setup

```bash
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:8080
```

## API Endpoint

### Ask Question

**POST** `/ask`

Request:

```json
{
  "question": "Can I get a refund after 20 days?"
}
```

Response:

```json
{
  "question": "Can I get a refund after 20 days?",
  "answer": "Yes. You can request a refund within 30 days of purchase, provided the product is unused and in its original condition.",
  "confidence": 1,
  "source": "policy_checker"
}
```

## Example Questions

Try the following questions:

```text
Can I get a refund after 20 days?
```

```text
What is your shipping policy?
```

```text
How long does express shipping take?
```

```text
Do you provide international shipping?
```

## Future Improvements

* User authentication
* Conversation history
* Admin dashboard
* Multi-language support
* Sentiment analysis
* Human agent handoff
* Analytics dashboard
* WhatsApp integration
* Email integration
* Voice-based customer support

## Author

**Mohammed Nahyan Ashraf**

AI & Data Science Engineer

* GitHub: https://github.com/Nahyan2003
* LinkedIn: https://www.linkedin.com/in/mohammed-nahyan-ashraf-98800b223/

## License

This project is intended for educational and portfolio purposes.
