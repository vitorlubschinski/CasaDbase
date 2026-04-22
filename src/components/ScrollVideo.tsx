import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ScrollVideoProps {
  frameCount: number;
  scrollTriggerRef: React.RefObject<HTMLDivElement | null>;
  fallbackImage?: string;
}

export default function ScrollVideo({ frameCount, scrollTriggerRef, fallbackImage }: ScrollVideoProps) {
  // Construct an array of paths for the frames in the public folder
  const framePaths = React.useMemo(() => {
    return Array.from({ length: frameCount }, (_, i) => {
      const frameNumber = (i + 1).toString().padStart(3, '0');
      // Usando caminho relativo para evitar problemas de rota em iframes
      return `/FR1/ezgif-frame-${frameNumber}.jpg`;
    });
  }, [frameCount]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isBackgroundLoading, setIsBackgroundLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  // Refs for high-performance rendering and state management
  const imageCache = useRef<(HTMLImageElement | null)[]>([]);
  const videoState = useRef({ frame: 0 });
  const renderState = useRef({ lastFrame: -1, isDirty: true, isLooping: false });
  const animationFrameId = useRef<number | null>(null);

  // 1. Smart Fallback: Find the nearest loaded frame
  const findNearestFrame = useCallback((index: number) => {
    const total = imageCache.current.length;
    if (total === 0) return null;
    
    const target = Math.max(0, Math.min(Math.floor(index), total - 1));
    
    // Exact match
    if (imageCache.current[target]) return imageCache.current[target];
    
    // Bidirectional search for nearest
    for (let offset = 1; offset < total; offset++) {
      const prev = target - offset;
      const next = target + offset;
      if (prev >= 0 && imageCache.current[prev]) return imageCache.current[prev];
      if (next < total && imageCache.current[next]) return imageCache.current[next];
    }
    return null;
  }, []);

  // 2. High-Performance Manual Render Loop
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    const currentFrame = Math.floor(videoState.current.frame);
    
    // Smooth check to avoid redundant draws
    if (currentFrame !== renderState.current.lastFrame || renderState.current.isDirty) {
      const img = findNearestFrame(currentFrame);
      if (img && img.complete) {
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgWidth = img.width;
        const imgHeight = img.height;

        const hRatio = canvasWidth / imgWidth;
        const vRatio = canvasHeight / imgHeight;
        const ratio = Math.max(hRatio, vRatio);
        
        const nw = imgWidth * ratio;
        const nh = imgHeight * ratio;
        const nx = (canvasWidth - nw) / 2;
        const ny = (canvasHeight - nh) / 2;

        // Draw image directly (no clearRect since we cover 100%)
        ctx.imageSmoothingEnabled = false; // Faster rendering during scroll
        ctx.drawImage(img, nx, ny, nw, nh);

        renderState.current.lastFrame = currentFrame;
        renderState.current.isDirty = false;
      }
    }

    if (renderState.current.isLooping) {
      animationFrameId.current = requestAnimationFrame(render);
    }
  }, [findNearestFrame]);

  // 3. Multi-Phase Loading Logic
  useEffect(() => {
    const keys = framePaths;

    if (keys.length === 0) {
      setErrorStatus("No frames detected. Check public/FR1/ directory.");
      // Still set ready to show the error UI
      setIsReady(true);
      return;
    }

    const total = keys.length;
    imageCache.current = new Array(total).fill(null);
    
    const phase1Count = Math.min(Math.floor(total * 0.1) || 10, 30);
    let phase1Loaded = 0;

    const loadPhase1 = async () => {
      const phase1Keys = keys.slice(0, phase1Count);
      const promises = phase1Keys.map((key, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.referrerPolicy = "no-referrer";
          img.onload = () => {
            imageCache.current[index] = img;
            phase1Loaded++;
            setLoadProgress(Math.floor((phase1Loaded / phase1Count) * 100));
            resolve();
          };
          img.onerror = () => {
            console.error("Failed to load frame:", key);
            resolve();
          };
          img.src = key;
        });
      });

      await Promise.all(promises);
      setIsReady(true);
      renderState.current.isDirty = true;
      loadPhase2();
    };

    const loadPhase2 = async () => {
      setIsBackgroundLoading(true);
      const remainingKeys = keys.slice(phase1Count).map((key, idx) => ({ key, index: idx + phase1Count }));
      const chunkSize = 15;

      for (let i = 0; i < remainingKeys.length; i += chunkSize) {
        const chunk = remainingKeys.slice(i, i + chunkSize);
        await Promise.all(chunk.map(({ key, index }) => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.referrerPolicy = "no-referrer";
            img.onload = () => {
              imageCache.current[index] = img;
              resolve();
            };
            img.onerror = () => resolve();
            img.src = key;
          });
        }));
        await new Promise(r => setTimeout(r, 60));
      }
      setIsBackgroundLoading(false);
    };

    loadPhase1();

    return () => {
      renderState.current.isLooping = false;
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [framePaths]);

  // 4. GSAP & Resize Handlers
  useEffect(() => {
    if (!isReady || !scrollTriggerRef.current) return;

    renderState.current.isLooping = true;
    animationFrameId.current = requestAnimationFrame(render);

    const ctx = gsap.context(() => {
      gsap.to(videoState.current, {
        frame: imageCache.current.length - 1,
        ease: "none",
        scrollTrigger: {
          trigger: scrollTriggerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 2, // Increased smoothing (momentum)
          invalidateOnRefresh: true,
        }
      });
    });

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap DPR for performance
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = '100vw'; // Use vw/vh for robustness
      canvas.style.height = '101vh'; // Slight overflow to prevent white gaps
      
      renderState.current.isDirty = true;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      renderState.current.isLooping = false;
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      ctx.revert();
    };
  }, [isReady, scrollTriggerRef, render]);

  return (
    <div className="absolute inset-0 z-0">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
        {/* Fallback Image - Ensuring it stays visible if sequence fails */}
        {fallbackImage && (
          <img 
            src={fallbackImage} 
            alt="Hero Background" 
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: isReady ? 0 : 1 }}
            referrerPolicy="no-referrer"
          />
        )}
        
        {/* Loading Fase 1 */}
        {!isReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-transparent z-[100]">
            <div className="flex flex-col items-center gap-6">
              <div className="w-24 h-[1px] bg-white/20 overflow-hidden relative">
                <div 
                  className="absolute inset-0 bg-white transition-transform duration-500 ease-out origin-left"
                  style={{ transform: `scaleX(${loadProgress / 100})` }}
                />
              </div>
              <p className="text-white/40 font-mono text-[9px] uppercase tracking-[0.3em]">
                {loadProgress}%
              </p>
            </div>
          </div>
        )}

        {/* Error Display */}
        {errorStatus && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center italic text-red-500/50 text-[10px] z-[100] px-10 text-center">
            {errorStatus}
            <br />
            Checking files in /FR1/
          </div>
        )}

        {/* Background Loading Indicator */}
        {isBackgroundLoading && isReady && (
          <div className="absolute bottom-10 right-10 z-[60] mix-blend-difference flex items-center gap-2">
            <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
            <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">
              Enhancing detail
            </span>
          </div>
        )}

        <canvas 
          ref={canvasRef}
          className="w-full h-full block touch-none"
          style={{ objectFit: 'cover' }}
        />
        
        {/* Subtle architectural grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-10" />
      </div>
    </div>
  );
}
