import React from 'react';

export default function Features() {
    const items = [
        {
            title: 'Heavy Power Tools',
            desc: 'Rotary demolition hammers, SDS impact drills, and angle grinders calibrated for construction sites.',
            icon: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        },
        {
            title: 'Concrete & Masonry',
            desc: 'Electric concrete mixers, plate compactors, and poker vibrators for commercial and domestic casting.',
            icon: <><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>
        },
        {
            title: 'Fair Daily Rates',
            desc: 'Transparent per-day rates from Rs. 1,500 to Rs. 4,500 with zero hidden deposits or unexpected fees.',
            icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        }
    ];

    return (
        <section id="equipment" className="py-20 px-6 md:px-12 bg-white">
            <div className="text-center max-w-2xl mx-auto mb-14">
                <h2 className="text-3xl font-extrabold tracking-tight mb-3">Rental Categories</h2>
                <p className="text-slate-500">Reliable, maintained machinery available for short-term and daily hire for contractors and domestic tasks.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {items.map((feature, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm hover:shadow-md transition duration-200 hover:-translate-y-1">
                        <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-slate-700 mb-6">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{feature.icon}</svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                        <p className="text-slate-500 leading-relaxed text-sm">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}