import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { submitProfile } from '../api/api';
import {
    ChevronRight, ChevronLeft, Save,
    User, MapPin, Droplets, Wallet,
    Cpu, Landmark, ShieldAlert, ShoppingCart
} from 'lucide-react';

const ProfileForm = () => {
    const { t, i18n } = useTranslation();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // SECTION 1: BASIC PROFILE
        name: '', age: '35', gender: 'Male', education: 'High School', farming_exp: '10', district: 'Select District',
        // SECTION 2: LAND & CROP
        land_size: '2', land_type: 'Dry', soil_type: 'Red', current_crops: 'Paddy', avg_yield: '1200', farming_type: 'Traditional',
        // SECTION 3: WATER
        irrigation_type: 'Rain-fed', water_source: 'Borewell', water_usage: '3000', rainfall: '800',
        // SECTION 4: FINANCIAL
        income_range: '₹1L–3L', loan_access: 'No', crop_insurance: 'No', savings_habit: 'Medium',
        // SECTION 5: TECH USAGE
        use_machinery: 'No', use_drip: 'No', use_mobile_apps: 'No', internet_access: 'No', tech_usage_count: '1',
        // SECTION 6: SCHEME AWARENESS
        scheme_awareness: 'No', enrolled_pm_kisan: 'No', enrolled_tn_schemes: 'No', member_shg: 'No', women_farmer: 'No',
        // SECTION 7: RISK & ATTITUDE
        will_adopt_new_tech: 'Maybe', risk_level: 'Medium', climate_concern: 'Medium', interested_training: 'Yes',
        // SECTION 8: MARKET
        selling_method: 'Local', storage_facility: 'No', transport_access: 'Yes', price_awareness: 'Medium'
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("Submitting form data:", formData);
        try {
            const res = await submitProfile(formData);
            console.log("Submission success:", res.data);
            navigate('/dashboard');
        } catch (err) {
            console.error("Submission error details:", err.response || err);
            alert(t('submission_failed') || "Submission failed. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const steps = [
        { id: 1, title: t('basic_profile'), icon: User },
        { id: 2, title: t('land_crop'), icon: MapPin },
        { id: 3, title: t('water_irrigation'), icon: Droplets },
        { id: 4, title: t('financial_details'), icon: Wallet },
        { id: 5, title: t('tech_usage'), icon: Cpu },
        { id: 6, title: t('scheme_awareness'), icon: Landmark },
        { id: 7, title: t('risk_attitude'), icon: ShieldAlert },
        { id: 8, title: t('market_sales'), icon: ShoppingCart },
    ];

    const currentStepInfo = steps[step - 1];

    // Helper to render select options with translations
    const renderOptions = (keys) => {
        return keys.map(key => (
            <option key={key} value={key}>{t(`options.${key}`)}</option>
        ));
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div><label className="block text-sm font-bold mb-1">{t('Full Name') || 'Full Name'}</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field" placeholder="John Doe" /></div>
                        <div><label className="block text-sm font-bold mb-1">{t('Age') || 'Age'} (18-80)</label>
                            <input type="number" name="age" value={formData.age} onChange={handleChange} className="input-field" min="18" max="80" /></div>
                        <div><label className="block text-sm font-bold mb-1">{t('Gender') || 'Gender'}</label>
                            <select name="gender" value={formData.gender} onChange={handleChange} className="input-field">{renderOptions(['Male', 'Female', 'Other'])}</select></div>
                        <div><label className="block text-sm font-bold mb-1">{t('Education Level') || 'Education Level'}</label>
                            <select name="education" value={formData.education} onChange={handleChange} className="input-field">{renderOptions(['No Education', 'Primary', 'High School', 'Diploma', 'Degree'])}</select></div>
                        <div><label className="block text-sm font-bold mb-1">{t('Farming Experience') || 'Farming Experience'} ({formData.farming_exp} {t('years')})</label>
                            <input type="range" name="farming_exp" value={formData.farming_exp} onChange={handleChange} min="0" max="50" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" /></div>
                        <div><label className="block text-sm font-bold mb-1">{t('District') || 'District'}</label>
                            <select name="district" value={formData.district} onChange={handleChange} className="input-field">
                                <option value="Select District">{t('options.Select District') || 'Select District'}</option>
                                {Object.keys(t('districts', { returnObjects: true }) || {}).map(d => (
                                    <option key={d} value={d}>{t(`districts.${d}`)}</option>
                                ))}
                            </select></div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div><label className="block text-sm font-bold mb-1">{t('Total Land Size') || 'Total Land Size'} (Acres)</label>
                            <input type="number" step="0.1" name="land_size" value={formData.land_size} onChange={handleChange} className="input-field" /></div>
                        <div><label className="block text-sm font-bold mb-1">{t('Land Type') || 'Land Type'}</label>
                            <select name="land_type" value={formData.land_type} onChange={handleChange} className="input-field">{renderOptions(['Wet', 'Dry', 'Mixed'])}</select></div>
                        <div><label className="block text-sm font-bold mb-1">{t('Soil Type') || 'Soil Type'}</label>
                            <select name="soil_type" value={formData.soil_type} onChange={handleChange} className="input-field">{renderOptions(['Red', 'Black', 'Alluvial', 'Sandy'])}</select></div>
                        <div><label className="block text-sm font-bold mb-1">{t('Current Crops') || 'Current Crops'}</label>
                            <select name="current_crops" value={formData.current_crops} onChange={handleChange} className="input-field">{renderOptions(['Paddy', 'Maize', 'Cotton', 'Sugarcane', 'Groundnut', 'Banana'])}</select></div>
                        <div><label className="block text-sm font-bold mb-1">{t('Avg Yield') || 'Avg Yield'} (kg/acre)</label>
                            <input type="number" name="avg_yield" value={formData.avg_yield} onChange={handleChange} className="input-field" /></div>
                        <div><label className="block text-sm font-bold mb-1">{t('Farming Type') || 'Farming Type'}</label>
                            <select name="farming_type" value={formData.farming_type} onChange={handleChange} className="input-field">{renderOptions(['Traditional', 'Organic', 'Mixed'])}</select></div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div><label className="block text-sm font-bold mb-1">{t('Irrigation Type') || 'Irrigation Type'}</label>
                            <select name="irrigation_type" value={formData.irrigation_type} onChange={handleChange} className="input-field">{renderOptions(['Rain-fed', 'Drip', 'Sprinkler', 'Canal', 'Borewell'])}</select></div>
                        <div><label className="block text-sm font-bold mb-1">{t('Water Source') || 'Water Source'}</label>
                            <select name="water_source" value={formData.water_source} onChange={handleChange} className="input-field">{renderOptions(['River', 'Borewell', 'Tank', 'Rainwater'])}</select></div>
                        <div><label className="block text-sm font-bold mb-1">{t('Water Usage') || 'Water Usage'} (Litres/day)</label>
                            <input type="number" name="water_usage" value={formData.water_usage} onChange={handleChange} className="input-field" /></div>
                        <div><label className="block text-sm font-bold mb-1">{t('Annual Rainfall') || 'Annual Rainfall'} (mm/year)</label>
                            <input type="number" name="rainfall" value={formData.rainfall} onChange={handleChange} className="input-field" /></div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div><label className="block text-sm font-bold mb-1">{t('Annual Income') || 'Annual Income'}</label>
                            <select name="income_range" value={formData.income_range} onChange={handleChange} className="input-field">{renderOptions(['<₹50k', '₹50k–1L', '₹1L–3L', '₹3L–5L', '>₹5L'])}</select></div>
                        <div><label className="block text-sm font-bold mb-1">{t('Loan Access') || 'Access to Loan?'}</label>
                            <select name="loan_access" value={formData.loan_access} onChange={handleChange} className="input-field">{renderOptions(['Yes', 'No'])}</select></div>
                        <div><label className="block text-sm font-bold mb-1">{t('Crop Insurance') || 'Crop Insurance?'}</label>
                            <select name="crop_insurance" value={formData.crop_insurance} onChange={handleChange} className="input-field">{renderOptions(['Yes', 'No'])}</select></div>
                        <div><label className="block text-sm font-bold mb-1">{t('Savings Habit') || 'Savings Habit'}</label>
                            <select name="savings_habit" value={formData.savings_habit} onChange={handleChange} className="input-field">{renderOptions(['Low', 'Medium', 'High'])}</select></div>
                    </div>
                );
            case 5:
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div><label className="block text-sm font-bold mb-1">{t('Uses Machinery') || 'Uses Machinery?'}</label>
                            <select name="use_machinery" value={formData.use_machinery} onChange={handleChange} className="input-field">{renderOptions(['Yes', 'No'])}</select></div>
                        <div><label className="block text-sm font-bold mb-1">{t('Uses Drip/Sprinkler') || 'Uses Drip/Sprinkler?'}</label>
                            <select name="use_drip" value={formData.use_drip} onChange={handleChange} className="input-field">{renderOptions(['Yes', 'No'])}</select></div>
                        <div><label className="block text-sm font-bold mb-1">{t('Uses Mobile Apps') || 'Uses Mobile Apps?'}</label>
                            <select name="use_mobile_apps" value={formData.use_mobile_apps} onChange={handleChange} className="input-field">{renderOptions(['Yes', 'No'])}</select></div>
                        <div><label className="block text-sm font-bold mb-1">{t('Internet Access') || 'Internet Access?'}</label>
                            <select name="internet_access" value={formData.internet_access} onChange={handleChange} className="input-field">{renderOptions(['Yes', 'No'])}</select></div>
                        <div><label className="block text-sm font-bold mb-1">{t('No. of Technologies Used') || 'No. of Technologies Used'} ({formData.tech_usage_count})</label>
                            <input type="range" name="tech_usage_count" value={formData.tech_usage_count} onChange={handleChange} min="0" max="10" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" /></div>
                    </div>
                );
            case 6:
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div><label className="block text-sm font-bold mb-1">{t('Aware of Govt Schemes') || 'Aware of Govt Schemes?'}</label>
                            <select name="scheme_awareness" value={formData.scheme_awareness} onChange={handleChange} className="input-field">{renderOptions(['Yes', 'No'])}</select></div>
                        <div><label className="block text-sm font-bold mb-1">{t('Enrolled in PM-KISAN') || 'Enrolled in PM-KISAN?'}</label>
                            <select name="enrolled_pm_kisan" value={formData.enrolled_pm_kisan} onChange={handleChange} className="input-field">{renderOptions(['Yes', 'No'])}</select></div>
                        <div><label className="block text-sm font-bold mb-1">{t('Enrolled in TN Schemes') || 'Enrolled in TN Schemes?'}</label>
                            <select name="enrolled_tn_schemes" value={formData.enrolled_tn_schemes} onChange={handleChange} className="input-field">{renderOptions(['Yes', 'No'])}</select></div>
                        <div><label className="block text-sm font-bold mb-1">{t('Member of SHG') || 'Member of SHG?'}</label>
                            <select name="member_shg" value={formData.member_shg} onChange={handleChange} className="input-field">{renderOptions(['Yes', 'No'])}</select></div>
                        <div><label className="block text-sm font-bold mb-1">{t('Women Farmer') || 'Women Farmer?'}</label>
                            <select name="women_farmer" value={formData.women_farmer} onChange={handleChange} className="input-field">{renderOptions(['Yes', 'No'])}</select></div>
                    </div>
                );
            case 7:
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div><label className="block text-sm font-bold mb-1">{t('Willing to Adopt Tech') || 'Willing to Adopt Tech?'}</label>
                            <select name="will_adopt_new_tech" value={formData.will_adopt_new_tech} onChange={handleChange} className="input-field">{renderOptions(['Yes', 'Maybe', 'No'])}</select></div>
                        <div><label className="block text-sm font-bold mb-1">{t('Risk Level') || 'Risk Level'}</label>
                            <select name="risk_level" value={formData.risk_level} onChange={handleChange} className="input-field">{renderOptions(['Low', 'Medium', 'High'])}</select></div>
                        <div><label className="block text-sm font-bold mb-1">{t('Climate Concern') || 'Climate Concern'}</label>
                            <select name="climate_concern" value={formData.climate_concern} onChange={handleChange} className="input-field">{renderOptions(['Low', 'Medium', 'High'])}</select></div>
                        <div><label className="block text-sm font-bold mb-1">{t('Interested in Training') || 'Interested in Training?'}</label>
                            <select name="interested_training" value={formData.interested_training} onChange={handleChange} className="input-field">{renderOptions(['Yes', 'No'])}</select></div>
                    </div>
                );
            case 8:
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div><label className="block text-sm font-bold mb-1">{t('Selling Method') || 'Selling Method'}</label>
                            <select name="selling_method" value={formData.selling_method} onChange={handleChange} className="input-field">{renderOptions(['Local', 'Mandi', 'Direct', 'Online'])}</select></div>
                        <div><label className="block text-sm font-bold mb-1">{t('Storage Facility') || 'Storage Facility?'}</label>
                            <select name="storage_facility" value={formData.storage_facility} onChange={handleChange} className="input-field">{renderOptions(['Yes', 'No'])}</select></div>
                        <div><label className="block text-sm font-bold mb-1">{t('Transport Access') || 'Transport Access?'}</label>
                            <select name="transport_access" value={formData.transport_access} onChange={handleChange} className="input-field">{renderOptions(['Yes', 'No'])}</select></div>
                        <div><label className="block text-sm font-bold mb-1">{t('Price Awareness') || 'Price Awareness'}</label>
                            <select name="price_awareness" value={formData.price_awareness} onChange={handleChange} className="input-field">{renderOptions(['Low', 'Medium', 'High'])}</select></div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="card max-w-2xl w-full border-none shadow-2xl p-8 bg-white">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                        <currentStepInfo.icon size={48} className="text-primary" />
                    </div>
                    <h1 className="text-3xl font-black text-primary text-center tracking-tight">{currentStepInfo.title}</h1>
                    <p className="text-gray-500 font-bold mt-1 uppercase tracking-widest text-xs">
                        {t('step')} {step} {t('of')} 8
                    </p>
                </div>

                <div className="flex gap-2 mb-10">
                    {steps.map((s) => (
                        <div key={s.id} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${s.id <= step ? 'bg-primary' : 'bg-gray-200'}`}></div>
                    ))}
                </div>

                <form onSubmit={step === 8 ? handleSubmit : (e) => e.preventDefault()}>
                    <div className="min-h-[350px]">
                        {renderStep()}
                    </div>

                    <div className="flex justify-between mt-12 pt-6 border-t border-secondary/50">
                        {step > 1 ? (
                            <button type="button" onClick={prevStep} className="flex items-center gap-2 text-gray-500 font-black hover:text-primary transition-colors py-2 px-4">
                                <ChevronLeft size={24} /> {t('previous')}
                            </button>
                        ) : <div />}

                        <div className="ml-auto">
                            {step < 8 ? (
                                <button type="button" onClick={nextStep} className="btn-primary flex items-center gap-2 !px-8 !py-4 text-lg font-black group">
                                    {t('next')} <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            ) : (
                                <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2 !bg-accent !px-10 !py-4 text-lg font-black shadow-xl hover:shadow-accent/20 transition-all">
                                    {loading ? 'Processing...' : <><Save size={24} /> {t('submit_analysis')}</>}
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileForm;
