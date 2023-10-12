import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  return (
    <div className="home-container">
      <h1>Welcome to the Construction Management System</h1>
      <p>Manage your construction projects efficiently with our system.</p>
      <h2>Projects List:</h2>
      <div className="project-cards">
        {projects.map((project) => (
          <div key={project._id} className="project-card">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            {/* <strong>
              <p>Price: ${project.price}</p>
            </strong>
            <img src={project.imageUrl} alt={project.name} /> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
