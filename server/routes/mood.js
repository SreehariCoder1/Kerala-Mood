const express = require('express');
const router = express.Router();
const Mood = require('../models/Mood');

// POST /api/mood - Update mood for a district
router.post('/mood', async (req, res) => {
    const { district, mood } = req.body;

    if (!district || !mood) {
        return res.status(400).json({ error: 'District and mood are required' });
    }

    try {
        let districtMood = await Mood.findOne({ district });

        if (!districtMood) {
            districtMood = new Mood({ district, counts: {} });
        }

        const currentCount = districtMood.counts.get(mood) || 0;
        districtMood.counts.set(mood, currentCount + 1);
        districtMood.lastUpdated = Date.now();

        await districtMood.save();
        res.json({ message: 'Mood recorded', data: districtMood });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/moods - Get all districts and their dominant mood
router.get('/moods', async (req, res) => {
    try {
        const moods = await Mood.find();

        const result = moods.map(doc => {
            let dominantMood = null;
            let maxCount = -1;

            if (doc.counts) {
                for (const [mood, count] of doc.counts) {
                    if (count > maxCount) {
                        maxCount = count;
                        dominantMood = mood;
                    }
                }
            }

            return {
                district: doc.district,
                dominantMood,
                counts: doc.counts
            };
        });

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
