const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/project');
const taskRoutes = require('./routes/task');

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));  

mongoose.connect('mongodb://localhost:27017/collaborationApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Failed to connect to MongoDB', err));

// Routes
app.use('/user', authRoutes);
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
