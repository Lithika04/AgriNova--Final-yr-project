const express = require('express');
const router = express.Router();
const FarmerData = require('../models/FarmerData');
const Recommendation = require('../models/Recommendation');
const { calculateIntelligence } = require('../utils/predictionEngine');
const jwt = require('jsonwebtoken');

// Middleware to protect routes
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ error: 'No token, authorization denied' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};

router.post('/farmer-data', auth, async (req, res) => {
    try {
        const intel = calculateIntelligence(req.body);

        // Map frontend data to AgriNova AI schema
        const farmerData = {
            userId: req.user.id,
            name: req.body.farmerName,
            age: req.body.age,
            gender: req.body.gender,
            education: req.body.education,
            district: req.body.district,
            landSize: req.body.landArea,
            landUnit: 'Acres',
            soilType: req.body.soilType,
            irrigationType: req.body.irrigationType,
            annualIncomeRange: req.body.annualIncomeRange,
            cropsGrown: [req.body.currentCrop, req.body.prevCrop].filter(Boolean),
            techUsage: {
                smartphone: req.body.smartphone,
                internet: req.body.internet,
                agriApps: req.body.agriApps,
                weatherForecast: req.body.weatherForecast,
                soilReports: req.body.soilReports,
                mechanization: req.body.mechanization,
                count: (req.body.smartphone ? 1 : 0) + (req.body.internet ? 1 : 0) + (req.body.agriApps ? 1 : 0) + (req.body.weatherForecast ? 1 : 0) + (req.body.soilReports ? 1 : 0)
            },
            schemeAwareness: {
                aware: req.body.awareSchemes,
                appliedPmKisan: req.body.appliedPmKisan,
                insurance: req.body.insurance,
                count: (req.body.awareSchemes ? 1 : 0) + (req.body.appliedPmKisan ? 1 : 0) + (req.body.insurance ? 1 : 0)
            },
            financialBehavior: {
                loanType: req.body.loanType,
                investment: req.body.investment,
                subsidyReceived: req.body.subsidyReceived
            },
            riskLevel: req.body.riskLevel,
            adoptionScore: intel.adoptionScore,
            adoptionLevel: intel.adoptionLevel,
            predictionResults: {
                technologies: intel.technologies,
                schemes: intel.schemes,
                aiInsights: intel.aiInsights
            }
        };

        const newEntry = new FarmerData(farmerData);
        await newEntry.save();

        // Save to recommendations collection as well for history
        const recEntry = new Recommendation({
            farmerId: newEntry._id,
            technologies: intel.technologies,
            schemes: intel.schemes,
            aiInsights: intel.aiInsights
        });
        await recEntry.save();

        res.status(201).json(newEntry);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save data' });
    }
});

router.post('/recommend', auth, async (req, res) => {
    try {
        const data = await FarmerData.findOne({ userId: req.user.id }).sort({ updatedAt: -1 });
        if (!data) return res.status(404).json({ error: 'No profile data. Please fill form.' });

        res.json({
            ...data.predictionResults,
            adoptionScore: data.adoptionScore,
            adoptionLevel: data.adoptionLevel,
            farmerName: data.name,
            district: data.district
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to generate recommendations' });
    }
});

module.exports = router;
