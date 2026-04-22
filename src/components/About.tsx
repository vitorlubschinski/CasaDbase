import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const tags = [
  { text: "Cortinas e Colchas", image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=400" },
  { text: "Persianas e Papéis", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400" },
  { text: "Quadros e Espelhos", image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=400" }
];

export default function About() {
  return (
    <section 
      id="about" 
      className="relative z-10 -mt-64 md:-mt-12 rounded-t-[5rem] md:rounded-t-[3.5rem] h-auto md:h-[100dvh] md:min-h-[800px] bg-white px-6 md:px-12 lg:px-24 flex flex-col py-24 md:py-16 select-none shadow-[0_-60px_100px_-30px_rgba(0,0,0,0.25)]"
    >
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col gap-8 md:gap-0">
        
        {/* Top Section: Pill and Headline */}
        <div className="flex flex-col md:flex-row justify-between items-start shrink-0">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dark/10 bg-white shadow-sm mb-6 md:mb-0"
          >
            <span className="text-[10px] uppercase tracking-widest font-bold text-dark/40">CASA D —</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-dark tracking-tighter leading-[0.9] max-w-2xl md:text-right font-display uppercase"
          >
            Especialistas em <span className="font-serif italic font-light lowercase">Cortinas</span>, <br /> <span className="font-serif italic font-light lowercase">Persianas</span> e Decoração
          </motion.h2>
        </div>

        {/* Middle Section: 3 Cards Grid - Flexible height */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 flex-grow py-8 md:py-10 items-stretch">
          
          {/* Card 01: Black */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-[#0F0F0F] rounded-[2.5rem] p-10 md:p-12 flex flex-col justify-between group relative overflow-hidden min-h-[380px] shadow-xl hover:shadow-2xl transition-all duration-500"
          >
            <div className="relative z-10 w-full">
              <div className="flex items-center gap-4">
                <span className="text-white/30 font-mono text-[11px] font-bold tracking-widest">01.</span>
                <div className="flex-grow h-px bg-white/10" />
              </div>
            </div>
            
            <div className="relative z-10 mt-auto">
              <h3 className="text-white text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-[0.9]">
                O que <br /> fazemos
              </h3>
              <p className="text-white/50 text-sm leading-relaxed max-w-[240px] mb-8 font-medium">
                Unimos estética e funcionalidade para transformar cada ambiente em um refúgio particular.
              </p>
              <div className="flex justify-between items-end">
                <button className="text-white text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-accent pb-1 hover:text-accent transition-colors">
                  Soluções
                </button>
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-dark transform group-hover:rotate-45 transition-transform duration-500">
                  <ArrowUpRight size={20} strokeWidth={3} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 02: Light Brown Accent */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
            className="bg-accent rounded-[2.5rem] p-10 md:p-12 flex flex-col group relative overflow-hidden min-h-[380px] shadow-xl hover:shadow-2xl transition-all duration-500"
          >
             <div className="relative z-10 flex items-center gap-4 w-full">
              <span className="text-dark/30 font-mono text-[11px] font-bold tracking-widest">02.</span>
              <div className="flex-grow h-px bg-dark/10" />
            </div>

            <div className="relative z-10 mt-12 flex-grow">
              <h3 className="text-dark text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-[0.9]">
                Nosso <br /> impacto
              </h3>
              <p className="text-dark/70 text-sm leading-relaxed max-w-[200px] mb-8 font-bold">
                Criamos espaços que melhoram a qualidade de vida e o bem-estar diário.
              </p>
              <button className="text-dark text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-dark/20 pb-1 hover:border-dark transition-colors">
                Ver Projetos
              </button>
            </div>

            <div className="absolute bottom-10 right-10 w-12 h-12 rounded-full bg-white flex items-center justify-center text-dark transform group-hover:rotate-45 transition-transform duration-500 shadow-xl z-20">
              <ArrowUpRight size={20} strokeWidth={3} />
            </div>
          </motion.div>

          {/* Card 03: Deep Grey/Charcoal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
            className="bg-[#1A1A1A] rounded-[2.5rem] p-10 md:p-12 flex flex-col group relative overflow-hidden min-h-[380px] shadow-xl hover:shadow-2xl transition-all duration-500"
          >
            <div className="relative z-10 flex items-center gap-4 w-full">
              <span className="text-white/30 font-mono text-[11px] font-bold tracking-widest">03.</span>
              <div className="flex-grow h-px bg-white/10" />
            </div>

            <div className="relative z-10 mt-auto">
              <h3 className="text-white text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-[0.9]">
                Valores <br /> centrais
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-8 font-medium">
                Priorizamos o conforto, a sofisticação e a expressão pessoal em cada detalhe.
              </p>
              <div className="flex justify-between items-end">
                <button className="text-white text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-accent pb-1 hover:text-accent transition-colors">
                  Descubra
                </button>
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-dark transform group-hover:rotate-45 transition-transform duration-500 shadow-[0_10px_30px_rgba(166,82,54,0.3)]">
                  <ArrowUpRight size={20} strokeWidth={3} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Pills Row */}
        <div className="flex flex-wrap gap-2 md:gap-3 shrink-0 py-4 md:py-0">
          {tags.map((tag, index) => (
             <motion.div 
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2 md:py-2.5 rounded-full border border-dark/5 bg-white shadow-sm hover:border-dark/10 transition-all cursor-pointer group"
             >
                {tag.image && (
                   <div className="w-6 md:w-8 h-4 md:h-5 rounded-full overflow-hidden">
                     <img 
                       src={tag.image} 
                       alt={tag.text}
                       className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" 
                     />
                   </div>
                )}
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-dark/70 group-hover:text-dark whitespace-nowrap">{tag.text}</span>
             </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
