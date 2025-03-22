import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ResumeUpload from "./pages/ResumeUpload";
import ResumePreview from "./pages/ResumePreview";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import JobPostings from "./pages/JobPostings";
import "./styles/main.css"; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/app" element={<App />} />
      <Route path="/upload" element={<ResumeUpload />} />
      <Route path="/preview" element={<ResumePreview />} />
      <Route path="/analysis" element={<ResumeAnalysis />} />
      <Route path="/job-postings" element={<JobPostings />} />
    </Routes>
  </Router>
);
