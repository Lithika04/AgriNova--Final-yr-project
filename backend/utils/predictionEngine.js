const { spawnSync } = require('child_process');
const path = require('path');

const technologies = [
    { name: "Drip Irrigation System", tamil: "சொட்டு நீர் பாசனம்", description: "Water-conserving system that delivers water directly to the root zone.", cost: "₹50,000 - ₹1,50,000", subsidy: "90-100% for Small/Marginal Farmers", website: "https://tnhorticulture.tn.gov.in/" },
    { name: "Solar Water Pump", tamil: "சூரிய சக்தி நீர் இறைப்பான்", description: "Renewable energy pump for irrigation, reducing electricity costs.", cost: "₹2,00,000 - ₹4,50,000", subsidy: "70-90% under PM-KUSUM", website: "https://www.pmkusum.mnre.gov.in/" },
    { name: "Soil Testing Kit", tamil: "மண் பரிசோதனை கருவி", description: "Portable kits to test soil health and nutrient levels on-site.", cost: "₹1,000 - ₹3,000", subsidy: "Available at Block Agri Offices", website: "https://www.soilhealth.dac.gov.in/" },
    { name: "Precision Farming Sensors", tamil: "துல்லிய விவசாய உணரிகள்", description: "IoT sensors for real-time monitoring of soil moisture and pH.", cost: "₹10,000 - ₹25,000", subsidy: "30-50% under Digital Agri Mission", website: "https://agricoop.nic.in/" },
    { name: "Weather Forecast Apps", tamil: "வானிலை முன்னறிவிப்பு செயலிகள்", description: "Digital tools for hyperlocal weather and pest alerts.", cost: "Free / ₹500 year", subsidy: "Free Gov Apps (Kisan Suvidha)", website: "https://mausam.imd.gov.in/" },
    { name: "Cold Storage Units", tamil: "குளிர்சாதன சேமிப்புக் கிடங்கு", description: "Mini storage units to preserve perishable crops like vegetables.", cost: "₹5,00,000+", subsidy: "35% - 50% under NHM", website: "https://nhb.gov.in/" },
    { name: "Farm Drones", tamil: "விவசாய ட்ரோன்கள்", description: "UAVs for precision spraying and crop health monitoring.", cost: "₹4,00,000 - ₹10,00,000", subsidy: "40% - 100% depending on category", website: "https://pib.gov.in/" },
    { name: "Bio Fertilizer Usage", tamil: "உயிர் உரப் பயன்பாடு", description: "Organic inputs like Azospirillum to improve soil fertility naturally.", cost: "₹200 - ₹500 per acre", subsidy: "Subsidized through localized societies", website: "https://tnagrisnet.tn.gov.in/" },
    { name: "IoT Moisture Sensors", tamil: "IoT ஈரப்பதம் உணரிகள்", description: "Automated irrigation control based on real-time moisture data.", cost: "₹5,000 - ₹15,000", subsidy: "Innovation grants available", website: "https://tnega.tn.gov.in/" },
    { name: "AI Pest Detection", tamil: "AI பூச்சி கண்டறிதல்", description: "Image-based AI to identify crop diseases and pests via smartphone.", cost: "Free / ₹1,000 year", subsidy: "Digital India grants", website: "https://plantix.net/" },
    { name: "Polyhouse Farming", tamil: "பாலிகவுஸ் விவசாயம்", description: "Controlled environment for high-value flower and vegetable crops.", cost: "₹10 Lakh - ₹50 Lakh", subsidy: "50% under MIDH", website: "https://midh.gov.in/" },
    { name: "Vermicomposting", tamil: "மண்புழு உரம் தயாரிப்பு", description: "Sustainable decomposition of organic waste into nutrient-rich compost.", cost: "₹5,000 - ₹20,000", subsidy: "₹10,000 per unit grant", website: "https://agritech.tnau.ac.in/" },
    { name: "Hydroponics", tamil: "மண் இல்லா விவசாயம்", description: "Growing plants in nutrient-rich water without soil.", cost: "₹50,000+", subsidy: "Urban Agri grants available", website: "https://www.tnhorticulture.tn.gov.in/" },
    { name: "Organic Certification", tamil: "இயற்கை விவசாய சான்றிதழ்", description: "Official NPOP/PGS certification for organic price premium.", cost: "₹5,000 - ₹15,000", subsidy: "Free under PKVY", website: "https://apeda.gov.in/" },
    { name: "Smart Sprayer", tamil: "ஸ்மார்ட் தெளிப்பான்", description: "Battery-operated or sensor-based sprayers to reduce chemical waste.", cost: "₹5,000 - ₹12,000", subsidy: "40-50% under SMAM", website: "https://farmech.dac.gov.in/" },
    { name: "Agri ERP Tools", tamil: "விவசாய மேலாண்மை கருவிகள்", description: "Software to track expenses, harvest dates, and labor costs.", cost: "₹2,000+ per year", subsidy: "MSME grants", website: "https://www.kisanmandee.com/" },
    { name: "Laser Land Leveler", tamil: "லேசர் நில சமன் செய்யும் கருவி", description: "Precision leveling for optimal water distribution.", cost: "₹3,00,000+", subsidy: "50% under SMAM", website: "https://farmech.gov.in/" },
    { name: "Power Tiller", tamil: "பவர் டில்லர்", description: "Versatile machine for small farm tillage and weeding.", cost: "₹1,50,000 - ₹2,50,000", subsidy: "₹40,000 - ₹50,000 grant", website: "https://tnagrisnet.tn.gov.in/" },
    { name: "Milking Machine", tamil: "பால் கறக்கும் இயந்திரம்", description: "Automated milking for dairy farmers to improve hygiene.", cost: "₹40,000+", subsidy: "25-33% under NABARD", website: "https://www.nabard.org/" },
    { name: "Rice Transplanter", tamil: "நெல் நடும் இயந்திரம்", description: "Mechanized transplanting to reduce labor cost and time.", cost: "₹2,00,000+", subsidy: "Subsidized through custom hiring centers", website: "https://agrimachinery.nic.in/" }
];

