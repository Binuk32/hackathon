import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

export default function RentalHistory() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toastMessage, setToastMessage] = useState('');
    const [selectedRental, setSelectedRental] = useState(null);

    // Get Auth Token Headers
    const getAuthHeaders = () => {
        return user && user.token
            ? { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` }
            : { 'Content-Type': 'application/json' };
    };

    // Fetch All Rentals directly
    const loadRentals = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/rentals', {
                headers: getAuthHeaders(),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to fetch rentals');
            setRentals(data || []);
        } catch (err) {
            setToastMessage(err.message || 'Failed to fetch rentals');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && user.token) {
            loadRentals();
        } else {
            navigate('/');
        }
    }, [user, navigate]);

    // Handle Return Action directly
    const handleReturn = async (rentalId) => {
        try {
            const response = await fetch(`/api/rentals/${rentalId}/return`, {
                method: 'PUT',
                headers: getAuthHeaders(),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Return action failed');

            setToastMessage('Item returned successfully!');
            setSelectedRental(null);
            loadRentals();
        } catch (err) {
            setToastMessage(err.message || 'Return action failed');
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

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
                            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight">Rental History</h1>
                            <p className="text-slate-400 text-xs">Indunil Hardware Equipment Management</p>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg font-bold text-xs sm:text-sm border border-slate-700"
                    >
                        &larr; Back to Dashboard
                    </button>
                </div>
            </header>

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {toastMessage && (
                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl font-bold flex items-center justify-between shadow-xs">
                        <span>{toastMessage}</span>
                        <button onClick={() => setToastMessage('')} className="text-emerald-600 font-bold">&times;</button>
                    </div>
                )}

                <div className="mb-6">
                    <h2 className="text-2xl font-extrabold text-slate-900">Rental Records ({rentals.length})</h2>
                    <p className="text-slate-500 text-sm mt-0.5">Click any transaction card to view full details or process a return.</p>
                </div>

                {loading ? (
                    <div className="py-20 text-center text-slate-400 font-bold">Loading rental orders...</div>
                ) : rentals.length === 0 ? (
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center">
                        <p className="text-slate-500 font-bold">No rental history records found.</p>
                        <p className="text-slate-400 text-xs mt-1">Issue a rental from the admin dashboard to see records here.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {rentals.map((rental) => (
                            <div
                                key={rental._id}
                                onClick={() => setSelectedRental(rental)}
                                className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                                            rental.status === 'Active'
                                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                        }`}>
                                            {rental.status}
                                        </span>
                                        <span className="text-[11px] font-semibold text-slate-400">
                                            Qty: <strong className="text-slate-800">{rental.quantity || 1}</strong>
                                        </span>
                                    </div>

                                    <h3 className="font-extrabold text-slate-900 text-base mb-1 group-hover:text-sky-600 transition-colors">
                                        {rental.itemId?.name || 'Deleted Equipment'}
                                    </h3>
                                    <p className="text-xs text-slate-500">Customer: <strong className="text-slate-800">{rental.customerName}</strong></p>
                                    <p className="text-xs text-slate-400 mt-0.5">Contact: {rental.customerPhone}</p>

                                    <div className="mt-3 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-center justify-between text-slate-600">
                                        <span>Due Return:</span>
                                        <strong className="text-slate-900">{formatDate(rental.returnDate)}</strong>
                                    </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Total Amount</p>
                                        <p className="text-sm font-extrabold text-sky-700">LKR {(rental.totalAmount || 0).toLocaleString()}</p>
                                    </div>
                                    <span className="text-xs font-bold text-sky-600 group-hover:translate-x-0.5 transition-transform">
                                        Details &rarr;
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Modal Detail Popup */}
            {selectedRental && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4" onClick={() => setSelectedRental(null)}>
                    <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                            <h3 className="text-lg font-extrabold text-slate-900">Rental Record Details</h3>
                            <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                                selectedRental.status === 'Active' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            }`}>
                                {selectedRental.status}
                            </span>
                        </div>

                        <div className="space-y-2.5 text-xs text-slate-600">
                            <div className="flex justify-between py-1 border-b border-slate-50">
                                <span>Tool Name:</span>
                                <strong className="text-slate-900">{selectedRental.itemId?.name || 'N/A'}</strong>
                            </div>
                            <div className="flex justify-between py-1 border-b border-slate-50">
                                <span>Customer Name:</span>
                                <strong className="text-slate-900">{selectedRental.customerName}</strong>
                            </div>
                            <div className="flex justify-between py-1 border-b border-slate-50">
                                <span>Phone Number:</span>
                                <strong className="text-slate-900">{selectedRental.customerPhone}</strong>
                            </div>
                            <div className="flex justify-between py-1 border-b border-slate-50">
                                <span>Quantity Rented:</span>
                                <strong className="text-slate-900">{selectedRental.quantity || 1} unit(s)</strong>
                            </div>
                            <div className="flex justify-between py-1 border-b border-slate-50">
                                <span>Issued Date:</span>
                                <strong className="text-slate-900">{formatDate(selectedRental.issueDate || selectedRental.createdAt)}</strong>
                            </div>
                            <div className="flex justify-between py-1 border-b border-slate-50">
                                <span>Return Date:</span>
                                <strong className="text-slate-900">{formatDate(selectedRental.returnDate)}</strong>
                            </div>
                            <div className="flex justify-between py-1 border-b border-slate-50">
                                <span>Duration:</span>
                                <strong className="text-slate-900">{selectedRental.totalDays} day(s)</strong>
                            </div>
                            <div className="flex justify-between py-1 border-b border-slate-50">
                                <span>Rate / Day:</span>
                                <strong className="text-slate-900">LKR {(selectedRental.costPerDay || 0).toLocaleString()}</strong>
                            </div>
                            <div className="flex justify-between py-2 text-sm font-extrabold text-sky-700 bg-sky-50 px-3 rounded-lg mt-2">
                                <span>Total Charges:</span>
                                <span>LKR {(selectedRental.totalAmount || 0).toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-5">
                            <button
                                onClick={() => setSelectedRental(null)}
                                className="w-full py-2.5 border border-slate-200 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-50 transition-colors"
                            >
                                Close
                            </button>
                            {selectedRental.status === 'Active' && (
                                <button
                                    onClick={() => handleReturn(selectedRental._id)}
                                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition-colors shadow-xs"
                                >
                                    Mark as Returned
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}