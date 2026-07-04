import { Briefcase, Calendar, GraduationCap, Award, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { timelineData } from '../data';
import { TimelineItem } from '../types';

export default function Timeline() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'work':
        return <Briefcase className="w-4 h-4 text-cyan-400" />;
      case 'education':
        return <GraduationCap className="w-4 h-4 text-purple-400" />;
      default:
        return <Award className="w-4 h-4 text-indigo-400" />;
    }
  };

  const getBadgeStyle = (type: string) => {
    if (type === 'experience') {
      return 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20';
    }
    return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
  };

  return (
    <section id="timeline" className="relative py-24 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[1px] w-8 bg-cyan-400"></span>
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">Chronology</span>
          </div>
          <h2 className="font-sans font-black tracking-tight text-white text-3xl sm:text-4xl">
            Professional & Academic Path
          </h2>
          <p className="font-sans text-[#9A9AA5] text-sm md:text-base mt-2 max-w-xl">
            A comprehensive overview of my professional internships, academic achievements, and specialized training programs.
          </p>
        </div>

        {/* Timeline Path Structure */}
        <div className="relative border-l border-white/[0.06] ml-4 md:ml-8 pl-6 md:pl-10 space-y-12">
          {/* Timeline Vertical Track Accent Glow */}
          <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-cyan-400 via-indigo-500 to-transparent pointer-events-none" />

          {timelineData.map((item, idx) => (
            <div
              key={item.id}
              className="relative group text-left"
              id={`timeline-node-${item.id}`}
            >
              {/* Outer floating node bullet with responsive pulsing */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#0A0A0B] border border-white/[0.12] flex items-center justify-center group-hover:border-cyan-400 group-hover:shadow-lg group-hover:shadow-cyan-400/25 transition-all duration-300 z-10">
                {getIcon(item.iconName)}
              </div>

              {/* Glowing vertical node bridge */}
              <div className="absolute -left-[31px] md:-left-[47px] top-7 bottom-0 w-px bg-white/[0.08] group-hover:bg-cyan-400/30 transition-colors duration-300" />

              {/* Main Timeline Item Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] group-hover:border-white/[0.12] group-hover:bg-[#0F0F12]/40 backdrop-blur-md transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(ellipse_at_top_right,rgba(108,92,231,0.04),transparent_60%)] pointer-events-none" />

                {/* Card Meta details: Type, Date, Location */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`px-2.5 py-0.5 rounded-full font-mono text-[9px] uppercase font-bold tracking-wider ${getBadgeStyle(item.type)}`}>
                    {item.type === 'experience' ? 'Internship' : 'Education & Cert'}
                  </span>
                  
                  <div className="flex items-center gap-1 font-mono text-xs text-[#9A9AA5]">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>{item.date}</span>
                  </div>

                  <div className="flex items-center gap-1 font-mono text-xs text-[#9A9AA5]">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Title and Company */}
                <h3 className="font-sans font-black text-xl text-white group-hover:text-cyan-300 transition-colors duration-200">
                  {item.title}
                </h3>
                <span className="font-sans text-indigo-300 font-medium text-sm block mt-1.5">
                  {item.companyOrInstitution}
                </span>

                {/* Core Accomplishments/Courses Bullets */}
                {item.bullets && (
                  <ul className="mt-5 space-y-3 pl-1">
                    {item.bullets.map((bullet, bulletIdx) => (
                      <li
                        key={bulletIdx}
                        className="font-sans text-xs sm:text-sm text-[#9A9AA5] leading-relaxed flex items-start gap-2.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0 group-hover:scale-110 transition-transform" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
