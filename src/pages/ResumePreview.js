import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as pdfjs from "pdfjs-dist";
import mammoth from "mammoth";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumePreview() {
  const location = useLocation();
  const navigate = useNavigate();
  const file = location.state?.file;
  const [resumeText, setResumeText] = useState("No preview available");

  useEffect(() => {
    if (file) {
      const reader = new FileReader();

      if (file.name.endsWith(".pdf")) {
        reader.onload = async (event) => {
          const pdf = await pdfjs.getDocument({ data: event.target.result }).promise;
          let text = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map((item) => item.str).join(" ") + "\n";
          }
          setResumeText(text);
        };
        reader.readAsArrayBuffer(file);
      } else if (file.name.endsWith(".docx")) {
        reader.onload = async (event) => {
          const result = await mammoth.extractRawText({ arrayBuffer: event.target.result });
          setResumeText(result.value);
        };
        reader.readAsArrayBuffer(file);
      } else {
        setResumeText("Unsupported file format. Please upload a PDF or DOCX.");
      }
    }
  }, [file]);

  return (
    <div className="layout">
      <div className="upload-section">
        <h2>Resume Preview</h2>
        {file ? <p>File: {file.name}</p> : <p>No file selected.</p>}
        <button className="btn" onClick={() => navigate("/analysis", { state: { resumeText } })}>
          Analyze Resume
        </button>
      </div>

      {/* ✅ Persistent Preview Pane */}
      <div className="preview-pane">
        <h2>Extracted Resume Content</h2>
        <div className="preview-content">
          <p style={{ whiteSpace: "pre-wrap" }}>{resumeText}</p>
        </div>
      </div>
    </div>
  );
}

export default ResumePreview;
