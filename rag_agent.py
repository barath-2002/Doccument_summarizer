from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain_core.documents import Document

class RAGAgent:
    def __init__(self):
        self.embeddings = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
        self.vectorstore = None
        self.docs = []

    def add_pdf(self, pdf_bytes: bytes):
        # Reset vectorstore and docs for new upload
        self.vectorstore = None
        self.docs = []
        # Save PDF temporarily in /tmp
        temp_path = "/tmp/temp.pdf"
        with open(temp_path, "wb") as f:
            f.write(pdf_bytes)
        loader = PyPDFLoader(temp_path)
        docs = loader.load()
        self.docs.extend(docs)
        self.vectorstore = FAISS.from_documents(docs, self.embeddings)

    def query(self, question: str, top_k: int = 5):
        if not self.vectorstore:
            return []
        docs = self.vectorstore.similarity_search(question, k=top_k)
        return [doc.page_content for doc in docs]