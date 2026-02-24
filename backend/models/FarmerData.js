const mongoose = require('mongoose');

const FarmerDataSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // Core Fields (AgriNova AI Schema)
    name: String,
    age: Number,
    gender: String,
    education: String,
    district: String,
    landSize: Number,
    landUnit: { type: String, default: 'Acres' },
    soilType: String,
    irrigationType: String,
    annualIncomeRange: String,

    // Grouped Data for ML/Logic
    cropsGrown: [String],
    techUsage: {
        smartphone: Boolean,
        internet: Boolean,
        agriApps: Boolean,
        weatherForecast: Boolean,
        soilReports: Boolean,
        mechanization: String,
        count: Number
    },
    schemeAwareness: {
        aware: Boolean,
        appliedPmKisan: Boolean,
        insurance: Boolean,
        count: Number
    },
    financialBehavior: {
        loanType: String,
        investment: Number,
        subsidyReceived: Boolean
    },
    riskLevel: String,

    // AI Prediction Fields
    adoptionScore: Number,
    adoptionLevel: String, // Low / Medium / High

    // Flexible Results (Storing the full predictions here for easy access)
    predictionResults: {
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
            type: String, // Central, Tamil Nadu, Women, Digital
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
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('FarmerData', FarmerDataSchema);
