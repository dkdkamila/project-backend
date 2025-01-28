const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    language: { type: String, required: true },
    link: { type: String, required: true },
    description: { type: String, required: true },
});

module.exports = mongoose.model('Project', ProjectSchema);
