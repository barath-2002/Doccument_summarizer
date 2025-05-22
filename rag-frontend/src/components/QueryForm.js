import React, { useState } from "react";
import axios from "axios";

function QueryForm({ setSummary }) {
  const [query, setQuery] = useState("");

  const handleQuery = async () => {
    if (!query) return;
    setSummary("Loading...");
    try {
      const formData = new FormData();
      formData.append("query", query);
      const res = await axios.post("http://localhost:8080/query/", formData);
      setSummary(res.data.summary);
    } catch (err) {
      setSummary("Query failed.");
    }
  };

  return (
    <div style={{ marginTop: 30 }}>
      <input
        type="text"
        placeholder="Enter your query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "70%" }}
      />
      <button onClick={handleQuery} disabled={!query}>Ask</button>
    </div>
  );
}

export default QueryForm;