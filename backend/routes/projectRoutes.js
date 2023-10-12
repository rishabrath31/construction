
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: '../uploads' });
const projectController = require('../controllers/projectController');

// Create a new project with an image upload
router.post('/projects', upload.single('image'), projectController.createProject);

// Get all projects
router.get('/projects', projectController.getAllProjects);

// Update a project
router.put('/projects/:projectId', projectController.updateProject);

// Delete a project
router.delete('/projects/:projectId', projectController.deleteProject);

module.exports = router;

