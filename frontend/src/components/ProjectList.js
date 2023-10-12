
import React, { useEffect, useState } from 'react';
import './ProjectList.css';
import EditProjectForm from './EditProjectForm';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [editProjectId, setEditProjectId] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/projects', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }

        const projectData = await response.json();
        setProjects(projectData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleEditNavigation = (projectId) => {
    setEditProjectId(projectId);
  };

  const handleEditClose = () => {
    setEditProjectId(null);
  };
  
  return (
    <div className="project-list-container">
      <h2>Project List</h2>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <strong>{project.name}</strong>
            <p>Description: {project.description}</p>
            <p>Price: ${project.price}</p>
            <img src={project.imageUrl} alt={project.name} />
            <button onClick={() => handleEditNavigation(project._id)}>Edit</button>
          </li>
        ))}
      </ul>

      {editProjectId && (
        <EditProjectForm projectId={editProjectId} onClose={handleEditClose} />
      )}
    </div>
  );
};

export default ProjectList;
