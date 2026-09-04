import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { fetchTools } from '../services/toolService';
import ToolCard from '../components/ToolCard.jsx';
import AddToolModal from '../components/AddToolModal.jsx';
import RentModal from '../components/RentModal.jsx';

export default function AdminDashboard() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const [selectedToolForRent, setSelectedToolForRent] = useState(null);
    const [isRentModalOpen, setIsRentModalOpen] = useState(false);

    const [toastMessage, setToastMessage] = useState('');

    const loadTools = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await fetchTools();
            setTools(data);
        } catch (err) {
            console.error('Failed to load tools:', err);
            setError(err.message || 'Unable to load tools. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && user.token) {
            loadTools();
        }
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleAddToolSuccess = (message) => {
        setToastMessage(message || 'Tool added successfully.');
        loadTools();
        setTimeout(() => setToastMessage(''), 4000);
    };

    const handleOpenRentModal = (tool) => {
        setSelectedToolForRent(tool);
        setIsRentModalOpen(true);
    };

    const handleRentSuccess = (message) => {
        setToastMessage(message || 'Rental created successfully!');
        loadTools();
        setTimeout(() => setToastMessage(''), 4000);
    };

    const totalTypes = tools.length;
    const totalQuantity = tools.reduce((acc, item) => acc + (item.totalQuantity || 0), 0);
    const availableQuantity = tools.reduce((acc, item) => acc + (item.availableQuantity || 0), 0);
    const lowStockCount = tools.filter(item => item.availableQuantity > 0 && item.availableQuantity <= 3).length;

    if (!user || !user.token) return null;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
            {/* Header */}
            <header className="bg-slate-900 text-white sticky top-0 z-40 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-sky-500 text-slate-900 p-2 rounded-xl flex items-center justify-center font-extrabold">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                            </svg>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-lg sm:text-xl font-extrabold tracking-tight">Admin Dashboard</h1>
                                <span className="bg-sky-500/20 text-sky-300 text-xs font-semibold px-2 py-0.5 rounded border border-sky-400/30">
                                    Inventory Staff
                                </span>
                            </div>
                            <p className="text-slate-400 text-xs hidden sm:block">Indunil Hardware Equipment Management</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex flex-col text-right text-xs">
                            <span className="text-slate-400">Authenticated Staff</span>
                            <span className="font-bold text-slate-100">{user.username || 'Admin'}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-slate-800 hover:bg-rose-600 text-slate-200 hover:text-white px-4 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all border border-slate-700 hover:border-rose-500 shadow-xs flex items-center gap-2"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {toastMessage && (
                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl font-bold flex items-center justify-between shadow-sm">
                        <span>{toastMessage}</span>
                        <button onClick={() => setToastMessage('')} className="text-emerald-600 font-bold">&times;</button>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                    <div>
                        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Tools & Equipment</h2>
                        <p className="text-slate-500 text-sm mt-1">Manage inventory or click a card to issue a rental.</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/admin/rentals')}
                            className="bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-xs flex items-center justify-center gap-2"
                        >
                            📋 View Rental History
                        </button>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                        >
                            + Add New Tool
                        </button>
                    </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Types</div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{loading ? '...' : totalTypes}</div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Fleet</div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{loading ? '...' : totalQuantity}</div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                        <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Available</div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">{loading ? '...' : availableQuantity}</div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                        <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Low Stock</div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-amber-600">{loading ? '...' : lowStockCount}</div>
                    </div>
                </div>

                {/* Grid display */}
                {!loading && !error && tools.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {tools.map((tool) => (
                            <ToolCard
                                key={tool._id}
                                tool={tool}
                                onRent={() => handleOpenRentModal(tool)}
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* Modals */}
            <AddToolModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={handleAddToolSuccess}
            />

            <RentModal
                isOpen={isRentModalOpen}
                tool={selectedToolForRent}
                onClose={() => {
                    setIsRentModalOpen(false);
                    setSelectedToolForRent(null);
                }}
                onSuccess={handleRentSuccess}
            />
        </div>
    );
}