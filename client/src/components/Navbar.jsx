import React from 'react';

export default function Navbar({ onOpenLogin }) {
    return (
        <>
            <aside className="bg-slate-50 border-b border-slate-200 py-3 px-6 flex items-center justify-center gap-3 text-sm text-slate-600 text-center flex-wrap">
        <span className="bg-sky-100 text-sky-700 font-bold text-xs px-2.5 py-1 rounded tracking-wide uppercase">
          Sri Lanka MSME Initiative
        </span>
                <span>
          Digitalizing manual paper credit & equipment books for local hardware and tool rental businesses.
        </span>
            </aside>

            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 py-4 md:px-12">
                <div className="flex items-center gap-3">
                    <div className="bg-slate-900 text-white p-2 rounded-lg flex items-center justify-center">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                        </svg>
                    </div>
                    <div>
                        <span className="block text-xl font-extrabold tracking-tight text-slate-900">Indunil Hardware</span>
                        <span className="block text-xs font-medium text-slate-500">Tools & Machinery Rentals • Sri Lanka</span>
                    </div>
                </div>

                <ul className="hidden md:flex items-center gap-8 font-medium text-slate-500">
                    <li><a href="#equipment" className="hover:text-slate-900 transition-colors">Equipment</a></li>
                    <li><a href="#problem-context" className="hover:text-slate-900 transition-colors">About The Project</a></li>
                    <li><a href="#how-it-works" className="hover:text-slate-900 transition-colors">How It Works</a></li>
                </ul>

                <button
                    onClick={onOpenLogin}
                    className="bg-slate-900 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-slate-800 transition-all shadow-sm hover:-translate-y-0.5"
                >
                    Staff Login
                </button>
            </header>
        </>
    );
}