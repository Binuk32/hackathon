import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { fetchTools } from '../services/toolService';
import ToolCard from '../components/ToolCard.jsx';
import AddToolModal from '../components/AddToolModal.jsx';

export default function AdminDashboard() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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

    // Calculate Summary Statistics
    const totalTypes = tools.length;
    const totalQuantity = tools.reduce((acc, item) => acc + (item.totalQuantity || 0), 0);
    const availableQuantity = tools.reduce((acc, item) => acc + (item.availableQuantity || 0), 0);
    const lowStockCount = tools.filter(item => item.availableQuantity > 0 && item.availableQuantity <= 3).length;

    if (!user || !user.token) {
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
            {/* Top Navigation Bar */}
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
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content Body */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Toast Notification Alert */}
                {toastMessage && (
                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl font-bold flex items-center justify-between shadow-sm animate-fade-in">
                        <div className="flex items-center gap-2.5">
                            <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{toastMessage}</span>
                        </div>
                        <button onClick={() => setToastMessage('')} className="text-emerald-600 hover:text-emerald-900 text-lg leading-none">&times;</button>
                    </div>
                )}

                {/* Dashboard Action Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                    <div>
                        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Tools & Equipment</h2>
                        <p className="text-slate-500 text-sm mt-1">Manage, add, and monitor tool inventory and rental availability.</p>
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 shrink-0"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                        </svg>
                        + Add New Tool
                    </button>
                </div>

                {/* Summary Metric Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Equipment Types</div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{loading ? '...' : totalTypes}</div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Fleet Units</div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{loading ? '...' : totalQuantity}</div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                        <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Available Units</div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">{loading ? '...' : availableQuantity}</div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                        <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Low Stock Items</div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-amber-600">{loading ? '...' : lowStockCount}</div>
                    </div>
                </div>

                {/* Section Content States */}

                {/* 1. Loading State */}
                {loading && (
                    <div className="py-20 text-center flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200/80">
                        <svg className="animate-spin h-10 w-10 text-slate-900 mb-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="text-slate-600 font-bold text-base">Loading tools...</p>
                        <p className="text-slate-400 text-xs mt-1">Fetching latest inventory from database</p>
                    </div>
                )}

                {/* 2. Error State */}
                {!loading && error && (
                    <div className="bg-white rounded-2xl border border-rose-200 p-8 text-center max-w-lg mx-auto my-8 shadow-xs">
                        <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                            !
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Unable to load tools</h3>
                        <p className="text-slate-500 text-sm mb-6">{error}</p>
                        <button
                            onClick={loadTools}
                            className="bg-slate-900 text-white font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-slate-800 transition-all shadow-xs"
                        >
                            Please try again
                        </button>
                    </div>
                )}

                {/* 3. Empty State */}
                {!loading && !error && tools.length === 0 && (
                    <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center my-4">
                        <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-extrabold text-slate-900 mb-1">No tools available yet</h3>
                        <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
                            Add your first tool to start managing hardware equipment inventory.
                        </p>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="bg-slate-900 text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-slate-800 transition-all shadow-md hover:-translate-y-0.5 inline-flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                            </svg>
                            + Add New Tool
                        </button>
                    </div>
                )}

                {/* 4. Display Tools Grid */}
                {!loading && !error && tools.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {tools.map((tool) => (
                            <ToolCard key={tool._id} tool={tool} />
                        ))}
                    </div>
                )}
            </main>

            {/* Add Tool Modal */}
            <AddToolModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={handleAddToolSuccess}
            />
        </div>
    );
}
