import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const portfolioItems = [
  {
    id: 1,
    title: "Cortinas",
    desc: "Elegância costurada à mão com os melhores tecidos.",
    image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=1200",
    size: "md:col-span-2 md:row-span-2",
    cta: "Coleção"
  },
  {
    id: 2,
    title: "Persianas",
    desc: "Motorização de precisão e design minimalista.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1200",
    size: "md:col-span-2 md:row-span-2",
    cta: "Detalhes"
  },
  {
    id: 3,
    title: "Almofadas",
    desc: "Acentos texturizados refinados.",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800",
    size: "md:col-span-1 md:row-span-1",
    cta: null
  },
  {
    id: 4,
    title: "Tecidos",
    desc: "Biblioteca de tecidos exclusivos.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800",
    size: "md:col-span-1 md:row-span-1",
    cta: null
  },
  {
    id: 5,
    title: "Quadros",
    desc: "Consultoria de arte curada.",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=800",
    size: "md:col-span-1 md:row-span-1",
    cta: null
  },
  {
    id: 6,
    title: "Papel de Parede",
    desc: "Revestimentos táteis profundos.",
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=800",
    size: "md:col-span-1 md:row-span-1",
    cta: "Consultar"
  },
  {
    id: 7,
    title: "Espelhos",
    desc: "Reflexos para iluminar o ambiente.",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=1200",
    size: "md:col-span-4 md:row-span-1",
    cta: "Orçamento"
  }
];

export default function Portfolio() {
  const [showAll, setShowAll] = React.useState(false);

  // Inicialmente mostramos 3 itens no celular
  const mobileVisibleItems = showAll ? portfolioItems : portfolioItems.slice(0, 3);

  return (
    <section id="portfolio" className="relative bg-[#0F0F0F] py-16 md:py-32 overflow-hidden px-4 md:px-12 lg:px-24">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6">
        <div className="max-w-xl">
          <span className="text-accent font-display text-[8px] md:text-[9px] tracking-[0.4em] uppercase mb-3 md:mb-4 block font-bold">[ NOSSOS PRODUTOS E SERVIÇOS ]</span>
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] font-display uppercase">
            DESIGN DE <br />
            <span className="text-white/20 italic font-serif lowercase font-light">Interiores</span>
          </h2>
        </div>
        <div className="flex flex-col items-start md:items-end gap-4">
          <p className="text-white/40 text-[10px] md:text-xs max-w-[250px] md:text-right font-medium leading-relaxed italic font-serif">
            Harmonizando sofisticação contemporânea com a funcionalidade de cada material.
          </p>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[250px] md:auto-rows-[300px] gap-2 md:gap-4 lg:gap-6">
        {/* Render visible items for mobile or all for desktop based on hidden class logic */}
        {portfolioItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            className={`group relative overflow-hidden rounded-xl md:rounded-2xl bg-neutral-900 border border-white/5 ${item.size} 
              ${index >= 3 && !showAll ? 'hidden md:block' : 'block'}`}
          >
            {/* Image using img tag for maximum reliability */}
            <img 
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            
            {/* Content - Hidden by default, appears on hover with a smooth slide and fade */}
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-6 group-hover:translate-y-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent">
              <h3 className="text-white text-base md:text-lg lg:text-xl font-black font-display tracking-tighter uppercase mb-0.5 md:mb-1 drop-shadow-lg">
                {item.title}
              </h3>
              <p className="text-white/70 text-[9px] md:text-[10px] lg:text-[11px] font-sans font-medium mb-3 md:mb-5 max-w-[180px] md:max-w-xs drop-shadow-md leading-tight">
                {item.desc}
              </p>
              
              {item.cta && (
                <div className="mt-auto md:mt-0">
                   <button className="bg-white/10 backdrop-blur-md hover:bg-accent text-white px-3 md:px-4 py-1.5 rounded-lg text-[7px] md:text-[8px] font-black uppercase tracking-widest border border-white/10 transition-all hover:border-accent shadow-2xl">
                     {item.cta}
                   </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile "Ver Tudo" Button */}
      {!showAll && (
        <div className="mt-10 flex justify-center md:hidden">
          <button 
            onClick={() => setShowAll(true)}
            className="flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all active:scale-95"
          >
            Ver catálogo completo
            <ArrowUpRight size={14} className="text-accent" />
          </button>
        </div>
      )}
    </section>
  );
}
