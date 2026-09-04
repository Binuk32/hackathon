import React, { useState } from 'react';

export default function ToolCard({ tool }) {
    const [imgError, setImgError] = useState(false);

    const { name, description, image, totalQuantity, availableQuantity } = tool;

    // Status logic per specification:
    // availableQuantity === 0 -> Unavailable
    // availableQuantity > 0 && availableQuantity <= 3 -> Low Stock
    // availableQuantity > 3 -> Available
    let statusLabel = 'Available';
    let badgeClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    let dotColor = 'bg-emerald-500';

    if (availableQuantity === 0) {
        statusLabel = 'Unavailable';
        badgeClasses = 'bg-rose-50 text-rose-700 border-rose-200';
        dotColor = 'bg-rose-500';
    } else if (availableQuantity <= 3) {
        statusLabel = 'Low Stock';
        badgeClasses = 'bg-amber-50 text-amber-700 border-amber-200';
        dotColor = 'bg-amber-500';
    }

    const percentage = totalQuantity > 0 ? Math.round((availableQuantity / totalQuantity) * 100) : 0;

    return (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group">
            {/* Image Container */}
            <div className="relative h-48 bg-slate-100 flex items-center justify-center overflow-hidden border-b border-slate-100">
                {image && !imgError ? (
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400 p-4">
                        <svg className="w-12 h-12 mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                        </svg>
                        <span className="text-xs font-medium text-slate-400">No Image Preview</span>
                    </div>
                )}

                {/* Status Badge Over Image */}
                <div className="absolute top-3 right-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-xs ${badgeClasses}`}>
                        <span className={`w-2 h-2 rounded-full ${dotColor} ${statusLabel === 'Available' ? 'animate-pulse' : ''}`}></span>
                        {statusLabel}
                    </span>
                </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-1 group-hover:text-sky-600 transition-colors">
                        {name}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-4">
                        {description || 'No detailed description provided.'}
                    </p>
                </div>

                {/* Quantity & Progress */}
                <div className="pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-semibold text-slate-500">Availability:</span>
                        <span className="font-extrabold text-slate-900 text-sm">
                            {availableQuantity} <span className="text-slate-400 font-normal text-xs">/ {totalQuantity}</span>
                        </span>
                    </div>

                    {/* Visual Progress Bar */}
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-500 ${
                                availableQuantity === 0
                                    ? 'bg-rose-500'
                                    : availableQuantity <= 3
                                        ? 'bg-amber-500'
                                        : 'bg-emerald-500'
                            }`}
                            style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
