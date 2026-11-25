import React, { useState } from "react";
import "./App.css";

function App() {
  const [pdf, setPdf] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const resetSummary = () => {
    if (summary) {
      setSummary("");
    }
  }

  const resetErrorMessage = () => {
    if (errorMessage) {
      setErrorMessage("");
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdf(file);
    }

    resetSummary();
    resetErrorMessage();
  };

  const fetchApiResponse = async (e) => {
    e.preventDefault();

    resetSummary();

    try {
      const formData = new FormData();
      formData.append("pdf", pdf);
      setLoading(true);

      const res = await fetch("http://localhost:5001/api", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setSummary(data.message);
    } catch (e) {
      setErrorMessage("An error occured");
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="App">
      <h1 className="title">PDF Summarizer</h1>
      <div className="select-pdf">
        <input type="file" accept="application/pdf" disabled={loading} onChange={handleFileUpload} />
        <button onClick={fetchApiResponse} disabled={loading}>Generate AI summary</button>
      </div>
      {!summary && loading && <h3>Loading...</h3>}
      {summary && !loading && (
        <div className="summary">
          <h3>Summary</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default App;