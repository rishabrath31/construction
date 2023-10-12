const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  imageUrl: {
    type: String,
  },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
