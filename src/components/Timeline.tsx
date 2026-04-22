import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

const milestones = [
  { text: "PRIMEIROS TRAÇOS", year: "2014" },
  { text: "CONSOLIDANDO O ESTILO", year: "2016" },
  { text: "AMBIENTES TRANSFORMADOS", year: "2018" },
  { text: "RECONHECIMENTO NACIONAL", year: "2021" },
  { text: "CURADORIA GLOBAL", year: "2024" }
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Update active index based on scroll progress
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const index = Math.min(
        milestones.length - 1,
        Math.floor(latest * milestones.length)
      );
      setActiveIndex(index);
    });
  }, [scrollYProgress]);

  return (
    <section 
      ref={containerRef}
      id="timeline" 
      className="relative h-[500vh] bg-[#F9F9F9] select-none"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full relative z-10 flex flex-col items-center">
          
          {/* Main Title - Left Aligned */}
          <div className="w-full mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-black leading-[0.85] tracking-tighter text-black uppercase"
            >
              Nossa <span className="text-black/10">História</span> <br />
              Em Movimento
            </motion.h2>
          </div>

          {/* Central Active Info Box */}
          <div className="relative mb-24 h-32 flex flex-col items-center justify-center">
            <motion.span 
              key={`year-${activeIndex}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] md:text-[12px] font-bold text-black/40 tracking-[0.2em] mb-4"
            >
              {milestones[activeIndex].year}
            </motion.span>
            
            <motion.div 
              key={`box-${activeIndex}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-black/10 px-8 py-5 shadow-[0_15px_40px_rgba(0,0,0,0.05)] flex items-center justify-center min-w-[300px] md:min-w-[450px]"
            >
              <span className="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-black text-center">
                {milestones[activeIndex].text}
              </span>
            </motion.div>
          </div>

          {/* Segmented Timeline Base */}
          <div className="relative w-full h-[60px] flex items-center">
            {/* Background Base Line (Divided segments) */}
            <div className="absolute inset-x-0 h-[1px] bg-black/5 flex justify-between">
              {milestones.map((_, i) => (
                <div key={`seg-mark-${i}`} className="w-[1px] h-3 bg-black/10 -translate-y-[6px]" />
              ))}
            </div>

            {/* Active Progress Line */}
            <div className="absolute inset-x-0 h-[1px] overflow-hidden">
               <motion.div 
                  style={{ scaleX, originX: 0 }}
                  className="absolute inset-0 h-full bg-black"
               />
            </div>

            {/* Square Markers atop the line */}
            <div className="absolute inset-0 flex justify-between items-center">
              {milestones.map((_, i) => {
                const isPast = i <= activeIndex;
                return (
                  <div 
                    key={`square-${i}`}
                    className={`relative transition-all duration-500 ${isPast ? 'scale-110' : 'scale-90 opacity-40'}`}
                  >
                    <div className={`w-2.5 h-2.5 bg-black transition-transform duration-500 ${isPast ? 'rotate-45' : ''}`} />
                    
                    {/* Visual feedback of it being "passed" */}
                    {isPast && (
                      <motion.div 
                        layoutId="activePointer"
                        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Additional Decorative Dividers */}
            <div className="absolute inset-x-0 bottom-0 flex justify-between px-1">
               {[...Array(20)].map((_, i) => (
                 <div key={i} className="w-[20px] h-[1px] bg-black/5" />
               ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
