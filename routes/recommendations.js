const express = require('express');
const Recommendation = require('../models/Recommendation');
const sanitize = require('mongo-sanitize');
const router = express.Router();

// Get all recommendations
router.get('/', async (req, res) => {
    try {
        const recommendations = await Recommendation.find();
        res.json(recommendations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new recommendation
router.post('/', async (req, res) => {
    // Rensa inkommande data
    const sanitizedBody = sanitize(req.body);

    try {
        const newRecommendation = new Recommendation(sanitizedBody);
        const savedRecommendation = await newRecommendation.save();
        res.status(201).json(savedRecommendation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single recommendation by ID
router.get('/:id', async (req, res) => {
    try {
        // Validera att ID är ett giltigt MongoDB ObjectId
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        // Hämta rekommendationen från databasen
        const recommendation = await Recommendation.findById(req.params.id);
        if (!recommendation) {
            return res.status(404).json({ error: 'Recommendation not found' });
        }

        res.json(recommendation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a recommendation
router.put('/:id', async (req, res) => {
    const sanitizedBody = sanitize(req.body);

    try {
        const updatedRecommendation = await Recommendation.findByIdAndUpdate(
            req.params.id,
            sanitizedBody,
            { new: true }
        );
        if (!updatedRecommendation) {
            return res.status(404).json({ error: 'Recommendation not found' });
        }
        res.json(updatedRecommendation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a recommendation
router.delete('/:id', async (req, res) => {
    try {
        const deletedRecommendation = await Recommendation.findByIdAndDelete(req.params.id);
        if (!deletedRecommendation) return res.status(404).json({ error: 'Recommendation not found' });
        res.json({ message: 'Recommendation deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
