const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    completionTime: Date,
    createdBy: Number, //userID
});

module.exports = mongoose.model('Project', projectSchema);
