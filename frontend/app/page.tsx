"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "https://groweasy-assignment-bqkh.onrender.com/api/upload",
        formData
      );

      setResult(res.data);
    } catch (err) {
      alert("Upload Failed");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>GrowEasy CRM Assignment</h1>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <br />
      <br />

      <button onClick={uploadFile}>
        Upload CSV
      </button>

      <br />
      <br />

      {result && (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}