const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    years: { type: String, required: true },
    description: { type: String, required: true },
});

module.exports = mongoose.model('Experience', ExperienceSchema);
