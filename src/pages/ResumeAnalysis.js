import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function ResumeAnalysis() {
  const location = useLocation();
  const resumeText = location.state?.resumeText || "No text available";
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [skillGaps, setSkillGaps] = useState([]);

  // Retrieve the logged-in username from local storage
  const username = localStorage.getItem("username");

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/grade", {
        resume_text: resumeText,
        username: username,
      })
      .then((response) => {
        setScore(response.data.resume_score);
        setFeedback(response.data.feedback);
        setSkillGaps(response.data.missing_skills);
      })
      .catch(() => {
        setFeedback("Failed to fetch analysis. Check backend connection.");
      });
  }, [resumeText, username]);

  return (
    <div className="layout">
      <div className="upload-section">
        <h2>Resume Analysis</h2>
        <h3>Score: {score !== null ? `${score}/100` : "Loading..."}</h3>
        <p>{feedback}</p>
        <button className="btn">Generate Cover Letter</button>
      </div>

      <div className="preview-pane">
        <h2>Extracted Resume Content</h2>
        <div className="preview-content">
          <p style={{ whiteSpace: "pre-wrap" }}>{resumeText}</p>
        </div>
      </div>
    </div>
  );
}

export default ResumeAnalysis;
