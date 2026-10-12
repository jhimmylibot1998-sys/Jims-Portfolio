import { useEffect, useState } from 'react';

export function TechNoirHud() {
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    function updateScroll() {
      const scrollH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollH > 0 ? Math.min(100, Math.max(0, Math.round((window.scrollY / scrollH) * 100))) : 0;
      setScrollPct(pct);
    }

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40" aria-hidden="true">
      {/* 4 Corner Crosshairs */}
      <span className="absolute top-3.5 left-3.5 w-5 h-5 border-t border-l border-[#33415f] opacity-80" />
      <span className="absolute top-3.5 right-3.5 w-5 h-5 border-t border-r border-[#33415f] opacity-80" />
      <span className="absolute bottom-3.5 left-3.5 w-5 h-5 border-b border-l border-[#33415f] opacity-80" />
      <span className="absolute bottom-3.5 right-3.5 w-5 h-5 border-b border-r border-[#33415f] opacity-80" />

      {/* Left Vertical Rail */}
      <div className="hidden lg:flex absolute top-1/2 left-3.5 -translate-y-1/2 -rotate-90 origin-left items-center gap-3 font-mono text-[9px] tracking-[0.36em] text-[#33405d] select-none whitespace-nowrap">
        <span>LIBOT.DESIGN</span>
        <span className="text-[#5fe0ff]">///</span>
        <span>AI VIDEO ARCHITECT</span>
        <span className="text-[#33415f]">EST.2024</span>
      </div>

      {/* Right Vertical Rail with Dynamic Scroll Percentage */}
      <div className="hidden lg:flex absolute top-1/2 right-3.5 -translate-y-1/2 rotate-90 origin-right items-center gap-3 font-mono text-[9px] tracking-[0.36em] text-[#5fe0ff] select-none whitespace-nowrap">
        <span className="text-[#7f90b4]">SCROLL</span>
        <span className="font-bold">{String(scrollPct).padStart(3, '0')}%</span>
        <span className="inline-block w-8 h-[1px] bg-[#5fe0ff]/50" />
      </div>
    </div>
  );
}
