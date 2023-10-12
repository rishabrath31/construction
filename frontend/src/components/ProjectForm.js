import React, { useState } from "react";
import "./ProjectForm.css";

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      setFormData({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
      });
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className="project-form-container">
      <h2>Create Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            required
            value={formData.price}
            onChange={handleChange}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="imageUrl">Upload Image</label>
          <input
            type="file"
            id="imageUrl"
            name="imageUrl"
            required
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default ProjectForm;
