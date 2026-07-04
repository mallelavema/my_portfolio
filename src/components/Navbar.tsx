import React, { useEffect, useState } from 'react';
import { Menu, X, FileDown, Terminal, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { personalInfo } from '../data';

interface NavbarProps {
  onOpenAIChat: () => void;
  onOpenPrintCV: () => void;
}

export default function Navbar({ onOpenAIChat, onOpenPrintCV }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Work', href: '#projects' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0A0A0B]/85 backdrop-blur-md border-b border-white/[0.06] py-3 shadow-lg shadow-black/10'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a
            href="#top"
            onClick={(e) => handleLinkClick(e, '#top')}
            className="flex items-center gap-2 group cursor-pointer"
            id="nav-logo"
          >
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 p-[1px] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-black rounded-[7px] group-hover:bg-transparent transition-colors duration-300" />
              <Terminal className="w-4 h-4 text-cyan-400 group-hover:text-black transition-colors duration-300 relative z-10" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-300 text-base leading-none">
                {personalInfo.name}
              </span>
              <span className="font-mono text-[9px] text-[#9A9AA5] tracking-widest mt-0.5 uppercase">
                Data & AI/ML
              </span>
            </div>
          </a>

          {/* Desktop Navigation links */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="relative text-sm text-[#9A9AA5] hover:text-white transition-colors duration-300 font-medium py-1 group"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-300 rounded" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="h-4 w-[1px] bg-white/10" />

            {/* Resume and AI Agent buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenAIChat}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 hover:text-indigo-200 border border-indigo-500/30 text-xs font-mono transition-all duration-300"
                id="btn-ai-chat"
              >
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>AI Assistant</span>
              </button>
              
              <button
                onClick={onOpenPrintCV}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-medium text-xs hover:from-indigo-500 hover:to-cyan-400 shadow-md shadow-indigo-600/15 hover:shadow-cyan-500/20 hover:scale-[1.03] transition-all duration-200"
                id="btn-download-resume"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Resume CV</span>
              </button>
            </div>
          </nav>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenAIChat}
              className="p-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 hover:text-indigo-200 transition-colors"
              title="AI Assistant"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#9A9AA5] hover:text-white transition-colors"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[57px] z-40 md:hidden bg-[#0A0A0B]/95 backdrop-blur-lg border-b border-white/[0.08] shadow-2xl p-5"
          >
            <nav className="flex flex-col gap-4">
              <ul className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="block py-2 text-base text-[#9A9AA5] hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="h-[1px] bg-white/5 my-1" />
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAIChat();
                  }}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-mono text-xs transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Resume Bot</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPrintCV();
                  }}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-medium text-xs transition-colors"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Get Resume</span>
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
