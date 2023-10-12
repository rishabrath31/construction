const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;

    const numericPrice = parseFloat(price);

    const imageFilename = req.file ? req.file.filename : null;

    const project = new Project({ name, description, price: numericPrice, imageUrl: imageFilename });

    const savedProject = await project.save();

    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Get all projects
exports.getAllProjects = async (req, res) => {
  try 
  {
    const projects = await Project.find();
    res.status(200).json(projects);
  } 
  catch (error) 
  {
    res.status(500).json({
        error: 'Internal server error' 
            });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  try 
  {
    const { projectId } = req.params;
    const updatedData = req.body;
    const project = await Project.findByIdAndUpdate(projectId, updatedData, { new: true });
    res.status(200).json(project);
  } 
  catch (error) 
  {
    res.status(400).json({ 
        error: 'Project update failed' 
    });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    await Project.findByIdAndRemove(projectId);
    res.status(204).end();
  } 
  catch (error) 
  {
    res.status(400).json({ 
        error: 'Project deletion failed' 
    });
  }
};
