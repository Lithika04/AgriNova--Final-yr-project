import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sprout, MessageSquare, Box, ArrowRight } from 'lucide-react';

const Home = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const sections = [
        {
            title: t('recommendation_system'),
            description: t('recommendation_desc'),
            icon: Sprout,
            color: "bg-primary",
            active: true,
            path: "/profile"
        },
        {
            title: t('chatbot'),
            description: t('chatbot_desc') + " (" + t('coming_soon') + ")",
            icon: MessageSquare,
            color: "bg-gray-400",
            active: false
        },
        {
            title: t('simulation'),
            description: t('simulation_desc') + " (" + t('coming_soon') + ")",
            icon: Box,
            color: "bg-gray-400",
            active: false
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <main className="max-w-6xl mx-auto p-8 pt-16">
                <header className="mb-16 text-center">
                    <h1 className="text-5xl font-black text-primary mb-4">{t('app_name')}</h1>
                    <p className="text-gray-600 text-xl font-medium">{t('tagline')}</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {sections.map((section, idx) => (
                        <div
                            key={idx}
                            className={`card relative overflow-hidden group hover:shadow-2xl transition-all duration-500 border-none ring-1 ring-secondary/50 ${!section.active && 'opacity-75 cursor-not-allowed'}`}
                        >
                            <div className={`${section.color} w-20 h-20 rounded-3xl flex items-center justify-center mb-8 text-white group-hover:rotate-6 transition-transform shadow-lg`}>
                                <section.icon size={40} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">{section.title}</h2>
                            <p className="text-gray-600 mb-8 leading-relaxed font-medium">{section.description}</p>

                            {section.active ? (
                                <button
                                    onClick={() => navigate(section.path)}
                                    className="flex items-center gap-2 text-primary font-black group-hover:gap-4 transition-all py-2"
                                >
                                    {t('get_started')} <ArrowRight size={20} />
                                </button>
                            ) : (
                                <span className="text-gray-400 font-bold bg-gray-100 px-4 py-2 rounded-xl text-sm italic">
                                    {t('coming_soon')}
                                </span>
                            )}

                            {/* Visual Flair */}
                            <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full ${section.color} opacity-5 group-hover:scale-150 transition-transform duration-700`}></div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Home;
