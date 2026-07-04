import React from 'react';
import { Terminal } from 'lucide-react';
import { personalInfo } from '../data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="relative bg-[#070708] border-t border-white/[0.04] py-12">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Brand logo repetition */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500 to-pink-500 p-[1px] flex items-center justify-center">
            <div className="w-full h-full bg-black rounded-[5px] flex items-center justify-center">
              <Terminal className="w-3 h-3 text-pink-400" />
            </div>
          </div>
          <span className="font-sans font-bold text-sm text-white tracking-tight">
            {personalInfo.name}
          </span>
        </div>

        {/* Footer Nav Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-[#9A9AA5] font-mono">
          <a href="#about" onClick={(e) => handleLinkClick(e, '#about')} className="hover:text-pink-400 transition-colors">About</a>
          <a href="#skills" onClick={(e) => handleLinkClick(e, '#skills')} className="hover:text-pink-400 transition-colors">Skills</a>
          <a href="#projects" onClick={(e) => handleLinkClick(e, '#projects')} className="hover:text-pink-400 transition-colors">Work</a>
          <a href="#timeline" onClick={(e) => handleLinkClick(e, '#timeline')} className="hover:text-pink-400 transition-colors">Timeline</a>
          <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="hover:text-pink-400 transition-colors">Contact</a>
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right">
          <span className="font-mono text-[10px] text-[#55555C] tracking-wide block">
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </span>
          <span className="font-mono text-[9px] text-[#444449] tracking-widest block mt-0.5 uppercase">
            Built with React & Canvas 3D
          </span>
        </div>
      </div>
    </footer>
  );
}
