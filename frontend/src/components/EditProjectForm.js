import React, { useState, useEffect } from 'react';
import './EditProjectForm.css';
import { useNavigate } from 'react-router-dom';

const EditProjectForm = ({ projectId }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the project details based on the projectId
    const fetchProjectDetails = async () => {
      try {
        alert("Do you want to edit this Project");
        const response = await fetch(`http://localhost:4000/api/projects/${projectId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch project details');
        }

        const projectData = await response.json();
        setFormData({
          name: projectData.name,
          description: projectData.description,
          price: projectData.price,
        });
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/api/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update project');
      }

      navigate('/home');
    
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  return (
    <div className="edit-project-form-container">
      <h2>Edit Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update Project</button>
      </form>
    </div>
  );
};

export default EditProjectForm;
