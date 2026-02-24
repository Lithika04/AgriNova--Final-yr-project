import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProfileForm from './pages/ProfileForm';
import Dashboard from './pages/Dashboard';
import { checkSession } from './api/api';

const PrivateRoute = ({ children, isAuthenticated }) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('isLoggedIn'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifySession = async () => {
            try {
                const res = await checkSession();
                if (res.data.logged_in) {
                    setIsAuthenticated(true);
                    sessionStorage.setItem('isLoggedIn', 'true');
                } else {
                    setIsAuthenticated(false);
                    sessionStorage.removeItem('isLoggedIn');
                }
            } catch (err) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        verifySession();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-primary font-bold">Verifying Session...</div>;

    return (
        <Router>
            <div className="min-h-screen bg-white">
                <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
                <Routes>
                    <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/register" element={isAuthenticated ? <Navigate to="/" replace /> : <Register />} />

                    <Route path="/" element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <Home />
                        </PrivateRoute>
                    } />

                    <Route path="/profile" element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <ProfileForm />
                        </PrivateRoute>
                    } />

                    <Route path="/dashboard" element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <Dashboard />
                        </PrivateRoute>
                    } />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
