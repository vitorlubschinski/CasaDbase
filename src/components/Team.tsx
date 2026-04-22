import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Team() {
  return (
    <section id="team" className="relative z-20 bg-accent py-24 md:py-32 overflow-hidden rounded-b-[4rem] md:rounded-b-[6rem] shadow-2xl">
      
      {/* Background Architectural Grid Pattern */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none select-none">
        <svg width="600" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 350L300 50L550 350" stroke="currentColor" strokeWidth="1" />
          <path d="M100 280H500" stroke="currentColor" strokeWidth="1" />
          <path d="M300 50V380" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div className="relative z-10 flex flex-col items-start text-dark py-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold leading-[0.8] mb-10 tracking-tighter uppercase"
          >
            Curadores <br /> de Ambientes
          </motion.h2>

          {/* Decorative Pattern - Terracotta Arrows */}
          <div className="flex gap-2 mb-10">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-[#7D3D28]" />
            ))}
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-dark/70 text-base md:text-lg max-w-sm mb-12 leading-relaxed"
          >
            Nossa equipe une design e sensibilidade para transformar ambientes em cenários de vida.
          </motion.p>

          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-dark text-white px-10 py-4 rounded-full text-[11px] font-black tracking-[0.2em] uppercase hover:bg-dark/90 transition-all flex items-center gap-4 group shadow-lg"
          >
            Nossa Equipe
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Team Image Container */}
        <div className="relative z-10 w-full flex justify-center md:justify-end py-10">
          <motion.div
            initial={{ clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-white/20"
          >
            <motion.div 
              style={{ 
                backgroundImage: `url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full transition-transform duration-700 hover:scale-105"
              aria-label="Equipe CASA D"
            />
            {/* Simple Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/20 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
