const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    dueDate: Date,
    status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
    assignedTo: Number,
    projectId: Number,
});

module.exports = mongoose.model('Task', taskSchema);
