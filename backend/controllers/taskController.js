
const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, projectId, dueDate, assignedTo } = req.body;
    const task = new Task({ title, description, projectId, dueDate, assignedTo });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Task creation failed' });
  }
};


  // Get all tasks
  exports.getallTasks = async (req, res) => {
    try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ 
          error: 'Internal server error' 
      });
    }
  };

// Get tasks by project
exports.getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = await Task.find({ projectId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const updatedData = req.body;
    const task = await Task.findByIdAndUpdate(taskId, updatedData, { new: true });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Task update failed' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    await Task.findByIdAndRemove(taskId);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: 'Task deletion failed' });
  }
};

