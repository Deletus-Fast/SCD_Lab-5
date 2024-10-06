const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Add a task to a project
router.post('/:projectId/tasks', async (req, res) => {
    const { title, description, dueDate, assignedTo } = req.body;
    const id = await Task.countDocuments() + 1;
    const task = new Task({id, title, description, dueDate, assignedTo, projectId: req.params.projectId });
    try {
        await task.save();
        res.status(201).send({ message: 'Task created successfully!' });
    } catch (error) {
        res.status(400).send({ error: 'Error creating task!' });
    }
});

// Get all tasks for a project
router.get('/:projectId/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({ projectId: req.params.projectId }).populate('assignedTo');
        res.status(200).send(tasks);
    } catch (error) {
        res.status(404).send({ error: 'Tasks not found!' });
    }
});

// Update task status
router.put('/:projectId/tasks/:id/status', async (req, res) => {
    const { status } = req.body;

    try {
        // Update the status of the task using the custom numeric id
        const task = await Task.findOneAndUpdate(
            { id: req.params.id, projectId: req.params.projectId }, // Find by custom id and projectId
            { status },
            { new: true }
        );

        // If no task is found
        if (!task) {
            return res.status(404).send({ error: 'Task not found!' });
        }

        res.status(200).send(task);
    } catch (error) {
        res.status(400).send({ error: 'Error updating task status!' });
    }
});

module.exports = router;
