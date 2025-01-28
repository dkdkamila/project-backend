const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    company: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 }, // 1 till 5 stjärnor
    text: { type: String, required: true },
});

module.exports = mongoose.model('Recommendation', RecommendationSchema);
