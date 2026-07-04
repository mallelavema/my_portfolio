import { useState } from 'react';
import { Cpu, Database, Eye, Sparkles, Terminal } from 'lucide-react';
import { motion } from 'motion/react';
import { skillsData } from '../data';

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Map categories to distinct technical icons
  const getCategoryIcon = (title: string) => {
    switch (title) {
      case 'Generative AI & LLMs':
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'Machine Learning & AI':
        return <Cpu className="w-5 h-5 text-indigo-400" />;
      case 'Data Visualization & BI':
        return <Eye className="w-5 h-5 text-cyan-400" />;
      default:
        return <Database className="w-5 h-5 text-indigo-300" />;
    }
  };

  const getCategoryTheme = (title: string) => {
    switch (title) {
      case 'Generative AI & LLMs':
        return 'from-purple-500/10 to-indigo-500/5 hover:border-purple-500/30 glow-purple';
      case 'Machine Learning & AI':
        return 'from-indigo-500/10 to-blue-500/5 hover:border-indigo-500/30 glow-indigo';
      case 'Data Visualization & BI':
        return 'from-cyan-500/10 to-blue-500/5 hover:border-cyan-500/30 glow-cyan';
      default:
        return 'from-indigo-500/10 to-cyan-500/5 hover:border-indigo-500/30 glow-combined';
    }
  };

  const allMainTools = [
    'Python', 'SQL', 'Power BI', 'Tableau', 'Pandas', 'NumPy', 'scikit-learn',
    'TensorFlow', 'LLMs', 'RAG', 'LangChain', 'FAISS', 'Pinecone', 'ChromaDB',
    'MySQL', 'Jupyter Notebook', 'HuggingFace', 'OpenAI', 'Git', 'VS Code'
  ];

  return (
    <section id="skills" className="relative py-24 border-t border-white/[0.04] overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-16 md:flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-[1px] w-8 bg-cyan-400"></span>
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">Capabilities</span>
            </div>
            <h2 className="font-sans font-black tracking-tight text-white text-3xl sm:text-4xl">
              Technical Arsenal
            </h2>
            <p className="font-sans text-[#9A9AA5] text-sm md:text-base mt-2 max-w-xl">
              Deep competency spanning traditional statistical analytics, interactive dashboard business intelligence, and bleeding-edge Large Language Model workflows.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 font-mono text-[11px] text-[#9A9AA5] border border-white/[0.08] px-3 py-1.5 rounded-lg bg-white/[0.02] hidden sm:block">
            Hover tools to measure telemetry glow
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {skillsData.map((category) => (
            <div
              key={category.title}
              className={`p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${getCategoryTheme(
                category.title
              )} border border-white/[0.05] hover:shadow-2xl transition-all duration-300 backdrop-blur-md`}
              id={`skills-category-${category.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                  {getCategoryIcon(category.title)}
                </div>
                <h3 className="font-sans font-bold text-lg text-white">
                  {category.title}
                </h3>
              </div>

              {/* Specific Skills Stack */}
              <div className="space-y-5">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group cursor-pointer"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="flex justify-between items-center text-sm mb-1.5 font-sans">
                      <span className="text-[#9A9AA5] group-hover:text-white transition-colors duration-200">
                        {skill.name}
                      </span>
                      <span className="font-mono text-xs text-cyan-400 font-medium">
                        {skill.level}%
                      </span>
                    </div>
                    {/* Track Container */}
                    <div className="w-full h-[5px] bg-white/[0.04] rounded-full overflow-hidden relative">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${
                          category.title === 'Generative AI & LLMs'
                            ? 'from-purple-500 to-indigo-400'
                            : category.title === 'Machine Learning & AI'
                            ? 'from-indigo-500 to-blue-400'
                            : 'from-cyan-400 to-blue-500'
                        }`}
                        style={{
                          width: `${skill.level}%`,
                          filter: hoveredSkill === skill.name ? 'brightness(1.2)' : 'none',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Global Stack Marquee / Keyword Badges Grid */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0F0F12]/80 border border-white/[0.05] backdrop-blur-md relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/[0.02] to-transparent pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-2.5">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <h4 className="font-sans font-bold text-sm text-white uppercase tracking-wider">
                Full-Stack Data Tech Ecosystem
              </h4>
            </div>
            <div className="h-[1px] md:h-px flex-1 bg-white/[0.05]" />
          </div>

          <div className="flex flex-wrap gap-2.5">
            {allMainTools.map((tool) => (
              <span
                key={tool}
                className="px-3.5 py-2 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] hover:border-cyan-400/30 hover:text-cyan-400 hover:-translate-y-0.5 transition-all duration-200 cursor-default font-mono text-xs text-[#9A9AA5] inline-block shadow-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
