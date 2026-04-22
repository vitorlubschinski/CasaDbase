import { motion } from 'motion/react';
import { Instagram, Facebook, Linkedin, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-dark overflow-hidden -mt-24 md:-mt-32">
      
      {/* Background Image Layer (Always visible behind everything) */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
          alt="Modern Architecture"
          className="w-full h-full object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-dark/60 mix-blend-multiply" />
      </div>

      {/* 01: Call to Action Section (Floating over buildings) */}
      <section className="relative z-10 pt-48 md:pt-60 pb-8 flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight drop-shadow-2xl"
          >
            O seu refúgio ideal começa aqui.
          </motion.h2>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-dark px-8 py-3 rounded-full text-[9px] font-black tracking-[0.2em] uppercase hover:bg-neutral-100 transition-all flex items-center gap-3 mx-auto shadow-2xl"
          >
            Inicie seu projeto
            <ArrowRight size={14} />
          </motion.button>
        </div>
      </section>

      {/* 02: Main Footer Content (Floating White Card) */}
      <div className="relative z-10 px-4 md:px-12 lg:px-20 pb-8">
        <div className="max-w-7xl mx-auto bg-white rounded-[2rem] md:rounded-[3rem] px-6 md:px-10 lg:px-12 py-8 md:py-10 shadow-[0_30px_60px_rgba(0,0,0,0.15)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center border-b border-black/5 pb-8">
            
            {/* Column 1: Brand & Map Slimmed */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-dark rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white font-display font-extrabold text-xl">D</span>
                </div>
                <h3 className="text-xl font-display font-extrabold tracking-tighter uppercase">CASA D</h3>
              </div>
              
              <div className="w-full h-24 rounded-xl overflow-hidden border border-neutral-100 grayscale hover:grayscale-0 transition-all duration-700">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111046.2238466642!2d-54.550!3d-27.870!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94fb700000000001%3A0x0!2zMjfCsDUyJzEyLjAiUyA1NMKwMzMnMDAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1650000000000!5m2!1spt-BR!2sbr" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Column 2: Links Slimmed */}
            <div className="lg:col-span-3 grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <h4 className="text-[8px] font-black uppercase tracking-widest text-neutral-400">Empresa</h4>
                <a href="#" className="text-[11px] font-semibold hover:text-dark/60 transition-colors">Início</a>
                <a href="#" className="text-[11px] font-semibold hover:text-dark/60 transition-colors">Projetos</a>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-[8px] font-black uppercase tracking-widest text-neutral-400">Suporte</h4>
                <a href="#" className="text-[11px] font-semibold hover:text-dark/60 transition-colors">Contato</a>
                <a href="#" className="text-[11px] font-semibold hover:text-dark/60 transition-colors">Privacidade</a>
              </div>
            </div>

            {/* Column 3: Contact Slimmed */}
            <div className="lg:col-span-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex flex-col gap-2">
                <a href="tel:+5555984475031" className="text-base font-serif font-bold hover:text-dark/60 flex items-center gap-2">
                  <Phone size={14} className="text-neutral-300" />
                  📲 (55) 98447-5031
                </a>
                <p className="text-[10px] font-bold text-neutral-500 flex items-center gap-2">
                  <MapPin size={14} className="text-neutral-300" />
                  Rua Minas Gerais, 336, Santa Rosa, RS
                </p>
              </div>
              
              <div className="flex gap-2">
                {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 rounded-full border border-neutral-100 flex items-center justify-center hover:bg-neutral-50 transition-all text-neutral-600">
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright Area Compact */}
          <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[9px] text-neutral-400 uppercase tracking-widest font-black">
              © {currentYear} CASA D. TODOS OS DIREITOS RESERVADOS.
            </p>
            <div className="flex gap-4">
              <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-black cursor-pointer hover:text-dark transition-colors">Termos</span>
              <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-black cursor-pointer hover:text-dark transition-colors">Cookies</span>
              <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-black cursor-pointer hover:text-dark transition-colors">Privacidade</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
