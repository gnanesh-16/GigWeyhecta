import React, { useState, useEffect } from 'react';
import { Settings, ChevronRight } from 'lucide-react';
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
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 border border-white/10"
              >
                <span className="text-sm">Join Beta</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {showBetaForm && <BetaForm onClose={() => setShowBetaForm(false)} />}
    </>
  );
}