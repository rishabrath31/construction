
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Create a new task
router.post('/tasks', taskController.createTask);

router.get('/tasks', taskController.getallTasks);

// Get tasks by project
router.get('/tasks/:projectId', taskController.getTasksByProject);

// Update a task
router.put('/tasks/:taskId', taskController.updateTask);

// Delete a task
router.delete('/tasks/:taskId', taskController.deleteTask);

module.exports = router;
