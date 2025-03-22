import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="layout">
      <div className="upload-section">
        <h2>Upload Your Resume</h2>
        <input type="file" accept=".pdf,.docx" onChange={(e) => setFile(e.target.files[0])} />
        <button className="btn" onClick={() => file && navigate("/preview", { state: { file } })}>
          Upload & Preview
        </button>
      </div>

      {/* ✅ Persistent Preview Pane */}
      <div className="preview-pane">
        <h2>Resume Preview</h2>
        <div className="preview-content">
          {file ? <p>Selected File: {file.name}</p> : <p>No file selected.</p>}
        </div>
      </div>
    </div>
  );
}

export default ResumeUpload;
