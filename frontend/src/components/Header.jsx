import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Leaf, Cpu, Globe, LayoutDashboard } from 'lucide-react';

const Header = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ta' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo & Branding */}
                <div className="flex items-center gap-10">
                    <Link to="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
                        <div className="relative">
                            <div className="w-12 h-12 bg-[#2E7D32] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-100">
                                <Leaf size={24} />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#A5D6A7] rounded-lg flex items-center justify-center text-[#1B5E20] border-2 border-white">
                                <Cpu size={14} />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-gray-900 leading-none">AgriNova AI</h1>
                            <p className="text-[10px] font-bold text-[#2E7D32] uppercase tracking-[0.2em] mt-1">Smart Farming. Smarter Future.</p>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            to="/dashboard"
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${location.pathname === '/dashboard' ? 'bg-green-50 text-[#2E7D32]' : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            <LayoutDashboard size={18} />
                            {t('dashboard')}
                        </Link>
                    </nav>
                </div>

                {/* Language Toggle */}
                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-green-50 rounded-xl transition-all group"
                >
                    <Globe size={18} className="text-gray-400 group-hover:text-[#2E7D32]" />
                    <span className="text-sm font-black text-gray-600 group-hover:text-[#2E7D32]">
                        {i18n.language === 'en' ? 'தமிழ்' : 'English'}
                    </span>
                </button>
            </div>
        </header>
    );
};

export default Header;
