import React, { useState } from 'react';
import { ExternalLink, Layers, Sparkles, TrendingUp, ChevronRight, X, FileText, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { projectsData } from '../data';
import { Project } from '../types';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [tiltStyle, setTiltStyle] = useState<{ [key: string]: string }>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within element
    const y = e.clientY - rect.top;  // y position within element

    // Normalize coordinates around center: range [-10, 10] degrees rotation
    const rotateY = ((x / rect.width) - 0.5) * 12;
    const rotateX = -((y / rect.height) - 0.5) * 12;

    setTiltStyle({
      [cardId]: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    });
  };

  const handleMouseLeave = (cardId: string) => {
    setTiltStyle({
      [cardId]: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
    });
  };

  // Render highly-polished, thematic CSS/SVG widgets to serve as live project mockups
  const renderProjectWidget = (projectId: string) => {
    switch (projectId) {
      case 'netflix-intelligence':
        return (
          <div className="w-full h-44 bg-neutral-950/40 rounded-xl border border-white/[0.04] p-4 flex flex-col justify-between relative overflow-hidden font-mono text-[10px]">
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
            <div className="flex items-center justify-between relative z-10 border-b border-white/[0.05] pb-2">
              <span className="text-red-500 font-bold tracking-widest">NETFLIX_METRICS_v3</span>
              <span className="text-[#9A9AA5]">8,000 TITLES DETECTED</span>
            </div>
            
            {/* Content stats: Movie vs TV Shows */}
            <div className="grid grid-cols-2 gap-3 my-2 relative z-10">
              <div className="p-2 rounded bg-white/[0.02] border border-white/[0.05]">
                <div className="text-white font-bold text-xs">52.9%</div>
                <div className="text-[#9A9AA5] text-[8px] uppercase tracking-wider mt-0.5">Movies Indexed</div>
                <div className="w-full h-1 bg-red-600/30 rounded-full mt-1.5 overflow-hidden">
                  <div className="w-[53%] h-full bg-red-500" />
                </div>
              </div>
              <div className="p-2 rounded bg-white/[0.02] border border-white/[0.05]">
                <div className="text-white font-bold text-xs">47.1%</div>
                <div className="text-[#9A9AA5] text-[8px] uppercase tracking-wider mt-0.5">TV Series Indexed</div>
                <div className="w-full h-1 bg-cyan-600/30 rounded-full mt-1.5 overflow-hidden">
                  <div className="w-[47%] h-full bg-cyan-400" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[9px] text-[#9A9AA5] relative z-10">
              <TrendingUp className="w-3.5 h-3.5 text-red-500" />
              <span>COHORT ANALYSIS: Growth curves peaking (2008-2021)</span>
            </div>
          </div>
        );

      case 'amazon-sales':
        return (
          <div className="w-full h-44 bg-neutral-950/40 rounded-xl border border-white/[0.04] p-4 flex flex-col justify-between relative overflow-hidden font-mono text-[10px]">
            <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#808080_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="flex items-center justify-between relative z-10 border-b border-white/[0.05] pb-2">
              <span className="text-amber-500 font-bold tracking-widest">AMAZON_KPI_KPI</span>
              <span className="text-emerald-400 font-bold">● AUTOMATED REFRESH</span>
            </div>
            
            {/* KPI grid */}
            <div className="grid grid-cols-3 gap-2 my-2 relative z-10">
              <div className="p-1.5 rounded bg-white/[0.02] border border-white/[0.05] text-center">
                <span className="text-[8px] text-[#9A9AA5] block">SALES</span>
                <span className="text-white font-bold text-[11px]">$2.30M</span>
              </div>
              <div className="p-1.5 rounded bg-white/[0.02] border border-white/[0.05] text-center">
                <span className="text-[8px] text-[#9A9AA5] block">PROFIT</span>
                <span className="text-emerald-400 font-bold text-[11px]">$286K</span>
              </div>
              <div className="p-1.5 rounded bg-white/[0.02] border border-white/[0.05] text-center">
                <span className="text-[8px] text-[#9A9AA5] block">SHIPPED</span>
                <span className="text-amber-400 font-bold text-[11px]">87.0K</span>
              </div>
            </div>

            <div className="text-[8px] text-[#9A9AA5] flex justify-between items-center relative z-10">
              <span>REFRESH OVERHEAD: 3h → 15min</span>
              <span className="text-amber-400">DAX ACTIVE</span>
            </div>
          </div>
        );

      case 'healthcare-prediction':
        return (
          <div className="w-full h-44 bg-neutral-950/40 rounded-xl border border-white/[0.04] p-4 flex flex-col justify-between relative overflow-hidden font-mono text-[10px]">
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/[0.01] to-transparent pointer-events-none" />
            <div className="flex items-center justify-between relative z-10 border-b border-white/[0.05] pb-2">
              <span className="text-emerald-500 font-bold tracking-widest">CLINICAL_MODEL_R2</span>
              <span className="text-emerald-400 font-bold">1,200 PATIENTS</span>
            </div>

            {/* Simulated diagnostic chart */}
            <div className="flex-1 flex items-end gap-[3px] h-14 my-2 relative z-10">
              {[40, 65, 80, 55, 90, 75, 45, 60, 85, 95, 70, 50, 35, 60, 80].map((h, i) => (
                <div key={i} className="flex-1 bg-white/[0.03] hover:bg-emerald-500/20 rounded-t-sm h-full flex flex-col justify-end">
                  <div className="w-full bg-emerald-500/40 rounded-t-sm" style={{ height: `${h}%` }} />
                </div>
              ))}
            </div>

            <div className="flex justify-between text-[8px] text-[#9A9AA5] relative z-10">
              <span>Risk Factors: Age, Cholesterol, BMI</span>
              <span className="text-[#9A9AA5]">MySQL / SciKit</span>
            </div>
          </div>
        );

      default:
        // Generative AI vector search representation
        return (
          <div className="w-full h-44 bg-neutral-950/40 rounded-xl border border-white/[0.04] p-4 flex flex-col justify-between relative overflow-hidden font-mono text-[10px]">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] to-transparent pointer-events-none" />
            <div className="flex items-center justify-between relative z-10 border-b border-white/[0.05] pb-2">
              <span className="text-indigo-400 font-bold tracking-widest">RAG_LANGCHAIN_CORE</span>
              <span className="text-purple-400 font-bold">VECTOR_INDEX</span>
            </div>

            {/* Neural index mapping visualization */}
            <div className="relative flex-1 flex items-center justify-center my-1">
              <div className="w-16 h-16 rounded-full border border-indigo-500/20 flex items-center justify-center relative animate-pulse">
                <div className="w-10 h-10 rounded-full border border-purple-500/30 flex items-center justify-center">
                  <Sparkles className="w-4.5 h-4.5 text-indigo-400" />
                </div>
                {/* Orbital nodes */}
                <span className="absolute top-0 left-1 w-2 h-2 rounded-full bg-indigo-400" />
                <span className="absolute bottom-1 right-2 w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span className="absolute left-0 bottom-4 w-1 h-1 rounded-full bg-purple-400" />
              </div>
            </div>

            <div className="flex justify-between text-[8px] text-[#9A9AA5] relative z-10">
              <span>Vector Search: ChromaDB</span>
              <span className="text-[#9A9AA5]">LangChain Pipelines</span>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="projects" className="relative py-24 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[1px] w-8 bg-cyan-400"></span>
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">Selected Works</span>
          </div>
          <h2 className="font-sans font-black tracking-tight text-white text-3xl sm:text-4xl">
            High-Impact Analytics & AI Pipelines
          </h2>
          <p className="font-sans text-[#9A9AA5] text-sm md:text-base mt-2 max-w-xl">
            A showcase of production-ready analytical pipelines, machine learning structures, and interactive corporate dashboard modules.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-2xl bg-white/[0.02] border border-white/[0.05] p-5 sm:p-6 backdrop-blur-md flex flex-col justify-between hover:border-white/[0.12] hover:bg-[#0F0F12]/60 cursor-pointer transition-all duration-300 overflow-hidden"
              style={{ transform: tiltStyle[project.id] || 'none' }}
              onMouseMove={(e) => handleMouseMove(e, project.id)}
              onMouseLeave={() => handleMouseLeave(project.id)}
              onMouseEnter={() => setHoveredCardId(project.id)}
              onClick={() => setSelectedProject(project)}
              id={`project-card-${project.id}`}
            >
              {/* Dynamic Gradient glow border based on project's theme */}
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent-glow),transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  '--accent-glow': `${project.accentColor}0e`
                } as React.CSSProperties}
              />

              <div>
                {/* Simulated live visual dashboard/analytics mockup */}
                <div className="mb-5">
                  {renderProjectWidget(project.id)}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tools.slice(0, 3).map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] font-mono text-[9px] text-[#9A9AA5]"
                    >
                      {tool}
                    </span>
                  ))}
                  {project.tools.length > 3 && (
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 font-mono text-[9px] text-indigo-300">
                      +{project.tools.length - 3} more
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-sans font-black text-xl text-white group-hover:text-cyan-400 transition-colors duration-200">
                  {project.title}
                </h3>

                {/* Muted Description */}
                <p className="font-sans text-[#9A9AA5] text-sm mt-2 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Card Footer with stats highlights */}
              <div className="mt-6 pt-5 border-t border-white/[0.04] flex items-center justify-between">
                {project.metrics && project.metrics[0] ? (
                  <div className="text-left">
                    <span className="font-mono text-[9px] text-[#9A9AA5] uppercase block tracking-wider">
                      {project.metrics[0].label}
                    </span>
                    <span className="font-sans font-bold text-base text-white mt-0.5 block">
                      {project.metrics[0].value}
                    </span>
                  </div>
                ) : (
                  <div className="text-left">
                    <span className="font-mono text-[9px] text-[#9A9AA5] uppercase block tracking-wider">
                      Deployment Scope
                    </span>
                    <span className="font-sans font-bold text-base text-white mt-0.5 block">
                      Core Pipeline
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-1 font-sans text-xs text-cyan-400 font-semibold group-hover:underline">
                  <span>Explore Case Study</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Details Drawer (Modal representation) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop blur layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-[#0A0A0B]/85 backdrop-blur-md"
            />

            {/* Main Modal Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl bg-[#0F0F12] border border-white/[0.08] rounded-2xl shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[85vh] z-10"
              id="case-study-modal"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] text-[#9A9AA5] hover:text-white transition-colors"
                aria-label="Close modal"
                id="btn-close-modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Category Badge */}
              <span
                className="inline-block px-3 py-1 rounded-full font-mono text-[10px] uppercase font-bold tracking-wider mb-4"
                style={{
                  backgroundColor: `${selectedProject.accentColor}15`,
                  color: selectedProject.accentColor,
                  border: `1px solid ${selectedProject.accentColor}30`
                }}
              >
                {selectedProject.category}
              </span>

              {/* Title */}
              <h3 className="font-sans font-black text-2xl sm:text-3xl text-white mb-2 leading-tight">
                {selectedProject.title}
              </h3>
              <div className="font-mono text-xs text-cyan-400 font-semibold mb-6">{selectedProject.date}</div>

              {/* Performance Metrics Block */}
              {selectedProject.metrics && (
                <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#0A0A0B] border border-white/[0.05] mb-6">
                  {selectedProject.metrics.map((metric, index) => (
                    <div key={index} className="text-center">
                      <span className="font-sans text-[10px] text-[#9A9AA5] block leading-none">{metric.label}</span>
                      <span
                        className="font-sans font-black text-lg mt-1.5 block"
                        style={{ color: selectedProject.accentColor }}
                      >
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Technology Stack Grid */}
              <div className="mb-6">
                <span className="font-mono text-[10px] text-[#9A9AA5] uppercase tracking-widest block mb-2.5">
                  Methodology & Stack:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[#9A9AA5] font-mono text-xs"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Core Accomplishments & Bullets */}
              <div className="border-t border-white/[0.05] pt-6 mb-8">
                <span className="font-mono text-[10px] text-[#9A9AA5] uppercase tracking-widest block mb-4">
                  Core Accomplishments:
                </span>
                <ul className="space-y-4">
                  {selectedProject.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-[#9A9AA5] leading-relaxed">
                      <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: selectedProject.accentColor }} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call-to-Action Footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.05]">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-xl border border-white/[0.08] hover:bg-white/[0.04] text-[#9A9AA5] hover:text-white font-medium text-xs transition-colors"
                >
                  Close View
                </button>
                <a
                  href={`mailto:mallelavema8501@gmail.com?subject=Inquiry regarding: ${selectedProject.title}`}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-medium text-xs hover:from-indigo-500 hover:to-cyan-400 shadow-md shadow-indigo-600/10 hover:shadow-cyan-500/20 transition-all duration-200"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Request Full Case Study PDF</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
