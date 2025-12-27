const mongoose = require('mongoose');

const MoodSchema = new mongoose.Schema({
    district: {
        type: String,
        required: true,
        unique: true,
    },
    counts: {
        type: Map,
        of: Number,
        default: {},
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Mood', MoodSchema);
