import React, { useState } from "react";
import PdfUpload from "./components/PdfUpload";
import QueryForm from "./components/QueryForm";
import "./App.css";

function App() {
  const [uploadStatus, setUploadStatus] = useState("");
  const [summary, setSummary] = useState("");

  return (
    <div className="container">
      <h2>RAG PDF Query App</h2>
      <PdfUpload setUploadStatus={setUploadStatus} setSummary={setSummary} />
      <div>{uploadStatus}</div>
      <QueryForm setSummary={setSummary} />
      <div className="result">
        <h4>Result:</h4>
        <div className="summary">{summary}</div>
      </div>
    </div>
  );
}

export default App;