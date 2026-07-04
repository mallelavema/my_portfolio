import { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { testimonialsData } from '../data';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 8500); // rotate every 8.5 seconds
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  return (
    <section id="testimonials" className="relative py-20 border-t border-white/[0.04] overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10 text-center">
        {/* Section badge */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <MessageSquare className="w-4 h-4 text-pink-400" />
          <span className="font-mono text-xs text-pink-400 uppercase tracking-widest font-semibold">
            Endorsements
          </span>
        </div>

        {/* Carousel slide animation */}
        <div className="relative h-64 sm:h-52 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <Quote className="w-10 h-10 text-purple-500/15 mb-4" />
              <p className="font-sans text-sm sm:text-base text-[#9A9AA5] italic leading-relaxed max-w-2xl">
                "{testimonialsData[activeIndex].feedback}"
              </p>
              <div className="mt-5">
                <span className="font-sans font-bold text-white text-sm block">
                  {testimonialsData[activeIndex].name}
                </span>
                <span className="font-mono text-[10px] text-pink-400 tracking-wider block mt-0.5">
                  {testimonialsData[activeIndex].role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls and indicators */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={handlePrev}
            className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.06] text-[#9A9AA5] hover:text-white transition-colors"
            aria-label="Previous endorsement"
            id="testimonial-prev"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots */}
          <div className="flex gap-1.5">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? 'bg-pink-400 w-3' : 'bg-white/10'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.06] text-[#9A9AA5] hover:text-white transition-colors"
            aria-label="Next endorsement"
            id="testimonial-next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
