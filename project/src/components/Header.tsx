import React, { useState, useEffect } from 'react';
import { Settings, Rocket } from 'lucide-react';
import Container from './layout/Container';
import BetaForm from './beta/BetaForm';
export const runtime = "edge";
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBetaForm, setShowBetaForm] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/40 backdrop-blur-sm border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <Container>
          <nav className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Settings className="w-6 h-6 text-orange-500 animate-spin-slow" />
              <a href="/" className="text-white text-xl font-semibold hover:text-orange-500 transition-colors">
                GigWey
              </a>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="hidden md:flex items-center gap-8">
                <a href="#features" className="text-sm text-white/90 hover:text-orange-500 transition-colors">
                  Features
                </a>
                <a href="#docs" className="text-sm text-white/90 hover:text-orange-500 transition-colors">
                  Docs
                </a>
                <a href="#api" className="text-sm text-white/90 hover:text-orange-500 transition-colors">
                  API
                </a>
              </div>
              
              <button 
                onClick={() => setShowBetaForm(true)}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 border border-white/10 relative group"
              >
                <span className="text-sm">Join Beta</span>
                <Rocket className="w-4 h-4 text-silver transition-transform duration-300" />
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {showBetaForm && <BetaForm onClose={() => setShowBetaForm(false)} />}

      <style jsx>{`
        @keyframes rocket-move {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(3rem);
          }
        }

        .animate-rocket-move {
          animation: rocket-move 0.8s ease-in-out forwards;
        }

        @keyframes rocket-launch {
          0% {
            transform: translateY(0) scale(1);
        }
        25% {
          transform: translateY(-0.5rem) scale(1.1);
        }
        50% {
          transform: translateY(-1rem) scale(1.2);
        }
        75% {
          transform: translateY(-1.5rem) scale(1.3);
        100% {
          transform: translateY(-2rem) scale(1.4);
        }
        }

        .animate-rocket-launch {
          animation: rocket-launch 0.8s ease-in-out forwards;
        }
      `}</style>
    </>
  );
}