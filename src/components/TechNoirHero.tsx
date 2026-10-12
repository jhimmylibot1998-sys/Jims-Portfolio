import { useEffect, useRef } from 'react';
import { playTone } from '../lib/soundEngine';

interface TechNoirHeroProps {
  onViewWork: () => void;
  onOpenContact: () => void;
}

export function TechNoirHero({ onViewWork, onOpenContact }: TechNoirHeroProps) {
  const glitchRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // Random glitch effect trigger
    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * glitchRefs.current.length);
      const target = glitchRefs.current[idx];
      if (target) {
        target.classList.add('is-glitching');
        setTimeout(() => target.classList.remove('is-glitching'), 700);
      }
    }, 4800);

    return () => clearInterval(interval);
  }, []);

  const triggerGlitch = (el: HTMLSpanElement | null) => {
    if (!el) return;
    el.classList.add('is-glitching');
    playTone(980, 0.025, 'square', 0.025);
    setTimeout(() => el.classList.remove('is-glitching'), 700);
  };

  return (
    <section className="relative pt-[120px] pb-16 px-4 sm:px-8 max-w-[1200px] mx-auto min-h-[85vh] flex flex-col justify-center">
      {/* Console Panel */}
      <div className="relative bg-[#141b2a]/66 border border-[#232e45] backdrop-blur-[10px] p-6 sm:p-12 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] before:content-[''] before:absolute before:-top-[1px] before:-left-[1px] before:w-2 before:h-2 before:border-t before:border-l before:border-[#5fe0ff] after:content-[''] after:absolute after:-bottom-[1px] after:-right-[1px] after:w-2 after:h-2 after:border-b after:border-r after:border-[#5fe0ff]">
        {/* Panel Tag */}
        <div className="flex items-center gap-2 pb-3 mb-6 sm:mb-8 border-b border-[#232e45] font-mono text-[10.5px] tracking-[0.3em] text-[#a3b4d4]">
          <span className="w-1.5 h-1.5 bg-[#5fe0ff] shadow-[0_0_6px_#5fe0ff] inline-block" />
          <span>CONSOLE.ONLINE // READY</span>
          <span className="ml-auto text-[#7f90b4]">PORTFOLIO.2026</span>
        </div>

        {/* Eyebrow */}
        <p className="font-mono text-xs sm:text-sm tracking-[0.28em] text-[#5fe0ff] mb-4">
          &laquo; AI.VIDEO.AUTOMATION.SPECIALIST
        </p>

        {/* Glitch Title */}
        <h1 className="font-mono text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.14em] text-[#eaf1ff] uppercase leading-tight mb-6">
          <span
            ref={(el) => { glitchRefs.current[0] = el; }}
            data-text="AUTONOMOUS VIDEO &"
            onPointerEnter={(e) => triggerGlitch(e.currentTarget)}
            className="glitch block cursor-crosshair"
          >
            AUTONOMOUS VIDEO &amp;
          </span>
          <span
            ref={(el) => { glitchRefs.current[1] = el; }}
            data-text="CREATIVE PIPELINES"
            onPointerEnter={(e) => triggerGlitch(e.currentTarget)}
            className="glitch block text-[#5fe0ff] cursor-crosshair"
          >
            CREATIVE PIPELINES
          </span>
        </h1>

        {/* Lede Paragraph */}
        <p className="text-base sm:text-lg text-[#c3d0e8] max-w-3xl leading-relaxed mb-8 font-light">
          I design, engineer, and ship automated AI video pipelines, high-conversion commercial UGC engines, and agentic workflows.
          I don't just generate renders — I architect repeatable production infrastructure that scales video from prompt to broadcast delivery.
        </p>

        {/* Action Buttons & Terminal Meta */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-[#232e45]">
          <button
            type="button"
            onClick={() => {
              playTone(740, 0.05, 'square', 0.05);
              onViewWork();
            }}
            onPointerEnter={() => playTone(950, 0.02, 'sine', 0.02)}
            className="px-6 py-3 bg-[#5fe0ff]/10 border border-[#5fe0ff] text-[#5fe0ff] hover:bg-[#5fe0ff] hover:text-[#04060b] font-mono text-xs tracking-[0.24em] transition-all cursor-pointer font-semibold shadow-[0_0_15px_rgba(95,224,255,0.2)]"
          >
            VIEW PROJECTS &darr;
          </button>

          <button
            type="button"
            onClick={() => {
              playTone(840, 0.05, 'square', 0.05);
              onOpenContact();
            }}
            onPointerEnter={() => playTone(1050, 0.02, 'sine', 0.02)}
            className="px-6 py-3 border border-[#33415f] hover:border-[#a3b4d4] text-[#a3b4d4] hover:text-[#eaf1ff] font-mono text-xs tracking-[0.24em] transition-all cursor-pointer"
          >
            INITIATE WORKFLOW &rarr;
          </button>

          <div className="ml-auto hidden sm:flex items-center gap-3 font-mono text-[10px] tracking-[0.26em] text-[#7f90b4]">
            <span>COMFYUI</span>
            <em>/</em>
            <span>RUNWAY GEN-3</span>
            <em>/</em>
            <span>N8N AGENTS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
