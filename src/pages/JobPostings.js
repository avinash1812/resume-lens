import React from "react";

function JobPostings() {
  const jobs = [
    { title: "Software Engineer", skills: ["Python", "React", "Django"] },
    { title: "Project Manager", skills: ["Agile", "Scrum", "Leadership"] }
  ];

  return (
    <div className="layout">
      <div className="preview-pane">
        <h2>Job Postings</h2>
        {jobs.map((job, index) => (
          <div key={index} className="skill-gap">
            <h3>{job.title}</h3>
            <p>Required Skills: {job.skills.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobPostings;
