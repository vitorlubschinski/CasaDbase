import { motion } from 'motion/react';
import { ChevronDown, ArrowRight } from 'lucide-react';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-2 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl main-navbar"
    >
      <div className="bg-white border border-dark/10 rounded-full md:rounded-[1.25rem] px-6 md:px-8 py-2 md:py-2.5 flex items-center justify-between shadow-xl md:shadow-sm backdrop-blur-md bg-white/95">
        {/* Logo */}
        <div className="text-sm md:text-lg font-extrabold tracking-tight text-dark font-display">
          CASA D
        </div>

        {/* Links - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-10">
          <a href="#" className="text-[11px] uppercase tracking-widest font-bold text-dark/40 hover:text-dark transition-colors">Sobre</a>
          <div className="flex items-center gap-1 cursor-pointer group">
            <span className="text-[11px] uppercase tracking-widest font-bold text-dark/40 group-hover:text-dark transition-colors">Serviços</span>
          </div>
          <a href="#" className="text-[11px] uppercase tracking-widest font-bold text-dark/40 hover:text-dark transition-colors">Projetos</a>
          <a href="#" className="text-[11px] uppercase tracking-widest font-bold text-dark/40 hover:text-dark transition-colors">Galeria</a>
        </div>

        {/* CTA Button */}
        <button className="text-dark hover:text-dark/60 transition-all group">
          <div className="flex items-center gap-3">
            <span className="text-[11px] md:text-[11px] uppercase tracking-widest font-black">Orçamento</span>
            <div className="hidden md:flex w-8 h-8 rounded-full bg-dark items-center justify-center group-hover:scale-110 transition-transform">
              <ArrowRight size={14} className="text-white" />
            </div>
          </div>
        </button>
      </div>
    </motion.nav>
  );
}
