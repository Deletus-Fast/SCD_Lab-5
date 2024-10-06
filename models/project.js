const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    completionTime: Date,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Project', projectSchema);
