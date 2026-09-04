import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function LoginModal({ isOpen, onClose }) {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);

    if (!isOpen) return null;

    // Pull base URL from client environment
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoginMessage('');

        if (!loginUsername || !loginPassword) {
            setLoginMessage('Please enter both username and password.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: loginUsername,
                    password: loginPassword,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Invalid username or password.');
            }

            // Save token and user details in AuthContext + localStorage
            login(data);

            setLoginMessage('Login successful! Redirecting to Inventory Dashboard...');

            setTimeout(() => {
                setLoading(false);
                setLoginMessage('');
                onClose();
            }, 1000);
        } catch (err) {
            setLoading(false);
            setLoginMessage(err.message);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4" onClick={onClose}>
            <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl border border-slate-100 relative" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 text-2xl leading-none"
                    disabled={loading}
                >
                    &times;
                </button>
                <h2 className="text-2xl font-extrabold mb-1 tracking-tight text-slate-900">Staff Portal</h2>
                <p className="text-slate-500 text-sm mb-6">Log in to manage Indunil Hardware inventory & rentals</p>

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5" htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                            placeholder="Enter staff username"
                            value={loginUsername}
                            onChange={(e) => setLoginUsername(e.target.value)}
                            disabled={loading}
                            autoFocus
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                            placeholder="Enter password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    {loginMessage && (
                        <p className={`text-sm font-bold ${loginMessage.includes('successful') ? 'text-emerald-600' : 'text-red-600'}`}>
                            {loginMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-slate-900 text-white font-bold rounded-lg py-3.5 mt-2 hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50"
                    >
                        {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
                    </button>
                </form>
            </div>
        </div>
    );
}