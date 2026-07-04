import { Award, Briefcase, GraduationCap, MapPin, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { personalInfo } from '../data';

export default function About() {
  return (
    <section id="about" className="relative py-24 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[1px] w-8 bg-cyan-400"></span>
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">About the Expert</span>
          </div>
          <h2 className="font-sans font-black tracking-tight text-white text-3xl sm:text-4xl">
            Synthesizing Data into Actionable Intelligence
          </h2>
        </div>

        {/* Bento-style Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Bio Card */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md flex flex-col justify-between hover:border-white/[0.12] transition-colors duration-300">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="font-sans font-bold text-lg text-white">Professional Trajectory</h3>
              </div>
              <p className="font-sans text-[#9A9AA5] text-base leading-relaxed mb-6">
                I am a results-driven <strong className="text-white">Data Analyst and Data Scientist</strong> based in India, specializing in machine learning, statistical modeling, and full-scale business intelligence delivery. 
              </p>
              <p className="font-sans text-[#9A9AA5] text-base leading-relaxed mb-6">
                My technical core bridges exploratory analytics, predictive pipeline modeling, and cutting-edge <strong className="text-indigo-300 font-medium">Generative AI (LLMs, RAG frameworks, and LangChain agents)</strong>. I thrive on translating abstract multi-dimensional data into intuitive, fast, and automated dashboard interfaces.
              </p>
              <p className="font-sans text-[#9A9AA5] text-base leading-relaxed">
                By automating repetitive data structures and designing highly customized BI systems in Power BI and Tableau, I enable business teams to extract answers and isolate performance bottlenecks at a glance.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.05] grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-mono text-[#9A9AA5]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Based in Bengaluru, Karnataka, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Available for Full-time Roles & Projects</span>
              </div>
            </div>
          </div>

          {/* Interactive Profile Visualization Block */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-gradient-to-b from-[#131317] to-[#0A0A0B] border border-white/[0.06] backdrop-blur-md flex flex-col justify-between hover:border-indigo-500/20 transition-colors duration-300 relative overflow-hidden group">
            {/* Ambient visual overlay representing cybernetic node matrix */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(108,92,231,0.06),transparent_60%)] pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-sans font-bold text-lg text-white">Focus Metrics</h3>
              </div>

              {/* Graphical representation of credentials */}
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-sans font-semibold text-sm text-white leading-none">B.Tech in CSE</h4>
                    <span className="font-mono text-[10px] text-[#9A9AA5] mt-1.5 block">Computer Science Engineering</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-3">
                  <Award className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-sans font-semibold text-sm text-white leading-none">Advanced DS & AI</h4>
                    <span className="font-mono text-[10px] text-[#9A9AA5] mt-1.5 block">IIT Guwahati Certification</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Resume Callout Info */}
            <div className="p-4 rounded-xl bg-[#6C5CE7]/10 border border-[#6C5CE7]/20 relative z-10">
              <span className="font-mono text-[10px] text-[#8B5CF6] uppercase tracking-wider font-bold">Primary Core</span>
              <div className="font-sans font-bold text-white text-base mt-1">End-to-End Analytics</div>
              <p className="font-sans text-[#9A9AA5] text-xs mt-1.5 leading-relaxed">
                Specialized in data preparation, statistical forecasting, database pipelining, and GenAI integrations.
              </p>
            </div>
          </div>
        </div>

        {/* Big impact numeric stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {personalInfo.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-cyan-500/15 hover:bg-white/[0.03] transition-all duration-300 flex flex-col justify-between"
              id={`stat-card-${idx}`}
            >
              <span className="font-sans text-xs text-[#9A9AA5] tracking-wide leading-relaxed">
                {stat.label}
              </span>
              <span className="font-sans font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300 mt-4 block">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
