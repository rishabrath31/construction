const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const multer = require('multer');
const path = require('path'); 

const app = express();

mongoose.connect(config.dbURI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.use(cors()); 
app.use(bodyParser.json());

// Serve static files from the 'uploads/' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
app.get("/", (req, res) => {
  res.send(`<h1>Hello I am CMS App From Backend</h1>`);
});

// User authentication routes
app.use('/auth', authRoutes);

// Project management routes
app.use('/api', projectRoutes);

// Task management routes
app.use('/api', taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({ 
    error: 'Internal server error'
  });
});

module.exports = app;
