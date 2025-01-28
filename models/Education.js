const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
    courseTitle: { type: String, required: true },
    progression: { type: String, required: true },
    school: { type: String, required: true },
    hp: { type: Number, required: true },
});

module.exports = mongoose.model('Education', EducationSchema);
