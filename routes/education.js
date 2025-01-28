const express = require('express');
const Education = require('../models/Education');
const router = express.Router();

// Get all education entries
router.get('/', async (req, res) => {
    try {
        const education = await Education.find();
        res.json(education);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single education entry by ID
router.get('/:id', async (req, res) => {
    try {
        const education = await Education.findById(req.params.id);
        if (!education) return res.status(404).json({ error: 'Education entry not found' });
        res.json(education);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new education entry
router.post('/', async (req, res) => {
    try {
        const newEducation = new Education(req.body);
        const savedEducation = await newEducation.save();
        res.status(201).json(savedEducation);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update an existing education entry
router.put('/:id', async (req, res) => {
    try {
        const updatedEducation = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEducation) return res.status(404).json({ error: 'Education entry not found' });
        res.json(updatedEducation);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete an education entry
router.delete('/:id', async (req, res) => {
    try {
        const deletedEducation = await Education.findByIdAndDelete(req.params.id);
        if (!deletedEducation) return res.status(404).json({ error: 'Education entry not found' });
        res.json({ message: 'Education entry deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
