import React from 'react';
import { Github, Linkedin } from 'lucide-react'; // Import Linkedin instead of Twitter
export const runtime = "edge";

export default function Footer() {
  return (
    <footer className="bg-black py-8 px-6 border-t border-zinc-800/50 animate-fade-in">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-400 mb-4 md:mb-0">
          © {new Date().getFullYear()} <a href="/" className="text-white hover:text-orange-500 transition-colors">GigWey</a>. All rights reserved.
        </div>

        <div className="flex items-center space-x-8">
          <a href="#docs" className="text-gray-400 hover:text-white transition-colors">Docs</a>
          <a href="#api" className="text-gray-400 hover:text-white transition-colors">API</a>
          <a href="#privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</a>

          <div className="flex items-center space-x-4">
            {/* GitHub Icon with Micro Animation */}
            <a
              href="https://github.com/gnanesh-16/Gigwey-"
              className="text-gray-400 hover:text-white transition-colors transform active:translate-y-[-2px] active:text-green-500 active:border-black border border-transparent rounded-full p-2 transition-transform duration-200"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>

            {/* LinkedIn Icon with Micro Animation */}
            <a
              href="https://www.linkedin.com/in/gnaneshbalusa/"  // Updated LinkedIn URL
              className="text-gray-400 hover:text-white transition-colors transform active:translate-y-[-2px] active:text-blue-500 active:border-black border border-transparent rounded-full p-2 transition-transform duration-200"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}