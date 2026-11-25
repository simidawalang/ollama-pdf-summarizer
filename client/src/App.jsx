import React, { useState } from "react";
import "./App.css";

function App() {
  const [pdf, setPdf] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const resetSummary = () => {
    if(summary) {
      setSummary("");
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdf(file);
    }

    resetSummary();
  };

  const fetchpiResponse = async (e) => {
    e.preventDefault();

    resetSummary();

    const formData = new FormData();
    formData.append("pdf", pdf);
    setLoading(true);

    const res = await fetch("http://localhost:5001/api", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    setSummary(data.message);
  };

  return (
    <div className="App">
      <div>
        <input type="file" accept="application/pdf" disabled={loading} onChange={handleFileUpload} />
        <button onClick={fetchpiResponse} disabled={loading}>Generate AI summary</button>
        {!summary && loading && <h3>Loading...</h3>}
      </div>
      {summary && !loading && (
        <div className="summary">
          <h3>Summary</h3>
          <p>{summary}</p>
        </div>)}
    </div>
  );
}

export default App;