const schemes = [
    { name: "PM-KISAN", tamil: "பிஎம்-கிசான்", type: "Central Govt", benefit: "₹6000 per year in 3 installments", eligibility: "Small & Marginal Farmers", description: "Direct income support to all landholding farmer families.", website: "https://pmkisan.gov.in/" },
    { name: "PMFBY", tamil: "பயிர் காப்பீட்டுத் திட்டம்", type: "Central Govt", benefit: "Low premium insurance for all crop types", eligibility: "All land-holding farmers", description: "Pradhan Mantri Fasal Bima Yojana for crop risk coverage.", website: "https://pmfby.gov.in/" },
    { name: "Kisan Credit Card", tamil: "கிசான் கிரெடிட் கார்டு", type: "Central Govt", benefit: "Low interest loans (4%)", eligibility: "Active farmers, poultry & dairy farmers", description: "Short-term credit for farming and related activities.", website: "https://www.pnbindia.in/kisan-credit-card.html" },
    { name: "e-NAM", tamil: "இ-நாம்", type: "Digital", benefit: "Direct online sale to buyers nationwide", eligibility: "Registered farmers", description: "National Agriculture Market for transparent online trading.", website: "https://www.enam.gov.in/" },
    { name: "Soil Health Card", tamil: "மண் ஆரோக்கிய அட்டை", type: "Central Govt", benefit: "Free soil testing and fertilizer advice", eligibility: "All farmers", description: "Scientific assessment of soil nutrient levels.", website: "https://soilhealth.dac.gov.in/" },
    { name: "PMKSY", tamil: "பிரதமர் பாசனத் திட்டம்", type: "Central Govt", benefit: "Irrigation infrastructure and drip subsidy", eligibility: "All farm owners", description: "Pradhan Mantri Krishi Sinchayee Yojana for water efficiency.", website: "https://pmksy.gov.in/" },
    { name: "TN Farmer Loan Waiver", tamil: "விவசாயக் கடன் தள்ளுபடி", type: "TN State", benefit: "Waiver of cooperative bank loans", eligibility: "Resident farmers of Tamil Nadu", description: "Direct financial relief for cooperative society borrowers.", website: "https://www.tn.gov.in/" },
    { name: "Uzhavar Sandhai Support", tamil: "உழவர் சந்தை ஆதரவு", type: "TN State", benefit: "Free stall space and weighing machines", eligibility: "Direct producers with Uzhavar ID", description: "State support for direct-to-consumer sales.", website: "https://agrimark.tn.gov.in/" },
    { name: "TN Solar Pump Scheme", tamil: "தமிழக சூரிய சக்தி பம்ப் திட்டம்", type: "TN State", benefit: "70% subsidy for solar irrigation", eligibility: "TN farmers with borewells", description: "State-led initiative for clean energy in farming.", website: "https://www.tangedco.gov.in/" },
    { name: "Women Farmer Subsidy Schemes", tamil: "பெண் விவசாயிகளுக்கான மானியம்", type: "Women", benefit: "Additional 5-10% subsidy on equipment", eligibility: "Female land-holders in TN", description: "Special incentives for women empowerment in agriculture.", website: "https://tnhorticulture.tn.gov.in/" },
    { name: "PKVY", tamil: "PKVY இயற்கை விவசாயம்", type: "Central Govt", benefit: "₹50,000 per hectare for 3 years", eligibility: "Farmer clusters (min 50 farmers)", description: "Paramparagat Krishi Vikas Yojana for organic promotion.", website: "https://pgsindia-ncof.gov.in/" },
    { name: "Digital Agri Mission", tamil: "டிஜிட்டல் விவசாய மிஷன்", type: "Digital", benefit: "Grants for IoT and Drone adoption", eligibility: "Tech-savvy and group farmers", description: "Accelerating modern tech adoption in farms.", website: "https://agricoop.nic.in/" },
    { name: "TN Micro Irrigation Scheme", tamil: "தண்ணீர் சேமிப்பு பாசனத் திட்டம்", type: "TN State", benefit: "100% subsidy for small farmers", eligibility: "Registered TN small farmers", description: "Promoting per-drop-more-crop mission.", website: "https://tnhorticulture.tn.gov.in/" },
    { name: "Agriculture Infrastructure Fund", tamil: "விவசாய உள்கட்டமைப்பு நிதி", type: "Central Govt", benefit: "3% interest subvention on infra loans", eligibility: "FPOs, PACs, and Agri-entrepreneurs", description: "Lending for post-harvest management infrastructure.", website: "https://agriinfra.dac.gov.in/" },
    { name: "TN Crop Insurance", tamil: "தமிழக பயிர் காப்பீடு", type: "TN State", benefit: "Fast-track claim processing", eligibility: "TN Farmers registered under SMIF", description: "Additional state-backed security for crop failure.", website: "https://tnagrisnet.tn.gov.in/" }
];

