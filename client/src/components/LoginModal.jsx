import React, { useState } from 'react';

export default function LoginModal({ isOpen, onClose }) {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');

    if (!isOpen) return null;

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (!loginUsername || !loginPassword) {
            setLoginMessage('Please enter both username and password.');
            return;
        }
        if (loginUsername === 'admin' && loginPassword === 'admin123') {
            setLoginMessage('Login successful! Redirecting to Inventory Dashboard...');
            setTimeout(() => {
                onClose();
                setLoginMessage('');
            }, 1200);
        } else {
            setLoginMessage('Invalid credentials. (Hint: use admin / admin123)');
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4" onClick={onClose}>
            <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl border border-slate-100 relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 text-2xl leading-none">
                    &times;
                </button>
                <h2 className="text-2xl font-extrabold mb-1 tracking-tight">Staff Portal</h2>
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
                        />
                    </div>

                    {loginMessage && (
                        <p className={`text-sm font-bold ${loginMessage.includes('successful') ? 'text-emerald-600' : 'text-red-600'}`}>
                            {loginMessage}
                        </p>
                    )}

                    <button type="submit" className="w-full bg-slate-900 text-white font-bold rounded-lg py-3.5 mt-2 hover:bg-slate-800 transition-colors shadow-sm">
                        Sign In to Dashboard
                    </button>

                    <div className="mt-6 bg-slate-50 p-3 rounded-lg border border-dashed border-slate-200 text-xs text-slate-500 text-center">
                        <strong>Demo Credentials:</strong><br />
                        Username: <code className="bg-slate-200 px-1 rounded text-slate-700">admin</code> | Password: <code className="bg-slate-200 px-1 rounded text-slate-700">admin123</code>
                    </div>
                </form>
            </div>
        </div>
    );
}