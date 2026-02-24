import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Leaf, LogOut, Languages } from 'lucide-react';
import { logoutUser } from '../api/api';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
            setIsAuthenticated(false);
            sessionStorage.removeItem('isLoggedIn');
            navigate('/login');
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ta' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <nav className="bg-white border-b border-secondary px-6 py-4 flex items-center justify-between sticky top-0 z-50">
            <Link to="/" className="flex items-center gap-2 group">
                <Leaf className="text-primary group-hover:rotate-12 transition-transform" size={28} />
                <span className="text-2xl font-black text-primary tracking-tight">AgriNova AI</span>
            </Link>

            <div className="flex items-center gap-6">
                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 text-gray-600 hover:text-primary font-bold transition-colors"
                >
                    <Languages size={20} />
                    <span className="hidden sm:inline">{i18n.language === 'en' ? 'தமிழ்' : 'English'}</span>
                </button>

                {isAuthenticated && (
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-red-500 hover:text-red-700 font-bold transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="hidden sm:inline">{t('logout')}</span>
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
