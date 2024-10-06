const express = require('express');
const router = express.Router();
const Project = require('../models/project');

// Create a new project
router.post('/', async (req, res) => {
    const { name, description, completionTime, createdBy } = req.body;
    const id = await Project.countDocuments() + 1;
    const project = new Project({ id, name, description, completionTime, createdBy });
    try {
        await project.save();
        res.status(201).send({ message: 'Project created successfully!' });
    } catch (error) {
        res.status(400).send({ error: 'Error creating project!' });
    }
});

// Get project details by ID
router.get('/:id', async (req, res) => {
    try {
        // Find the project by your custom numeric id field
        const project = await Project.findOne({ id: req.params.id }).populate('createdBy');
        
        // If project is not found
        if (!project) {
            return res.status(404).send({ error: 'Project not found!' });
        }
        
        // Respond with the found project
        res.status(200).send(project);
    } catch (error) {
        // Handle errors (e.g. invalid ID format)
        res.status(400).send({ error: 'Error fetching project details!' });
    }
});

module.exports = router;
