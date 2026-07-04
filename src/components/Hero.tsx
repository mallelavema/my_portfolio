import React from 'react';
import { ArrowRight, ChevronDown, Cpu, Database, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { personalInfo } from '../data';

interface HeroProps {
  onOpenAIChat: () => void;
}

export default function Hero({ onOpenAIChat }: HeroProps) {
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
          {/* Futuristic Micro-badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="font-mono text-xs text-[#9A9AA5] tracking-wide">
              Actively engineering AI Pipelines
            </span>
          </motion.div>

          {/* Large display typography name */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans font-black tracking-tight text-white text-5xl sm:text-6xl xl:text-7xl leading-[1.05] mb-4"
          >
            Hi, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 drop-shadow-sm">
              {personalInfo.name}
            </span>
          </motion.h1>

          {/* Animated subtitle/role carousel */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="font-mono text-lg md:text-xl text-cyan-300 font-medium tracking-wide mb-6"
          >
            {personalInfo.role}
          </motion.p>

          {/* Elevator Pitch Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="font-sans text-[#9A9AA5] text-base md:text-lg leading-relaxed max-w-xl mb-10"
          >
            {personalInfo.tagline}
          </motion.p>

          {/* Interactive Action Triggers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a
              href="#projects"
              onClick={scrollToProjects}
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-medium text-sm shadow-lg shadow-indigo-600/20 hover:shadow-cyan-500/20 hover:scale-[1.02] transition-all duration-300"
              id="hero-cta-projects"
            >
              <span>Explore My Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              onClick={onOpenAIChat}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white hover:bg-white/[0.08] hover:border-white/[0.15] font-medium text-sm backdrop-blur-md hover:scale-[1.02] transition-all duration-300"
              id="hero-cta-ai"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Ask AI Resume Assistant</span>
            </button>
          </motion.div>

          {/* Dynamic Resume-themed micro statistics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.75 }}
            className="mt-14 pt-8 border-t border-white/[0.05] grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-2xl"
          >
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-indigo-400 shrink-0" />
              <div>
                <div className="font-sans text-xs text-[#9A9AA5] uppercase tracking-wider font-semibold">Databases</div>
                <div className="font-mono text-sm text-white font-medium mt-0.5">MySQL / SQL Server</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Cpu className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <div className="font-sans text-xs text-[#9A9AA5] uppercase tracking-wider font-semibold">GenAI</div>
                <div className="font-mono text-sm text-white font-medium mt-0.5">RAG & AI Agents</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Abstract 3D Central Glass Visual & Floating HUD Stats (Frosted Glass Theme) */}
        <div className="lg:col-span-5 hidden lg:flex items-center justify-center h-[500px] relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative w-[380px] h-[380px]"
          >
            {/* Outer Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#6C5CE7] to-[#00E5FF] rounded-full blur-[40px] opacity-25"></div>
            
            {/* The "3D" Glass sphere shell (layers directly on top of the 3D Canvas element) */}
            <div className="absolute inset-2 rounded-full bg-white/[0.03] backdrop-blur-[45px] border border-white/20 shadow-2xl flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-[#6C5CE7]/15"></div>
              {/* Inner Pulsing Core */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.08, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 10,
                  ease: "linear"
                }}
                className="w-52 h-52 bg-gradient-to-tr from-[#6C5CE7]/30 to-[#00E5FF]/20 rounded-[40%] filter blur-xl"
              />
              <div className="absolute top-1/4 left-1/4 w-28 h-28 bg-white/5 rounded-full blur-md"></div>
            </div>
            
            {/* Floating HUD Stat 1: Forecast Accuracy */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-4 -right-6 p-4 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col gap-1 hover:bg-white/[0.08] transition-colors duration-300"
            >
              <span className="text-[9px] text-[#9A9AA5] uppercase font-bold tracking-widest">ML Accuracy</span>
              <span className="text-2xl font-black text-[#00E5FF] tracking-tight">~85%</span>
            </motion.div>

            {/* Floating HUD Stat 2: Revenue Audited */}
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4, delay: 2, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-6 p-4 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col gap-1 hover:bg-white/[0.08] transition-colors duration-300"
            >
              <span className="text-[9px] text-[#9A9AA5] uppercase font-bold tracking-widest">Revenue Audited</span>
              <span className="text-2xl font-black text-[#6C5CE7] tracking-tight">$2.30M</span>
            </motion.div>

            {/* Floating HUD Stat 3: Datasets */}
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

      {/* Floating Scroll down mouse simulator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
      >
        <span className="font-mono text-[10px] text-[#9A9AA5] tracking-widest uppercase">Scroll Space</span>
        <div className="w-5 h-8 rounded-full border-2 border-white/15 p-1 flex justify-center">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1 h-1.5 rounded-full bg-cyan-400"
          />
        </div>
        <ChevronDown className="w-4 h-4 text-cyan-400 animate-bounce mt-1" />
      </motion.div>
    </section>
  );
}
