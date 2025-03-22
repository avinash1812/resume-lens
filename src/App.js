import React from "react";
import { Outlet } from "react-router-dom";
import "./styles/main.css";

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">ResumeLens</h1>
      <p className="app-subtitle">AI-powered Resume Analysis</p>

      <div className="layout">
        {/* Left Content Section */}
        <div className="upload-section">
          <Outlet />  {/* ✅ Dynamic content for each page */}
        </div>

        {/* ✅ Right Side - Persistent Preview Pane */}
        <div className="preview-pane">
          <h2>Preview & Analysis</h2>
          <p>Upload a resume to see its content here.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
