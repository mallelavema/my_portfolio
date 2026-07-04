import { useState } from 'react';
import Scene3D from './components/Scene3D';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';
import PrintCV from './components/PrintCV';

export default function App() {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isPrintCVOpen, setIsPrintCVOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#0A0A0B] text-[#F5F5F7] font-sans selection:bg-cyan-500/30 selection:text-white overflow-x-hidden scroll-smooth">
      
      {/* Fixed Background 3D Canvas Scene */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <Scene3D />
      </div>

      {/* Floating Interactive Canvas Controls (Decorative telemetry indicator) */}
      <div className="fixed bottom-4 left-6 z-40 hidden lg:flex items-center gap-2 font-mono text-[9px] text-[#444449] select-none tracking-widest uppercase">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500/40 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
        </span>
        <span>Canvas 3D Core Active [60 FPS]</span>
      </div>

      {/* Front Content Layer */}
      <div className="relative z-10 w-full flex flex-col">
        {/* Sticky Header Navbar */}
        <Navbar 
          onOpenAIChat={() => setIsAIChatOpen(true)} 
          onOpenPrintCV={() => setIsPrintCVOpen(true)} 
        />

        {/* Hero Landing Page Section */}
        <Hero onOpenAIChat={() => setIsAIChatOpen(true)} />

        {/* About Section & Counter Statistics */}
        <About />

        {/* Tech Skill Categories and Tools Marquee */}
        <Skills />

        {/* Selected Projects and Interactive Case Study Modals */}
        <Projects />

        {/* Chronology Timeline: Professional & Education History */}
        <Timeline />

        {/* Recommendation Testimonials slide carousel */}
        <Testimonials />

        {/* Contact Form with local logs submission tracker */}
        <Contact />

        {/* Minimal Site Footer */}
        <Footer />
      </div>

      {/* Slide-out AI Assistant Chatbot Panel */}
      <AIChatbot 
        isOpen={isAIChatOpen} 
        onClose={() => setIsAIChatOpen(false)} 
      />

      {/* Printable Interactive CV Document Modal */}
      <PrintCV 
        isOpen={isPrintCVOpen} 
        onClose={() => setIsPrintCVOpen(false)} 
      />
    </div>
  );
}
