from fastapi import FastAPI, UploadFile, File, Form
from rag_agent import RAGAgent
import ollama
from langchain_community.llms import Ollama
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
rag_agent = RAGAgent()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload_pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    pdf_bytes = await file.read()
    rag_agent.add_pdf(pdf_bytes)
    return {"status": "PDF uploaded and indexed."}


@app.post("/query/")
async def query_document(query: str = Form(...)):
    # Retrieve relevant chunks
    relevant_chunks = rag_agent.query(query, top_k=5)
    context = "\n".join(relevant_chunks)
    prompt = f"Summarize the following context and answer the question: {query}\n\nContext:\n{context}"
    llm = Ollama(model="llama3", base_url="http://host.docker.internal:11434")
    summary = llm.invoke(prompt)
    return {"summary": summary}
