# RAG PDF Query Application

This project is a prototype Retrieval-Augmented Generation (RAG) system that allows users to upload PDF documents, store them in a vector database, and query them using natural language. The backend is built with FastAPI and LangChain, and the frontend is built with React.

## Features

- **Upload PDF:** Users can upload a PDF document, which is parsed and stored as embeddings in an in-memory FAISS vector database.
- **Query:** Users can enter a natural language query. The system retrieves the most relevant chunks from the PDF and summarizes/answers the query using the Llama 3 language model via Ollama.
- **Frontend:** A React app allows users to upload PDFs and enter queries via a simple web interface.

> **Note:** Currently, you can only upload and analyze one PDF at a time. Uploading a new PDF will replace the previous document and its embeddings.

## How it Works

### Backend (`main.py`, `rag_agent.py`)

- **PDF Upload:**  
  The `/upload_pdf/` endpoint accepts a PDF file, parses it into text chunks, and stores their embeddings in a FAISS vector database using LangChain's `SentenceTransformerEmbeddings`.
- **Query:**  
  The `/query/` endpoint accepts a user query, retrieves the most relevant chunks from the vector database, and sends them (with the query) as a prompt to the Llama 3 model via Ollama. The model's response is returned as a summary or answer.

### Frontend

- **PDF Upload:**  
  Users can upload a PDF file, which is sent to the backend for processing.
- **Query:**  
  Users can enter a question, which is sent to the backend. The answer is displayed in the UI.

## Running Locally

1. **Clone the repository and navigate to the backend directory.**
2. **Install dependencies** (see `requirements.txt`).
3. **Start the backend** (FastAPI):
   ```sh
   uvicorn main:app --reload --host 0.0.0.0 --port 8080
   ```
   - The backend will be available at [http://localhost:8080](http://localhost:8080) (Swagger docs at [http://localhost:8080/docs](http://localhost:8080/docs))
4. **Start the frontend** (React):
   ```sh
   cd rag-frontend
   npm install
   npm start
   ```
   - The frontend will be available at [http://localhost:3000](http://localhost:3000)
5. **(Optional) Docker Compose:**  
   You can use `docker-compose up --build` to run both backend and frontend in containers.
   - The backend will be available at port **8080**
   - The frontend will be available at port **3000**

## Requirements

- Python 3.12+
- Node.js 18+
- [Ollama](https://ollama.com/) running locally with the Llama 3 model pulled
    - **Ollama must be running on your host machine:**  
      Start Ollama with  
      ```sh
      ollama serve
      ```
    - **Pull the Llama 3 model:**  
      ```sh
      ollama pull llama3
      ```
    - The backend connects to Ollama at `http://host.docker.internal:11434` when running in Docker.
- Docker (optional, for containerized deployment)

## Notes

- Make sure to update API URLs in the React frontend to match your backend host/port, especially when running in Docker.
- The backend uses CORS middleware to allow requests from the frontend.
- **Currently, uploading a new PDF will replace the previous document and its embeddings.**

---

**This is a prototype for document analysis and summarization using RAG and LLMs.**