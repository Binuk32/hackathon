import React, { useState, useEffect } from 'react';
import { createRental } from '../services/rentalService';

export default function RentModal({ isOpen, onClose, tool, onSuccess }) {
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [costPerDay, setCostPerDay] = useState(0);
    const [totalDays, setTotalDays] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (tool) {
            setCostPerDay(tool.costPerDay || 0);
            setQuantity(1);
            setTotalDays(1);
            setCustomerName('');
            setCustomerPhone('');
            setError('');
        }
    }, [tool, isOpen]);

    if (!isOpen || !tool) return null;

    // Real-time Total Calculation: Quantity * Cost Per Day * Days
    const calculatedTotal = Number(quantity || 0) * Number(costPerDay || 0) * Number(totalDays || 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!customerName.trim() || !customerPhone.trim()) {
            setError('Please provide customer name and contact phone.');
            return;
        }

        if (Number(quantity) > tool.availableQuantity) {
            setError(`Cannot rent more than available stock (${tool.availableQuantity}).`);
            return;
        }

        setLoading(true);

        try {
            const returnDate = new Date();
            returnDate.setDate(returnDate.getDate() + parseInt(totalDays, 10));

            await createRental({
                itemId: tool._id,
                customerName: customerName.trim(),
                customerPhone: customerPhone.trim(),
                quantity: Number(quantity),
                costPerDay: Number(costPerDay),
                totalDays: Number(totalDays),
                totalAmount: calculatedTotal,
                returnDate: returnDate.toISOString()
            });

            setLoading(false);
            onSuccess('Item rented successfully!');
            onClose();
        } catch (err) {
            setLoading(false);
            setError(err.message);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4" onClick={onClose}>
            <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Rent Equipment</h3>
                <p className="text-xs text-slate-500 mb-4">
                    Item: <span className="font-semibold text-slate-800">{tool.name}</span> (Available: {tool.availableQuantity})
                </p>

                {error && <p className="text-xs font-bold text-red-600 mb-3">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Customer Name</label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 bg-slate-50 border rounded-lg text-sm focus:outline-none"
                            placeholder="e.g. Kasun Perera"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 bg-slate-50 border rounded-lg text-sm focus:outline-none"
                            placeholder="e.g. 0771234567"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Quantity</label>
                            <input
                                type="number"
                                min="1"
                                max={tool.availableQuantity}
                                required
                                className="w-full px-3 py-2 bg-slate-50 border rounded-lg text-sm focus:outline-none"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Cost Per Day (LKR)</label>
                            <input
                                type="number"
                                min="0"
                                required
                                className="w-full px-3 py-2 bg-slate-50 border rounded-lg text-sm focus:outline-none"
                                value={costPerDay}
                                onChange={(e) => setCostPerDay(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Rental Duration (Days)</label>
                        <input
                            type="number"
                            min="1"
                            required
                            className="w-full px-3 py-2 bg-slate-50 border rounded-lg text-sm focus:outline-none"
                            value={totalDays}
                            onChange={(e) => setTotalDays(e.target.value)}
                        />
                    </div>

                    {/* Calculated Price Display */}
                    <div className="p-3 bg-sky-50 border border-sky-100 rounded-xl flex items-center justify-between mt-2">
                        <span className="text-xs font-bold text-slate-600">Total Calculation:</span>
                        <span className="text-base font-extrabold text-sky-700">
                            LKR {calculatedTotal.toLocaleString()}
                        </span>
                    </div>

                    <div className="flex gap-2 pt-3">
                        <button type="button" onClick={onClose} className="w-1/2 py-2 border rounded-lg text-xs font-bold text-slate-600">Cancel</button>
                        <button type="submit" disabled={loading} className="w-1/2 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors">
                            {loading ? 'Processing...' : 'Confirm Rental'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}