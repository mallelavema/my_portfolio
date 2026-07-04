import { Printer, X, Copy, CheckCircle, FileText } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { personalInfo, skillsData, projectsData, timelineData } from '../data';

interface PrintCVProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrintCV({ isOpen, onClose }: PrintCVProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyCVText = () => {
    const skillsText = skillsData.map(c => `${c.title}:\n${c.skills.map(s => `  - ${s.name}`).join('\n')}`).join('\n\n');
    const projectsText = projectsData.map(p => `${p.title} (${p.date}):\n${p.bullets.map(b => `  - ${b}`).join('\n')}`).join('\n\n');
    const experienceText = timelineData.map(t => `${t.title} @ ${t.companyOrInstitution} (${t.date}):\n${t.bullets?.map(b => `  - ${b}`).join('\n') || ''}`).join('\n\n');

    const cvText = `
VEMA MALLELA
${personalInfo.role}
Email: ${personalInfo.email} | Phone: ${personalInfo.phone}
GitHub: ${personalInfo.github} | LinkedIn: ${personalInfo.linkedin}

PROFESSIONAL SUMMARY
${personalInfo.bio}

CORE TECHNICAL SKILLS
${skillsText}

WORK EXPERIENCE
${experienceText}

SELECTED PROJECTS
${projectsText}
    `.trim();

    navigator.clipboard.writeText(cvText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-xs cursor-pointer" />

      {/* Main container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-4xl bg-white text-neutral-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10"
        id="cv-modal-container"
      >
        {/* Top Control Bar (Hidden on print) */}
        <div className="p-4 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between text-white shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span className="font-sans font-bold text-sm">Printable Interactive CV</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCVText}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-mono transition-colors"
              title="Copy Resume Plain Text"
              id="btn-copy-cv-text"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 font-bold text-xs shadow-md"
              id="btn-print-cv"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors ml-2"
              aria-label="Close CV viewer"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* CV Scroll Body */}
        <div className="flex-1 overflow-y-auto p-8 sm:p-12 print:p-0 print:overflow-visible" id="cv-printable-body">
          <style>{`
            @media print {
              body * {
                visibility: hidden;
              }
              #cv-printable-body, #cv-printable-body * {
                visibility: visible;
              }
              #cv-printable-body {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                color: #000 !important;
                background: #fff !important;
              }
              #cv-modal-container {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                height: auto !important;
                max-height: none !important;
                box-shadow: none !important;
                border: none !important;
                overflow: visible !important;
              }
            }
          `}</style>

          {/* CV Header */}
          <div className="text-center border-b-2 border-neutral-800 pb-5">
            <h1 className="font-sans font-black text-3xl tracking-tight text-neutral-900 uppercase">
              {personalInfo.name}
            </h1>
            <p className="font-sans text-xs sm:text-sm text-neutral-600 font-bold mt-1 tracking-wider uppercase">
              Data Scientist | Data Analyst | AI/ML Engineer
            </p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 font-mono text-[10px] text-neutral-500 mt-2.5">
              <span>{personalInfo.phone}</span>
              <span>•</span>
              <span>{personalInfo.email}</span>
              <span>•</span>
              <span>linkedin.com/in/vema-mallela</span>
              <span>•</span>
              <span>github.com/mallelavema</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="my-6">
            <h3 className="font-sans font-black text-xs uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-1.5 mb-3">
              Professional Summary
            </h3>
            <p className="font-sans text-xs leading-relaxed text-neutral-700 text-justify">
              {personalInfo.bio}
            </p>
          </div>

          {/* Experience Timeline */}
          <div className="my-6">
            <h3 className="font-sans font-black text-xs uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-1.5 mb-4">
              Work Experience
            </h3>
            {timelineData.filter(item => item.type === 'experience').map((item) => (
              <div key={item.id} className="mb-5 text-left">
                <div className="flex justify-between items-start font-sans">
                  <div>
                    <h4 className="font-bold text-xs text-neutral-900">{item.title}</h4>
                    <span className="text-[11px] text-neutral-600">{item.companyOrInstitution}</span>
                  </div>
                  <span className="font-mono text-[10px] text-neutral-500 shrink-0 font-semibold">{item.date}</span>
                </div>
                {item.bullets && (
                  <ul className="mt-2 space-y-1 list-disc list-inside text-left">
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="font-sans text-[11px] text-neutral-700 leading-relaxed text-justify">
                        <span className="font-sans text-[11px] text-neutral-700">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="my-6">
            <h3 className="font-sans font-black text-xs uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-1.5 mb-4">
              Projects Showcase
            </h3>
            {projectsData.slice(0, 3).map((project) => (
              <div key={project.id} className="mb-5 text-left">
                <div className="flex justify-between items-start font-sans">
                  <div>
                    <h4 className="font-bold text-xs text-neutral-900">{project.title}</h4>
                    <span className="text-[10px] text-neutral-500 font-mono">Tools: {project.tools.join(', ')}</span>
                  </div>
                  <span className="font-mono text-[10px] text-neutral-500 shrink-0 font-semibold">{project.date}</span>
                </div>
                <ul className="mt-2 space-y-1 list-disc list-inside text-left">
                  {project.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="font-sans text-[11px] text-neutral-700 leading-relaxed text-justify">
                      <span className="font-sans text-[11px] text-neutral-700">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Tech stack categorization */}
          <div className="my-6">
            <h3 className="font-sans font-black text-xs uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-1.5 mb-3">
              Technical Stack & Tools
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-left">
              {skillsData.map((category) => (
                <div key={category.title}>
                  <h4 className="font-sans font-bold text-[10px] text-neutral-800 uppercase tracking-wider mb-1">
                    {category.title}
                  </h4>
                  <p className="font-sans text-[11px] text-neutral-600 leading-relaxed">
                    {category.skills.map(s => s.name).join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="my-6">
            <h3 className="font-sans font-black text-xs uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-1.5 mb-3">
              Education & Professional Certifications
            </h3>
            
            {/* Degree */}
            <div className="mb-3 flex justify-between items-start font-sans text-left">
              <div>
                <h4 className="font-bold text-xs text-neutral-900">B.Tech – Computer Science Engineering</h4>
                <span className="text-[11px] text-neutral-600">St. Mary's Group of Institutions | JNTUH Hyderabad</span>
              </div>
              <span className="font-mono text-[10px] text-neutral-500 shrink-0 font-semibold">2020 – 2024</span>
            </div>

            {/* Certs */}
            <div className="space-y-2 text-left">
              <div className="flex justify-between items-start font-sans">
                <div>
                  <h4 className="font-bold text-xs text-neutral-900">Advanced Certification in Data Science & AI</h4>
                  <span className="text-[11px] text-neutral-600">IIT Guwahati, Electronics & ICT Academy via Besant Technologies</span>
                </div>
                <span className="font-mono text-[10px] text-neutral-500 shrink-0 font-semibold">2026</span>
              </div>

              <div className="flex justify-between items-start font-sans">
                <div>
                  <h4 className="font-bold text-xs text-neutral-900">Tableau Data Visualization Training</h4>
                  <span className="text-[11px] text-neutral-600">Besant Technologies, Bengaluru</span>
                </div>
                <span className="font-mono text-[10px] text-neutral-500 shrink-0 font-semibold">2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* Print CV footer controls (Hidden on print) */}
        <div className="p-4 bg-neutral-50 border-t border-neutral-100 flex justify-end gap-3 shrink-0 print:hidden">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-neutral-200 hover:bg-neutral-100 text-neutral-700 font-medium text-xs transition-colors cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </motion.div>
    </div>
  );
}
