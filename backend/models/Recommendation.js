const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema({
    farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'FarmerData', required: true },
    technologies: [{
        name: String,
        tamil: String,
        description: String,
        cost: String,
        subsidy: String,
        website: String
    }],
    schemes: [{
        name: String,
        tamil: String,
        type: String, // Central Govt, TN State, Women, Digital
        benefit: String,
        eligibility: String,
        description: String,
        website: String
    }],
    aiInsights: {
        bestCrop: String,
        expectedYield: String,
        waterRequirement: String,
        profit: String,
        sustainabilityScore: String
    },
    generatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recommendation', RecommendationSchema);