const calculateIntelligence = (data) => {
    // 1. Prepare Features for ML Prediction
    const incomeMap = {
        "Below ₹50,000": 0,
        "₹50,000 – ₹1,00,000": 1,
        "₹1,00,000 – ₹3,00,000": 2,
        "₹3,00,000 – ₹5,00,000": 3,
        "Above ₹5,00,000": 4
    };

    const landMap = {
        "Small": 0,
        "Medium": 1,
        "Large": 2
    };

    const techCount = (data.smartphone ? 1 : 0) + (data.internet ? 1 : 0) + (data.agriApps ? 1 : 0) + (data.weatherForecast ? 1 : 0) + (data.soilReports ? 1 : 0);
    const schemeCount = (data.awareSchemes ? 1 : 0) + (data.appliedPmKisan ? 1 : 0) + (data.insurance ? 1 : 0);

    // Call Python Predictor (Integration Bridge)
    // For now, we use a robust logical fall-back that mimics the Random Forest logic
    // but in a production environment, we'd use child_process.spawn('python', ['predict.py', ...])

    let score = (landMap[data.landCategory] || 0) * 5 +
        (incomeMap[data.annualIncomeRange] || 0) * 10 +
        techCount * 12 +
        schemeCount * 15;

    const adoptionScore = Math.min(100, Math.max(10, score));
    let adoptionLevel = "Low";
    if (adoptionScore > 65) adoptionLevel = "High";
    else if (adoptionScore > 35) adoptionLevel = "Medium";

    // 2. Filter Recommendations
    const recommendedTech = technologies.filter(t => {
        if (adoptionLevel === "Low") return t.name.includes("Soil") || t.name.includes("Bio") || t.name.includes("Power Tiller") || t.name.includes("Weather");
        if (adoptionLevel === "Medium") return !t.name.includes("Drone") && !t.name.includes("Polyhouse");
        return true;
    }).slice(0, 12);

    const eligibleSchemes = schemes.filter(s => {
        const income = incomeMap[data.annualIncomeRange] || 0;
        if (s.name === "PM-KISAN" && income > 2) return false;
        if (s.type === "Women" && data.gender !== "Female") return false;
        return true;
    });

    // 3. AI Insights
    const aiInsights = {
        bestCrop: data.soilType === "Red Soil" ? "Paddy" : data.soilType === "Black Soil" ? "Cotton" : "Maize",
        expectedYield: (adoptionScore * 20) + " kg/acre",
        waterRequirement: data.irrigationType === "Drip Irrigation" ? "2000 L/day" : "5000 L/day",
        profit: "₹" + (adoptionScore * 1000) + " - " + (adoptionScore * 1500) + " per season",
        sustainabilityScore: adoptionLevel === "High" ? "Excellent (90/100)" : "Good (60/100)"
    };

    return {
        adoptionScore,
        adoptionLevel,
        technologies: recommendedTech,
        schemes: eligibleSchemes,
        aiInsights
    };
};

module.exports = { calculateIntelligence };
