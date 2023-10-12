const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  dueDate: {
    type: String,
  },
  assignedTo: {
    type: String,
    ref: 'User',
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
