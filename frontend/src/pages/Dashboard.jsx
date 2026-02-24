import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getDashboardData, downloadReport } from '../api/api';
import { TrendingUp, Cpu, Landmark, Sprout, ExternalLink, FileDown, CheckCircle2 } from 'lucide-react';

const Dashboard = () => {
    const { t, i18n } = useTranslation();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [schemeTab, setSchemeTab] = useState('central'); // 'central', 'tamil_nadu', 'women'

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getDashboardData();
                setData(res.data);
            } catch (err) {
                setError(err.response?.data?.error || "Failed to load dashboard");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDownloadPDF = async () => {
        try {
            const currentLang = i18n.language;
            const response = await downloadReport(currentLang);
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            const reportTitle = t('dashboard');
            link.setAttribute('download', `AgriNova_${reportTitle}_${data?.profile?.name || 'Farmer'}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error(err);
            alert("Error downloading report. Please try again.");
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-primary font-bold">{t('loading')}...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">{error}</div>;

    const { profile, analysis, tech_recommendations, schemes, crop_recommendations } = data;

    return (
        <div className="min-h-screen bg-[#F4F9F4] p-4 md:p-6 font-sans">
            <div className="max-w-5xl mx-auto space-y-10">

                {/* SECTION 1: FARMER PROFILE CARD */}
                <section className="bg-primary text-white rounded-[1.5rem] p-8 md:p-10 shadow-xl relative overflow-hidden transition-all duration-500 hover:shadow-primary/20">
                    <div className="relative z-10 space-y-8">
                        <div>
                            <span className="text-white/60 uppercase tracking-[0.2em] text-[10px] font-black">{t('FARMER PROFILE')}</span>
                            <h1 className="text-3xl md:text-4xl font-serif font-bold mt-2 tracking-tight">{profile.name}</h1>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 border-b border-white/10 pb-8">
                            <div>
                                <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">{t('DISTRICT')}</p>
                                <p className="text-base font-bold">{t(`districts.${profile.district}`) || profile.district}</p>
                            </div>
                            <div>
                                <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">{t('LAND AREA')}</p>
                                <p className="text-base font-bold">{profile.land_area}</p>
                            </div>
                            <div>
                                <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">{t('CROPS')}</p>
                                <p className="text-base font-bold">{t(`options.${profile.crops}`) || profile.crops}</p>
                            </div>
                            <div>
                                <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">{t('IRRIGATION')}</p>
                                <p className="text-base font-bold">{profile.irrigation}</p>
                            </div>
                            <div>
                                <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">{t('SOIL TYPE')}</p>
                                <p className="text-base font-bold">{t(`options.${profile.soil_type}`) || profile.soil_type}</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <div>
                                <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">{t('AGRO ZONE')}</p>
                                <p className="text-base font-bold">{t(profile.agro_zone)}</p>
                            </div>
                            <div className="flex-1"></div>
                            <div className="bg-white/10 px-4 py-2 rounded-xl text-xs font-bold border border-white/20 backdrop-blur-sm">
                                {t('Assessment date')}: {profile.assessment_date}
                            </div>
                            <div className="bg-white/10 px-4 py-2 rounded-xl text-xs font-bold border border-white/20 backdrop-blur-sm">
                                {t(`options.${analysis.level}`)} {t('Farmer')}
                            </div>
                        </div>

                        <button
                            onClick={handleDownloadPDF}
                            className="bg-white text-primary font-black px-8 py-4 rounded-xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-lg text-base hover:bg-gray-50"
                        >
                            <FileDown size={20} /> {t('download_report')}
                        </button>
                    </div>
                    {/* Brand glow decoration */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent rounded-full blur-[100px] -mr-48 -mt-48 opacity-30"></div>
                </section>

                {/* SECTION 2: ADOPTION ANALYSIS */}
                <section className="bg-white rounded-[1.5rem] p-8 md:p-10 shadow-lg border border-gray-100/50">
                    <h2 className="text-gray-400 uppercase tracking-[0.2em] text-[10px] font-black mb-8">{t('TECHNOLOGY ADOPTION RATE')}</h2>

                    <div className="flex flex-col md:flex-row gap-10 items-center mb-10">
                        {/* Circular Gauge */}
                        <div className="relative w-44 h-44 group">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="88" cy="88" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-50" />
                                <circle cx="88" cy="88" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={502} strokeDashoffset={502 - (502 * analysis.score) / 100} className="text-primary" strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-110">
                                <span className="text-4xl font-black text-primary leading-tight">{analysis.score}%</span>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('SCORE')}</span>
                            </div>
                        </div>

                        <div className="flex-1 space-y-4">
                            <span className="bg-primary/5 text-primary px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border border-primary/10">
                                {t(`options.${analysis.level}`)} {t('LEVEL')}
                            </span>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                                {t('Ahead of')} <span className="text-primary">{analysis.ahead_of}%</span> {t('of farmers in')} {t(`districts.${profile.district}`)} {t('district')}.
                            </h3>
                            <p className="text-gray-500 text-base leading-relaxed max-w-xl">
                                {t('Improve water efficiency and market access to reach the top tier and unlock higher scheme benefits.')}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <h4 className="text-gray-400 uppercase tracking-[0.2em] text-[10px] font-black mb-5">{t('YOUR 3 PRIORITY ACTIONS')}</h4>
                        <div className="grid grid-cols-1 gap-3">
                            {analysis.priority_actions.map((action, idx) => (
                                <div key={idx} className="flex items-center gap-6 p-6 bg-[#F9FDF9] rounded-[1.5rem] border border-[#E9F5E9] transition-all hover:border-primary/20 hover:shadow-md group">
                                    <div className="bg-primary text-white w-10 h-10 rounded-xl flex items-center justify-center font-black flex-shrink-0 text-base shadow-md group-hover:rotate-6 transition-transform">{idx + 1}</div>
                                    <div className="flex-1">
                                        <h5 className="font-bold text-lg text-gray-900 mb-0.5">{t(action.title)}</h5>
                                        <p className="text-sm text-gray-500">{t(action.desc)}</p>
                                    </div>
                                    <a href={action.link} target="_blank" rel="noreferrer" className="bg-white p-3 rounded-xl text-primary shadow-sm hover:bg-primary hover:text-white transition-all">
                                        <ExternalLink size={20} />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION 3: RECOMMENDATIONS */}
                <div className="space-y-10 pb-20">

                    {/* 3.1 TECH RECOMMENDATIONS */}
                    <section className="bg-white rounded-[1.5rem] p-8 md:p-10 shadow-lg border border-gray-100/50">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-50">
                            {t('Recommended Technologies')}
                        </h2>
                        <div className="grid grid-cols-1 gap-6">
                            {tech_recommendations.map((tech, idx) => (
                                <div key={idx} className="p-8 rounded-[1.5rem] border border-gray-100 bg-white hover:border-primary/20 transition-all group shadow-sm hover:shadow-md">
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-gray-900">{t(tech.name)}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">{t(tech.description)}</p>

                                        <div className="flex flex-wrap gap-2">
                                            {tech.tags.map((tag, i) => (
                                                <span key={i} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${tag.includes('Critical') ? 'bg-red-50 text-red-600 border border-red-100' :
                                                    tag.includes('Subsid') ? 'bg-primary/5 text-primary border border-primary/10' :
                                                        'bg-amber-50 text-amber-600 border border-amber-100'
                                                    }`}>
                                                    {t(tag)}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-gray-50">
                                            <div className="text-base font-black text-gray-900">
                                                {t(tech.cost)}
                                            </div>
                                            <div className="bg-primary text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.1em]">
                                                {t(tech.subsidy)}
                                            </div>
                                            <div className="flex-1"></div>
                                            <a href={tech.link} target="_blank" rel="noreferrer" className="bg-gray-50 text-primary px-6 py-3 rounded-xl text-xs font-black hover:bg-primary hover:text-white transition-all flex items-center gap-2 shadow-sm active:scale-95">
                                                {t('visit_website')} <ExternalLink size={16} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 3.2 GOVT SCHEMES */}
                    <section className="bg-white rounded-[1.5rem] p-8 md:p-10 shadow-lg border border-gray-100/50">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-50">{t('Government Schemes')}</h2>

                        {/* Tab Switcher */}
                        <div className="flex bg-gray-50 p-1.5 rounded-[1.25rem] mb-8 shadow-inner">
                            <button
                                onClick={() => setSchemeTab('central')}
                                className={`flex-1 py-3 text-xs font-black rounded-xl transition-all duration-300 uppercase tracking-widest ${schemeTab === 'central' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-primary'}`}
                            >
                                {t('central_india_schemes')}
                            </button>
                            <button
                                onClick={() => setSchemeTab('tamil_nadu')}
                                className={`flex-1 py-3 text-xs font-black rounded-xl transition-all duration-300 uppercase tracking-widest ${schemeTab === 'tamil_nadu' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-primary'}`}
                            >
                                {t('tamil_nadu_state')}
                            </button>
                            <button
                                onClick={() => setSchemeTab('women')}
                                className={`flex-1 py-3 text-xs font-black rounded-xl transition-all duration-300 uppercase tracking-widest ${schemeTab === 'women' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-primary'}`}
                            >
                                {t('women_schemes')}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {(schemes[schemeTab] || []).length > 0 ? (
                                schemes[schemeTab].map((scheme, idx) => (
                                    <div key={idx} className="p-8 rounded-[1.5rem] border border-gray-100 bg-white hover:border-primary/20 transition-all shadow-sm hover:shadow-md group">
                                        <div className="space-y-4">
                                            <h3 className="text-xl font-bold text-gray-900">{t(scheme.name)}</h3>
                                            <p className="text-gray-500 text-sm leading-relaxed">{t(scheme.description)}</p>

                                            <div className="flex flex-wrap gap-2">
                                                {scheme.benefits.map((benefit, i) => (
                                                    <span key={i} className="bg-primary/5 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-primary/10">
                                                        {t(benefit)}
                                                    </span>
                                                ))}
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border transition-colors ${scheme.status === 'Applied' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                                                    {t(scheme.status)}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-50">
                                                <a href={scheme.link} target="_blank" rel="noreferrer" className="bg-primary text-white px-8 py-3 rounded-xl text-xs font-black hover:bg-accent transition-all flex items-center gap-2 shadow-lg active:scale-95">
                                                    {t(scheme.action)} <ExternalLink size={16} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-gray-50 rounded-[1.5rem] border border-dashed border-gray-200">
                                    <p className="text-gray-400 font-black tracking-widest uppercase text-xs">{t('No specific schemes found for this category')}</p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* 3.3 CROP RECOMMENDATIONS */}
                    <section className="bg-white rounded-[1.5rem] p-8 md:p-10 shadow-lg border border-gray-100/50">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-50">
                            <h2 className="text-2xl font-bold text-gray-900">{t('Recommended Crops')}</h2>
                            <span className="bg-primary text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-md">
                                {t('For')} {t(`options.${profile.soil_type}`)} {t('Soil')}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {crop_recommendations.map((crop, idx) => (
                                <div key={idx} className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-[1.5rem] border border-gray-100 hover:bg-white transition-all group hover:shadow-md">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary mb-4 shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                                        <Sprout size={32} />
                                    </div>
                                    <h3 className="font-black text-gray-900 text-lg mb-1">{t(`options.${crop}`) || t(crop)}</h3>
                                    <p className="text-[9px] text-primary font-black uppercase tracking-[0.2em]">{t('SUITABLE')}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
