import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, X, Terminal, Cpu, MessageSquare, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { personalInfo } from '../data';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  isDiagnostic?: boolean;
}

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

// Local pre-compiled high-fidelity knowledge base responses for Vema Mallela's portfolio
const LOCAL_KNOWLEDGE_BASE: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['skill', 'stack', 'tool', 'language', 'python', 'sql', 'tableau', 'power bi', 'technolog', 'capabilities'],
    answer: `Vema's technical arsenal is divided into four major pillars:
1. **Generative AI & LLMs**: RAG architectures, LangChain, AI Agents, Vector Databases (ChromaDB, Pinecone, FAISS), Embeddings, and Prompt Engineering.
2. **Machine Learning**: Regression, Classification, Clustering, Time-Series Forecasting, Scikit-Learn, and TensorFlow.
3. **Data Visualization**: Power BI (mastery in DAX & Power Query), Tableau Dashboard Design, Matplotlib, Seaborn, and Excel.
4. **Core Engineering**: Advanced Python, optimized relational SQL (schema designs, window functions, complex joins), Pandas, and NumPy.

He specializes in building end-to-end pipelines—from data cleaning and feature engineering to predictive modeling and visual reporting.`
  },
  {
    keywords: ['project', 'work', 'accomplish', 'portfolio', 'built', 'developed', 'experience'],
    answer: `Vema has designed and executed several high-impact data projects:
1. **Netflix Content Intelligence Dashboard (Tableau, SQL, Python)**: Analyzed 8,000+ titles to map global content splits and acquisition trends, saving stakeholders 60% in manual analytics time.
2. **Amazon Sales Performance Dashboard (Power BI, DAX)**: Automated a sales auditing matrix tracking $2.30M in revenue and 87.03K shipments, compressing a 3-hour manual reporting cycle to a 15-minute scheduled refresh.
3. **Healthcare Data & Disease Prediction (Python, ML, MySQL)**: Conducted diagnostics exploration on 1,200+ patient biometric logs to extract critical risk factors, integrating temporal feature engineering.
4. **Enterprise Document RAG Pipeline (Generative AI, LangChain, ChromaDB)**: Built a semantic query answering agent with document index indexing and vector search.`
  },
  {
    keywords: ['intern', 'besant', 'experience', 'bengaluru', 'job', 'role', 'history'],
    answer: `Vema was a **Data Science & AI Intern** at Besant Technologies, Bengaluru (Oct 2025 – May 2026).
His key accomplishments included:
- Preparing and cleaning 50k+ record datasets using Python and SQL (improving data quality by ~30%).
- Reducing corporate reporting overheads by 40% through writing performance-optimized SQL window functions.
- Deploying 3+ Tableau & Power BI operational dashboards, allowing stakeholders to identify performance gaps 2x faster.
- Training Scikit-Learn ML classifiers to achieve ~85% forecast accuracy for business projections.`
  },
  {
    keywords: ['education', 'degree', 'college', 'university', 'btech', 'st mary', 'jntu', 'study'],
    answer: `Vema holds a **B.Tech in Computer Science Engineering** (2020 – 2024) from St. Mary's Group of Institutions, JNTUH, Hyderabad.
He also holds an **Advanced Certification in Data Science & AI** from IIT Guwahati, completed with Besant Technologies (Oct 2025 – May 2026).`
  },
  {
    keywords: ['certification', 'certify', 'credential', 'iit', 'guwahati'],
    answer: `Vema holds two primary credentials:
1. **Advanced Certification in Data Science & AI** — Electronics & ICT Academy, IIT Guwahati (Oct 2025 – May 2026).
2. **Tableau Data Visualization Training** — Besant Technologies, Bengaluru (2025).`
  },
  {
    keywords: ['contact', 'email', 'phone', 'reach', 'hire', 'locate', 'location', 'linkedin', 'github'],
    answer: `You can reach Vema directly:
- **Email**: mallelavema8501@gmail.com
- **Phone**: +91-8501831533
- **Location**: Bengaluru, India
- **LinkedIn**: linkedin.com/in/vema-mallela
- **GitHub**: github.com/mallelavema

He is actively looking for full-time positions as a Data Analyst, Data Scientist, or AI/ML Engineer.`
  }
];

