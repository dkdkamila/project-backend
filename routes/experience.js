const express = require('express');
const Experience = require('../models/Experience');
const router = express.Router();

// Get all experiences
router.get('/', async (req, res) => {
    try {
        const experiences = await Experience.find();
        res.json(experiences);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add new experience
router.post('/', async (req, res) => {
    try {
        const newExperience = new Experience(req.body);
        const savedExperience = await newExperience.save();
        res.status(201).json(savedExperience);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
