import React from 'react';
import { ArrowRight, ChevronDown, Cpu, Database, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { personalInfo } from '../data';
import profilePhoto from '../assets/profile-photo.png';

interface HeroProps {
  onOpenPrintCV: () => void;
}

export default function Hero({ onOpenPrintCV }: HeroProps) {
  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector('#projects');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 md:py-0"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Main textual message */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Futuristic Micro-badge / Tagline above name */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="text-pink-400 font-mono text-[11px] sm:text-xs tracking-[0.3em] uppercase flex items-center gap-2 font-bold">
              ✦ ✦ ASPIRING DATA SCIENTIST
            </span>
          </motion.div>

          {/* Large display typography name */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans font-normal tracking-tight text-white text-3xl sm:text-4xl md:text-5xl leading-none mb-1 text-left"
          >
            Hello, I'm <br />
            <span className="font-serif italic font-medium text-7xl sm:text-8xl md:text-9xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-pink-300 drop-shadow-sm block mt-2 select-none">
              Vema
            </span>
          </motion.h1>

          {/* Elevator Pitch Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="font-sans text-[#9A9AA5] text-sm sm:text-base leading-relaxed max-w-xl mb-10 text-left mt-4"
          >
            Passionate about turning raw data into meaningful insights. Skilled in Python, SQL, and machine learning — eager to build <strong className="text-white font-semibold">real-world data solutions</strong> and grow as a data professional.
          </motion.p>

          {/* Interactive Action Triggers matching reference theme */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-row items-center gap-6 w-full"
          >
            <a
              href="#projects"
              onClick={scrollToProjects}
              className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-white/20 text-white font-mono text-xs tracking-widest uppercase hover:border-pink-400/50 hover:bg-white/[0.03] transition-all duration-300"
              id="hero-cta-projects"
            >
              <span>View My Projects</span>
            </a>

            <button
              onClick={onOpenPrintCV}
              className="group inline-flex items-center justify-center gap-1 px-4 py-3 text-[#9A9AA5] hover:text-pink-400 font-mono text-xs tracking-widest uppercase transition-colors duration-300"
              id="hero-cta-cv"
            >
              <span>My Resume</span>
            </button>
          </motion.div>

          {/* Dynamic Resume-themed micro statistics matching screenshot */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.75 }}
            className="mt-14 pt-8 border-t border-white/[0.05] flex flex-row flex-wrap gap-x-12 gap-y-6 w-full"
          >
            <div className="flex flex-col items-start gap-1">
              <span className="font-serif italic text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-pink-200 font-bold">5+</span>
              <span className="font-mono text-[9px] text-[#9A9AA5] tracking-widest uppercase">Projects Built</span>
            </div>
            
            <div className="flex flex-col items-start gap-1">
              <span className="font-serif italic text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-pink-200 font-bold">3</span>
              <span className="font-mono text-[9px] text-[#9A9AA5] tracking-widest uppercase">Certifications</span>
            </div>

            <div className="flex flex-col items-start gap-1">
              <span className="font-serif italic text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-pink-200 font-bold">8+</span>
              <span className="font-mono text-[9px] text-[#9A9AA5] tracking-widest uppercase">Tools & Skills</span>
            </div>
          </motion.div>
        </div>

        {/* Profile Photo Visual & Floating HUD Stats */}
        <div className="lg:col-span-5 flex items-center justify-center h-[500px] relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[380px] lg:h-[380px]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#8B5CF6] to-[#EC4899] rounded-full blur-[40px] opacity-25"></div>
            
            <div className="absolute inset-2 rounded-full bg-white/[0.03] backdrop-blur-[45px] border border-white/20 shadow-2xl flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-[#8B5CF6]/15"></div>
              <img
                src={profilePhoto}
                alt="Vema"
                className="w-full h-full object-cover"
              />
            </div>
            
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-4 -right-6 p-4 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col gap-1 hover:bg-white/[0.08] transition-colors duration-300"
            >
              <span className="text-[9px] text-[#9A9AA5] uppercase font-bold tracking-widest">ML Accuracy</span>
              <span className="text-2xl font-black text-pink-400 tracking-tight">~85%</span>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4, delay: 2, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-6 p-4 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col gap-1 hover:bg-white/[0.08] transition-colors duration-300"
            >
              <span className="text-[9px] text-[#9A9AA5] uppercase font-bold tracking-widest">Revenue Audited</span>
              <span className="text-2xl font-black text-purple-400 tracking-tight">$2.30M</span>
            </motion.div>

            <motion.div 
              animate={{ x: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute top-1/2 -translate-y-1/2 -left-12 p-3.5 rounded-xl bg-white/[0.03] backdrop-blur-lg border border-white/[0.08] shadow-xl flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-[#F5F5F7] font-mono">50K+ Rows Prepared</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Vertical SCROLL text indicator on bottom left */}
      <div className="absolute left-8 bottom-24 z-20 hidden md:flex flex-col items-center gap-4">
        <div className="rotate-90 origin-left flex items-center gap-4">
          <span className="h-[1px] w-12 bg-white/20"></span>
          <span className="text-[9px] uppercase tracking-[0.4em] font-medium text-[#9A9AA5] select-none">Scroll</span>
        </div>
      </div>

      {/* Floating Scroll down mouse simulator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
      >
        <span className="font-mono text-[9px] text-[#9A9AA5] tracking-widest uppercase">Scroll Space</span>
        <div className="w-5 h-8 rounded-full border-2 border-white/15 p-1 flex justify-center">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1 h-1.5 rounded-full bg-pink-400"
          />
        </div>
        <ChevronDown className="w-4 h-4 text-pink-400 animate-bounce mt-1" />
      </motion.div>
    </section>
  );
}