export default function AIChatbot({ isOpen, onClose }: AIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: `Hello! I am Vema's GenAI Resume Assistant, powered by Gemini. You can ask me questions about his ML pipelines, SQL optimizations, Power BI dashboards, or certification details. How can I assist you today?`,
      timestamp: new Date()
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const [aiEngine, setAiEngine] = useState<'Gemini Core API' | 'Local Resume-KB Index'>('Local Resume-KB Index');

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickQuestions = [
    "What are Vema's tech skills?",
    "Tell me about his Amazon project",
    "Where did he intern?",
    "How can I contact Vema?",
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsgId = 'user-' + Date.now();
    const newUserMsg: Message = {
      id: userMsgId,
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputMessage('');
    setIsTyping(true);

    const startTime = performance.now();

    try {
      // 1. Attempt server-side API call
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      });

      const endTime = performance.now();
      const elapsed = Math.round(endTime - startTime);

      if (response.ok) {
        const data = await response.json();
        setLatencyMs(elapsed);
        setAiEngine('Gemini Core API');
        
        setMessages(prev => [
          ...prev,
          {
            id: 'bot-' + Date.now(),
            sender: 'bot',
            text: data.reply || "I encountered an empty answer.",
            timestamp: new Date()
          }
        ]);
      } else {
        throw new Error('Server API unavailable');
      }
    } catch (error) {
      // Graceful fallback to local regex matcher if server key is unconfigured
      const lowerText = textToSend.toLowerCase();
      let matchedAnswer = '';

      for (const item of LOCAL_KNOWLEDGE_BASE) {
        if (item.keywords.some(kw => lowerText.includes(kw))) {
          matchedAnswer = item.answer;
          break;
        }
      }

      if (!matchedAnswer) {
        matchedAnswer = `I recognized your query, but my resume indices are focused on Vema's qualifications. 

Could you ask about:
- **Vema's Technical Skills** (Python, SQL, RAG, Power BI, ML)
- **Work Experience** (Besant Technologies Intern accomplishments)
- **Academic Certifications** (IIT Guwahati and Tableau qualifications)
- **Project Case Studies** (Netflix content metrics, Amazon Sales tracking, Healthcare predictions)
- **Direct contact credentials** to schedule an interview?`;
      }

      const elapsed = Math.round(performance.now() - startTime);
      setLatencyMs(elapsed);
      setAiEngine('Local Resume-KB Index');

      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: 'bot-fallback-' + Date.now(),
            sender: 'bot',
            text: matchedAnswer,
            timestamp: new Date()
          }
        ]);
      }, 500); // slight delay to feel natural
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop screen blocker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-xs"
          />

          {/* Drawer Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[450px] bg-[#0A0A0B] border-l border-white/[0.08] shadow-2xl z-50 flex flex-col justify-between"
            id="ai-chatbot-drawer"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.01]">
              <div className="flex items-center gap-2.5 text-left">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 flex items-center justify-center">
                  <Cpu className="w-4.5 h-4.5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-sm text-white leading-tight">Vema's Resume Bot</h3>
                  <span className="font-mono text-[9px] text-cyan-400 font-semibold tracking-wider uppercase block">Gemini 1.5 Flash Model</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-white/[0.04] border border-transparent hover:border-white/[0.06] text-[#9A9AA5] hover:text-white transition-all"
                id="chatbot-close-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Logs Window */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 font-mono text-[8px] text-[#55555C]">
                    <span>{msg.sender === 'user' ? 'RECRUITER' : 'AI_AGENT'}</span>
                    <span>•</span>
                    <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>

                  <div
                    className={`px-3.5 py-2.5 rounded-2xl max-w-[85%] text-sm leading-relaxed whitespace-pre-wrap text-left ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-tr-none shadow-md shadow-indigo-600/10'
                        : 'bg-white/[0.03] border border-white/[0.06] text-[#D1D1D6] rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex flex-col items-start">
                  <div className="font-mono text-[8px] text-[#55555C] mb-1">AI_AGENT • CALCULATING...</div>
                  <div className="px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] rounded-tl-none flex gap-1 items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Diagnostics and Suggestions Panel */}
            <div className="p-4 border-t border-white/[0.06] bg-white/[0.01] space-y-3">
              {/* Telemetry diagnostics stats */}
              <div className="flex justify-between items-center text-[9px] font-mono border-b border-white/[0.04] pb-2 text-[#55555C]">
                <div className="flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span>ENGINE: <span className="text-white">{aiEngine}</span></span>
                </div>
                {latencyMs !== null && (
                  <span>LATENCY: <span className="text-cyan-400">{latencyMs}ms</span></span>
                )}
              </div>

              {/* Quick suggestion tags */}
              <div className="flex flex-wrap gap-1.5">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSendMessage(q)}
                    className="px-2.5 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-indigo-400/30 text-[10px] font-sans text-[#9A9AA5] hover:text-white text-left transition-all shrink-0"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Text Area Inputs */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputMessage);
                }}
                className="flex gap-2 items-center"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about Vema's ML skills / SQL experience..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-white/20 text-xs focus:bg-white/[0.05] focus:border-cyan-400/50 outline-none transition-all"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={isTyping || !inputMessage.trim()}
                  className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white transition-all shrink-0 cursor-pointer"
                  title="Send Message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
