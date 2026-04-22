import { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollVideo from './ScrollVideo';

gsap.registerPlugin(ScrollTrigger);

const scenes = [
  {
    title: "CASA D",
    tagline: "Estética. Funcionalidade. Alma.",
    description: "Confecção de cortinas, colchas e almofadas | Persianas | Tecidos | Quadros | Papel de parede | Espelhos"
  },
  {
    title: "Design que acolhe.",
    tagline: "", 
    description: ""
  }
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const extraUiRef = useRef<HTMLDivElement>(null); 
  const ctaButtonRef = useRef<HTMLDivElement>(null);
  const blurBgRef = useRef<HTMLDivElement>(null);

  // Scene Refs
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const navbar = document.querySelector('.main-navbar');
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      }
    });

    // Phase 0: Hide Navigation, Metadata and CTA Button
    tl.to([navbar, extraUiRef.current, ctaButtonRef.current], {
      opacity: 0,
      y: -30,
      duration: 0.4,
      ease: "power2.inOut",
      pointerEvents: "none"
    }, 0.05);

    // Fade out Description and Tagline
    tl.to([taglineRef.current, descRef.current], {
      opacity: 0,
      y: -10,
      duration: 0.3,
    }, 0.05);

    // Phase 1: Transition Title and Show Blur - NOW SYNCED TO HAPPEN AFTER UI IS GONE
    tl.to(titleRef.current, {
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)",
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        if (titleRef.current) titleRef.current.innerText = scenes[1].title;
      },
      onReverseComplete: () => {
        if (titleRef.current) titleRef.current.innerText = scenes[0].title;
      }
    }, 0.35) // Delayed: Starts when the button is almost fully faded
    .to(titleRef.current, {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.5,
      ease: "power2.out",
    }, 0.75) // Appears after the first text is gone
    // Appear Blur with Scene 2
    .fromTo(blurBgRef.current, {
      opacity: 0,
      scale: 0.8
    }, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
    }, 0.75);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="relative w-full">
      <div ref={heroRef} className="relative h-[600vh] w-full bg-black">
        <ScrollVideo 
          frameCount={240} 
          scrollTriggerRef={heroRef} 
          fallbackImage="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000"
        />
        
        {/* Subtle Dark Overlay for contrast with white text */}
        <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />

        {/* Pinned Content UI */}
        <div className="sticky top-0 h-screen w-full flex flex-col pt-32 md:pt-32 pb-10 px-6 md:px-12 lg:px-24 overflow-hidden z-20 pointer-events-none">
          {/* Top Sub-headers (The ones to vanish) */}
          <div ref={extraUiRef} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-4 mb-16 md:mb-16 pointer-events-auto">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              ref={taglineRef}
              className="text-[9px] md:text-xs uppercase tracking-[0.25em] font-black text-white"
            >
              📍 Rua Minas Gerais, 336
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden md:block text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium text-white/60"
            >
              Ambientes exclusivos e personalizados
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-[9px] md:text-xs uppercase tracking-[0.25em] font-black text-white"
            >
              Santa Rosa, RS
            </motion.span>
          </div>

          {/* Re-enable pointer events for interaction elements */}
          <div className="contents pointer-events-auto">
            {/* Main Title - Now forced white and large */}
            <div className="relative mb-6 md:mb-12 inline-block">
              {/* Subtle blur background to highlight the title */}
              <div 
                ref={blurBgRef}
                className="absolute -inset-x-6 md:-inset-x-12 -inset-y-4 bg-black/5 backdrop-blur-[2px] rounded-[2rem] pointer-events-none -z-10 opacity-0" 
              />
              
              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                ref={titleRef}
                className="text-[11vw] sm:text-[12vw] md:text-[9vw] lg:text-[8vw] font-extrabold leading-[0.8] tracking-tighter text-white h-[1.1em] flex items-center drop-shadow-2xl font-display uppercase"
              >
                {scenes[0].title}
              </motion.h1>
            </div>

            {/* Sub-text and Button */}
            <div className="max-w-xl mb-12 md:mb-24 flex flex-col">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                ref={descRef}
                className="text-sm md:text-lg lg:text-xl text-white/90 mb-6 md:mb-10 leading-relaxed max-w-[95%] md:max-w-full italic font-serif"
              >
                {scenes[0].description}
              </motion.p>

              <div ref={ctaButtonRef} className="mt-2">
                <motion.button 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-white text-dark px-5 md:px-8 py-3 md:py-4 rounded-lg md:rounded-2xl text-[12px] md:text-base font-bold flex items-center gap-3 hover:bg-white/90 transition-all group shadow-xl"
                >
                  Inicie seu Projeto
                  <div className="bg-accent p-1 md:p-1.5 rounded-lg group-hover:translate-x-1 transition-transform">
                    <ArrowRight size={16} className="text-white md:w-[20px] md:h-[20px]" />
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
