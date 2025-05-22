import React, { useState } from "react";
import axios from "axios";

function PdfUpload({ setUploadStatus, setSummary }) {
  const [pdf, setPdf] = useState(null);

  const handlePdfChange = (e) => {
    setPdf(e.target.files[0]);
    setUploadStatus("");
    setSummary("");
  };

  const handleUpload = async () => {
    if (!pdf) return;
    const formData = new FormData();
    formData.append("file", pdf);
    setUploadStatus("Uploading...");
    try {
      await axios.post("http://localhost:8080/upload_pdf/", formData);
      setUploadStatus("Upload successful!");
    } catch (err) {
      setUploadStatus("Upload failed.");
    }
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handlePdfChange} />
      <button onClick={handleUpload} disabled={!pdf}>Upload PDF</button>
    </div>
  );
}

export default PdfUpload;