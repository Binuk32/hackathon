import React from 'react';

export default function ProblemContext() {
    return (
        <section id="problem-context" className="py-20 px-6 md:px-12 bg-slate-50 border-t border-slate-200">
            <div className="text-center max-w-2xl mx-auto mb-14">
                <h2 className="text-3xl font-extrabold tracking-tight mb-3">The Challenge We Are Solving</h2>
                <p className="text-slate-500">Addressing real operational bottlenecks faced by local hardware rental shops across Sri Lanka.</p>
            </div>

            <div className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 md:p-12 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                    <h3 className="text-xl font-bold mb-4">The Sri Lankan Local Problem</h3>
                    <p className="text-slate-500 leading-relaxed mb-4 text-sm">
                        Neighborhood hardware stores and equipment hire businesses in Sri Lanka rely almost entirely on handwritten CR paper ledgers to log rented tools.
                    </p>
                    <p className="text-slate-500 leading-relaxed text-sm">
                        During peak construction windows, paper logs result in lost equipment, inaccurate return date reminders, disputes over calculated charges, and lost revenue for micro-business owners.
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">The LankaRent Solution</h3>
                    <p className="text-slate-500 leading-relaxed mb-4 text-sm">
                        A streamlined, lightweight MERN inventory platform built for the shop owner. It tracks live tool availability, validates customer phone numbers, and automatically computes rental duration and cost.
                    </p>
                    <p className="text-slate-500 leading-relaxed text-sm">
                        Eliminates notebook confusion, protects inventory assets, and digitizes small business workflows in under four hours of setup.
                    </p>
                </div>
            </div>
        </section>
    );
}