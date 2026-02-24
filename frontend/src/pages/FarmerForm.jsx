import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../utils/api';
import {
    User, MapPin, Sprout, Droplets, Zap, TrendingUp, ShieldCheck,
    ChevronRight, ChevronLeft, Check, AlertCircle,
    Smartphone, Landmark, Thermometer, ShoppingCart, Activity,
    LandPlot, BarChart3, CloudSun, Scale
} from 'lucide-react';

const FarmerForm = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        // 1. Basic
        farmerName: '', age: '', gender: '', education: '', experience: '', occupation: '', district: '', village: '',
        // 2. Land
        landArea: '', cultivableLand: '', soilType: '', soilPh: '', irrigationType: '', waterAvailability: '',
        currentCrop: '', prevCrop: '', season: '', seedType: '',
        // 3. Tech
        smartphone: false, internet: false, agriApps: false, weatherForecast: false, soilReports: false,
        mechanization: '', ownsEquipment: [],
        // 4. Schemes
        awareSchemes: false, appliedPmKisan: false, insurance: false, loanType: '', subsidyReceived: false,
        // 5. Financial
        annualIncomeRange: '', investment: '', riskLevel: '', marketingMethod: '', storage: false,
        // 6. Attitude
        tryNewCrops: false, organicFarming: false, aiSuggestions: false, contractFarming: false,
        // 7. Region
        rainfall: '', temperature: '', humidity: '', floodProne: false, droughtProne: false, fpoMember: false,
        // 8. Water
        electricity: '', solarPump: false, storageCapacity: '', rainwaterHarvesting: false,
        // 9. Market
        marketName: '', marketDistance: '', transport: '', trainingAttended: false, priceAlerts: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleMultiSelect = (e, field) => {
        const value = e.target.value;
        const current = formData[field];
        if (e.target.checked) {
            setFormData(prev => ({ ...prev, [field]: [...current, value] }));
        } else {
            setFormData(prev => ({ ...prev, [field]: current.filter(item => item !== value) }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentStep < 9) {
            setCurrentStep(currentStep + 1);
            window.scrollTo(0, 0);
            return;
        }

        setLoading(true);
        try {
            await api.post('/farmer-data', formData);
            navigate('/dashboard');
        } catch (err) {
            setError(t('errorSubmission'));
        } finally {
            setLoading(false);
        }
    };

    const renderInput = (label, name, type = 'text', placeholder = '') => (
        <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">
                {t(label)}
            </label>
            <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={t(placeholder)}
                className="input-field"
            />
        </div>
    );

    const renderSelect = (label, name, options) => (
        <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">{t(label)}</label>
            <select name={name} value={formData[name]} onChange={handleChange} className="input-field appearance-none">
                <option value="">{t('select')}</option>
                {options.map(opt => (
                    <option key={opt.val} value={opt.val}>
                        {t(`options.${opt.label}`) || t(opt.label)}
                    </option>
                ))}
            </select>
        </div>
    );

    const renderCheckbox = (label, name) => (
        <label className="flex items-center space-x-3 p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:border-[#A5D6A7] hover:bg-green-50/30 cursor-pointer transition-all">
            <input type="checkbox" name={name} checked={formData[name]} onChange={handleChange} className="w-5 h-5 text-[#2E7D32] border-gray-300 rounded focus:ring-[#2E7D32]" />
            <span className="text-sm font-bold text-gray-700">{t(label)}</span>
        </label>
    );

    const steps = [
        { id: 1, title: 'step1', icon: <User size={20} /> },
        { id: 2, title: 'step2', icon: <LandPlot size={20} /> },
        { id: 3, title: 'step3', icon: <Smartphone size={20} /> },
        { id: 4, title: 'step4', icon: <Landmark size={20} /> },
        { id: 5, title: 'step5', icon: <BarChart3 size={20} /> },
        { id: 6, title: 'step6', icon: <Activity size={20} /> },
        { id: 7, title: 'step7', icon: <CloudSun size={20} /> },
        { id: 8, title: 'step8', icon: <Droplets size={20} /> },
        { id: 9, title: 'step9', icon: <ShoppingCart size={20} /> },
    ];

    const tnDistricts = [
        "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kancheepuram", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupattur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"
    ];

    return (
        <div className="max-w-6xl mx-auto">
            {/* Stepper Header */}
            <div className="mb-12 overflow-x-auto pb-4 hide-scrollbar">
                <div className="flex justify-between items-center min-w-[900px] px-4">
                    {steps.map((step, idx) => (
                        <React.Fragment key={step.id}>
                            <div className="flex flex-col items-center relative z-10">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 shadow-sm ${currentStep >= step.id ? 'bg-[#2E7D32] border-[#2E7D32] text-white shadow-green-100 rotate-0' : 'bg-white border-gray-100 text-gray-300'}`}>
                                    {currentStep > step.id ? <Check size={28} /> : step.icon}
                                </div>
                                <span className={`text-[10px] sm:text-xs mt-4 font-black uppercase tracking-wider text-center whitespace-nowrap transition-colors duration-300 ${currentStep >= step.id ? 'text-[#1B5E20]' : 'text-gray-300'}`}>
                                    {t(step.title)}
                                </span>
                            </div>
                            {idx < steps.length - 1 && (
                                <div className={`flex-1 h-1 mx-2 transition-colors duration-700 rounded-full ${currentStep > step.id ? 'bg-[#2E7D32]' : 'bg-gray-100'}`} />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className="card animate-in fade-in slide-in-from-bottom-6 duration-700">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-6">
                    <div className="flex items-center space-x-5">
                        <div className="w-16 h-16 bg-green-50 text-[#2E7D32] rounded-[1.5rem] flex items-center justify-center shadow-inner">
                            {React.cloneElement(steps[currentStep - 1].icon, { size: 32 })}
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 tracking-tight">{t(steps[currentStep - 1].title)}</h2>
                            <p className="text-gray-400 font-bold mt-1 uppercase text-xs tracking-widest">{t('step')} {currentStep} {t('of')} 9</p>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-8 flex items-center gap-3 text-sm font-bold animate-pulse">
                        <AlertCircle size={20} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="min-h-[400px]">
                        {currentStep === 1 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
                                {renderInput('farmerName', 'farmerName', 'text', 'placeholderName')}
                                {renderInput('age', 'age', 'number', 'placeholderAge')}
                                {renderSelect('gender', 'gender', [
                                    { val: 'Male', label: 'Male' },
                                    { val: 'Female', label: 'Female' },
                                    { val: 'Other', label: 'Other' }
                                ])}
                                {renderSelect('education', 'education', [
                                    { val: 'No Formal Education', label: 'noFormal' },
                                    { val: 'Primary', label: 'primary' },
                                    { val: 'Secondary', label: 'secondary' },
                                    { val: 'Higher Secondary', label: 'higherSecondary' },
                                    { val: 'Graduate', label: 'graduate' }
                                ])}
                                {renderInput('experience', 'experience', 'number', 'placeholderYears')}
                                {renderSelect('occupation', 'occupation', [
                                    { val: 'Full-time Farmer', label: 'fullTime' },
                                    { val: 'Part-time Farmer', label: 'partTime' },
                                    { val: 'Agricultural Labor', label: 'agriLabor' }
                                ])}
                                {renderSelect('district', 'district', tnDistricts.map(d => ({ val: d, label: `districts.${d}` })))}
                                {renderInput('village', 'village', 'text', 'Village Name')}
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
                                {renderInput('landArea', 'landArea', 'number', 'placeholderAcres')}
                                {renderInput('cultivableLand', 'cultivableLand', 'number', 'placeholderAcres')}
                                {renderSelect('soilType', 'soilType', [
                                    { val: 'Red Soil', label: 'redSoil' },
                                    { val: 'Black Soil', label: 'blackSoil' },
                                    { val: 'Sandy Soil', label: 'sandySoil' },
                                    { val: 'Clay Soil', label: 'claySoil' },
                                    { val: 'Loamy Soil', label: 'loamySoil' }
                                ])}
                                {renderInput('soilPh', 'soilPh', 'number', 'placeholderPh')}
                                {renderSelect('irrigationType', 'irrigationType', [
                                    { val: 'Rain-fed', label: 'rainFed' },
                                    { val: 'Borewell', label: 'borewell' },
                                    { val: 'Canal', label: 'canal' },
                                    { val: 'Drip Irrigation', label: 'drip' },
                                    { val: 'Sprinkler', label: 'sprinkler' }
                                ])}
                                {renderInput('waterAvailability', 'waterAvailability', 'number', 'placeholderWater')}
                                {renderInput('currentCrop', 'currentCrop', 'text')}
                                {renderInput('prevCrop', 'prevCrop', 'text')}
                                {renderSelect('season', 'season', [
                                    { val: 'Kuruvai', label: 'kuruvai' },
                                    { val: 'Samba', label: 'samba' },
                                    { val: 'Navarai', label: 'navarai' },
                                    { val: 'Summer', label: 'summer' }
                                ])}
                                {renderSelect('seedType', 'seedType', [
                                    { val: 'Hybrid', label: 'hybrid' },
                                    { val: 'Traditional', label: 'traditional' },
                                    { val: 'Government Certified', label: 'govtCertified' }
                                ])}
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="space-y-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {renderCheckbox('smartphone', 'smartphone')}
                                    {renderCheckbox('internet', 'internet')}
                                    {renderCheckbox('agriApps', 'agriApps')}
                                    {renderCheckbox('weatherForecast', 'weatherForecast')}
                                    {renderCheckbox('soilReports', 'soilReports')}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    {renderSelect('mechanization', 'mechanization', [
                                        { val: 'Manual', label: 'manual' },
                                        { val: 'Tractor', label: 'tractor' },
                                        { val: 'Harvester', label: 'harvester' },
                                        { val: 'Fully Mechanized', label: 'fullyMechanized' }
                                    ])}
                                    <div className="mb-4">
                                        <label className="block text-sm font-bold text-gray-700 mb-4">{t('ownsEquipment')}</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            {['Tractor', 'Pump Set', 'Sprayer', 'Drone'].map(item => (
                                                <label key={item} className="flex items-center space-x-3 text-sm p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-green-50 transition-colors">
                                                    <input
                                                        type="checkbox"
                                                        value={item}
                                                        checked={formData.ownsEquipment.includes(item)}
                                                        onChange={(e) => handleMultiSelect(e, 'ownsEquipment')}
                                                        className="w-5 h-5 text-[#2E7D32]"
                                                    />
                                                    <span className="font-bold text-gray-600">{t(`options.${item}`) || item}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    {renderCheckbox('awareSchemes', 'awareSchemes')}
                                    {renderCheckbox('appliedPmKisan', 'appliedPmKisan')}
                                    {renderCheckbox('insurance', 'insurance')}
                                    {renderCheckbox('subsidyReceived', 'subsidyReceived')}
                                </div>
                                {renderSelect('loanType', 'loanType', [
                                    { val: 'No Loan', label: 'noLoan' },
                                    { val: 'Bank Loan', label: 'bankLoan' },
                                    { val: 'Private Loan', label: 'privateLoan' },
                                    { val: 'Self-funded', label: 'selfFunded' }
                                ])}
                            </div>
                        )}

                        {currentStep === 5 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
                                {renderSelect('annualIncome', 'annualIncomeRange', [
                                    { val: 'Below ₹50,000', label: 'below50k' },
                                    { val: '₹50,000 – ₹1,00,000', label: '50kTo100k' },
                                    { val: '₹1,00,000 – ₹3,00,000', label: '100kTo300k' },
                                    { val: '₹3,00,000 – ₹5,00,000', label: '300kTo500k' },
                                    { val: 'Above ₹5,00,000', label: 'above500k' }
                                ])}
                                {renderInput('investment', 'investment', 'number', 'placeholderCurrency')}
                                {renderSelect('riskLevel', 'riskLevel', [
                                    { val: 'Low', label: 'low' },
                                    { val: 'Medium', label: 'medium' },
                                    { val: 'High', label: 'high' }
                                ])}
                                {renderSelect('marketingMethod', 'marketingMethod', [
                                    { val: 'Local Market', label: 'localMarket' },
                                    { val: 'Mandi', label: 'mandi' },
                                    { val: 'Direct to Buyer', label: 'directBuyer' },
                                    { val: 'Export', label: 'export' }
                                ])}
                                <div className="md:col-span-2 pt-4">
                                    {renderCheckbox('storage', 'storage')}
                                </div>
                            </div>
                        )}

                        {currentStep === 6 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {renderCheckbox('tryNewCrops', 'tryNewCrops')}
                                {renderCheckbox('organicFarming', 'organicFarming')}
                                {renderCheckbox('aiSuggestions', 'aiSuggestions')}
                                {renderCheckbox('contractFarming', 'contractFarming')}
                            </div>
                        )}

                        {currentStep === 7 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
                                {renderInput('rainfall', 'rainfall', 'number', 'placeholderRainfall')}
                                {renderInput('temperature', 'temperature', 'number', 'placeholderTemp')}
                                {renderInput('humidity', 'humidity', 'number', 'placeholderHumidity')}
                                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                                    {renderCheckbox('floodProne', 'floodProne')}
                                    {renderCheckbox('droughtProne', 'droughtProne')}
                                    {renderCheckbox('fpoMember', 'fpoMember')}
                                </div>
                            </div>
                        )}

                        {currentStep === 8 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
                                {renderInput('electricity', 'electricity', 'number', 'placeholderHours')}
                                {renderInput('storageCapacity', 'storageCapacity', 'number', 'placeholderWater')}
                                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                                    {renderCheckbox('solarPump', 'solarPump')}
                                    {renderCheckbox('rainwaterHarvesting', 'rainwaterHarvesting')}
                                </div>
                            </div>
                        )}

                        {currentStep === 9 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
                                {renderInput('marketName', 'marketName')}
                                {renderInput('marketDistance', 'marketDistance', 'number', 'placeholderDistance')}
                                {renderSelect('transport', 'transport', [
                                    { val: 'Own Vehicle', label: 'ownVehicle' },
                                    { val: 'Rental', label: 'rental' },
                                    { val: 'No Transport', label: 'noTransport' }
                                ])}
                                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                                    {renderCheckbox('trainingAttended', 'trainingAttended')}
                                    {renderCheckbox('priceAlerts', 'priceAlerts')}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-20 flex flex-col sm:flex-row justify-between items-center pt-10 border-t border-gray-100 gap-6">
                        <button
                            type="button"
                            onClick={() => setCurrentStep(prev => prev - 1)}
                            disabled={currentStep === 1}
                            className={`w-full sm:w-auto flex items-center justify-center space-x-3 px-10 py-4 rounded-2xl font-black transition-all ${currentStep === 1 ? 'invisible' : 'text-gray-400 hover:text-[#2E7D32] hover:bg-green-50'}`}
                        >
                            <ChevronLeft size={24} />
                            <span>{t('previous')}</span>
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full sm:w-auto btn-primary px-16 py-5 flex items-center justify-center space-x-4 text-xl tracking-tight shadow-2xl shadow-green-200/50"
                        >
                            {loading ? (
                                <span className="animate-spin rounded-full h-7 w-7 border-b-2 border-white"></span>
                            ) : (
                                <>
                                    <span>{currentStep === 9 ? t('submit') : t('next')}</span>
                                    {currentStep < 9 && <ChevronRight size={24} />}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <footer className="mt-12 text-center text-gray-300 text-sm font-bold uppercase tracking-[0.3em]">
                AgriNova AI © 2026 • Powering Sustenance
            </footer>
        </div>
    );
};

export default FarmerForm;
