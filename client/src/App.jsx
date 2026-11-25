import { useState } from 'react'
import './App.css'

function App() {
  const [pdf, setPdf] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPdf(file);
    }
  }

  const fetchApi = async (e) => {
    e.preventDefault();
  }

  return (
    <div>
      <input type="file" onChange={handlePdfUpload} accept="application/pdf" />
      <button onClick={fetchApi}>Generate AI Summary</button>
      {loading && <h2>Loading...</h2>}
      {summary && <p>{summary}</p>}
    </div>
  )
}

export default App
