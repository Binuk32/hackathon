import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSlider from '../components/HeroSlider';
import Features from '../components/Features.jsx';
import ProblemContext from '../components/ProblemContext';
import Footer from '../components/Footer';
import LoginModal from '../components/LoginModal';

export default function LandingPage() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    return (
        <>
            <Navbar onOpenLogin={() => setIsLoginOpen(true)} />
            <main className="flex-1">
                <HeroSlider onOpenLogin={() => setIsLoginOpen(true)} />
                <Features />
                <ProblemContext />
            </main>
            <Footer />
            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </>
    );
}