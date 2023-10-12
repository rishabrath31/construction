import React, { useState, useEffect } from 'react';
import './TaskForm.css';

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectId: '',
    dueDate: '',
    assignedTo: '',
  });

  const [projects, setProjects] = useState([]);
  const [assignedToOptions, setAssignedToOptions] = useState([]);

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

    const fetchAssignedToOptions = async () => {
      //define list of assignedTo options statically
      const options = ['Project Manager', 'Contractor', 'Supervisor'];
      setAssignedToOptions(options);
    };

    fetchProjects();
    fetchAssignedToOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dueDateISO = new Date(formData.dueDate).toISOString();

    try {
      const response = await fetch('http://localhost:4000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, dueDate: dueDateISO }),
      });

      if (!response.ok) {
        throw new Error('Task creation failed');
      }

      // Clear the form inputs
      setFormData({
        title: '',
        description: '',
        projectId: '',
        dueDate: '',
        assignedTo: '',
      });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="task-form-container">
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Project</label>
          <select
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
            required
          >
            <option value="">Select a Project</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Assigned To</label>
          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            required
          >
            <option value="">Select Assigned To</option>
            {assignedToOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
