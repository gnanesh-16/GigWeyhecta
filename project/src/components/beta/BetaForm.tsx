import React, { useState } from 'react';
import { Mail, X } from 'lucide-react';
import Confetti from 'react-confetti'; // Import react-confetti
export const runtime = "edge";

interface BetaFormProps {
  onClose: () => void;
}

export default function BetaForm({ onClose }: BetaFormProps) {
  const [email, setEmail] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [isSaved, setIsSaved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false); // Add state for confetti
  const [showPopup, setShowPopup] = useState(false); // Add state for popup

  const handleSave = () => {
    if (contact) {
      setIsSaved(true);
      // Additional save logic if needed
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ email, newsletter, fullName, contact, countryCode });
    setShowConfetti(true); // Show confetti on form submission
    setShowPopup(true); // Show popup on form submission
    setTimeout(() => {
      setShowConfetti(false); // Hide confetti after 5 seconds
      setShowPopup(false); // Hide popup after 5 seconds
      onClose();
    }, 5000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {showConfetti && <Confetti />} {/* Render confetti */}
      {showPopup && (
        <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white p-4 rounded-lg shadow-lg z-50 border border-gray-500 backdrop-blur-sm animate-popup">
          <p>You've successfully registered for the API beta with the email: <span className="bg-green-500 text-black px-2 py-1 rounded">{email}</span></p>
          <div className="absolute inset-0 border-2 border-transparent border-t-silver animate-border-spin"></div>
        </div>
      )}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-lg"
        onClick={onClose}
      />
      
      <div className="relative bg-zinc-900/90 rounded-2xl p-8 max-w-md w-full border border-white/50 z-40"> {/* Add z-40 to ensure the container is below the popup */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2">
            <div className="w-12 h-12 rounded-full bg-orange-500/20 animate-ping" />
            <div className="absolute inset-0 w-12 h-12 rounded-full bg-orange-500/40" />
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-2 mt-4">Join the private beta</h2>
        <p className="text-gray-400 mb-8">
          Get early access to our revolutionary web automation platform.
          Accepted members receive an API key via email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-white/90">Email address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 rounded-lg pl-10 pr-4 py-3 border border-white/10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-white/90">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-black/50 rounded-lg px-4 py-3 border border-white/10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              placeholder="Your Full Name"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-white/90">Contact</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white flex items-center gap-2">
                🇮🇳 +91
              </span>
              <input
                type="tel"
                value={contact}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value) && value.length <= 10) {
                    setContact(value);
                  }
                }}
                className="w-full pl-16 bg-black/50 rounded-lg pr-10 py-3 border border-white/10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                placeholder="1234567890"
                required
              />
              {isSaved ? (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                  <span className="text-green-500 animate-fade-in">Saved</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleSave}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-500 transition-colors"
                >
                  ✓
                </button>
              )}
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
              className="text-orange-500 border-white/10 rounded focus:ring-orange-500"
            />
            <span className="text-gray-400 group-hover:text-white transition-colors">
              Keep me updated about launches and events
            </span>
          </label>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-lg font-medium text-white transition-colors relative group"
          >
            <span className="relative z-10">Apply for Early Access</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
          </button>
        </form>
      </div>
    </div>
  );
}

// Add the following CSS to your styles
<style jsx>{`
  @keyframes popup {
    0% {
      transform: translateY(-20px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes border-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(720deg);
    }
  }

  .animate-popup {
    animation: popup 0.5s ease-out forwards;
  }

  .animate-border-spin {
    animation: border-spin 2s linear forwards;
  }
`}</style>