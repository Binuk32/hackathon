import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';
import RentalHistory from './pages/RentalHistory';
import { AuthContext } from './context/AuthContext';

// Protected Route Wrapper for Staff Pages
const ProtectedAdminRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user || !user.token) {
        return <Navigate to="/" replace />;
    }

    return children;
};

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route
                        path="/admin/dashboard"
                        element={
                            <ProtectedAdminRoute>
                                <AdminDashboard />
                            </ProtectedAdminRoute>
                        }
                    />
                    {/* Updated path to /admin/rentals */}
                    <Route
                        path="/admin/rentals"
                        element={
                            <ProtectedAdminRoute>
                                <RentalHistory />
                            </ProtectedAdminRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;