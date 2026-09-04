import React, { useState, useEffect } from 'react';

const SLIDES = [
    {
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80',
        title: 'Professional Construction & Power Tool Rentals',
        subtitle: 'From heavy-duty rotary drills to concrete vibrators, rent certified tools without the massive upfront capital investment.',
    },
    {
        image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=80',
        title: 'Precision Tools for Local Builders & Craftsmen',
        subtitle: 'Digitally managed equipment logs ensuring zero delays and verified per-day rental rates across Western Province.',
    },
    {
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80',
        title: 'Transparent Pricing & Instant Verification',
        subtitle: 'Eliminating paper notebook errors with real-time equipment tracking for Sri Lankan micro-enterprises.',
    },
];

export default function HeroSlider({ onOpenLogin }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const handleNextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    const handlePrevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

    return (
        <section className="relative w-full h-[440px] md:h-[520px] bg-black overflow-hidden group">
            {SLIDES.map((slide, idx) => (
                <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-cover bg-center ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    style={{ backgroundImage: `url(${slide.image})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 to-slate-900/80 flex items-center justify-center text-center p-6">
                        <div className="max-w-3xl text-white">
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">{slide.title}</h1>
                            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">{slide.subtitle}</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href="#equipment" className="bg-white text-slate-900 px-8 py-3.5 rounded-lg font-bold hover:bg-slate-50 transition-colors">
                                    Browse Equipment
                                </a>
                                <button
                                    onClick={onOpenLogin}
                                    className="bg-transparent border border-white/60 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                                >
                                    Owner Portal
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <button onClick={handlePrevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-full transition-colors opacity-0 group-hover:opacity-100 hidden md:block">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button onClick={handleNextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-full transition-colors opacity-0 group-hover:opacity-100 hidden md:block">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {SLIDES.map((_, dotIdx) => (
                    <button
                        key={dotIdx}
                        onClick={() => setCurrentSlide(dotIdx)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${dotIdx === currentSlide ? 'w-8 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/70'}`}
                    />
                ))}
            </div>
        </section>
    );
}