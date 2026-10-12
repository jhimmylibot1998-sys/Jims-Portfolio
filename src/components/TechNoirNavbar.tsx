import { useState, useEffect } from 'react';
import { playTone, setAmbienceActive } from '../lib/soundEngine';

interface TechNoirNavbarProps {
  onOpenContact: () => void;
  onNavigateHome: (hash?: string) => void;
  isSubpage?: boolean;
}

export function TechNoirNavbar({ onOpenContact, onNavigateHome, isSubpage = false }: TechNoirNavbarProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalH > 0 ? (window.scrollY / totalH) * 100 : 0;
      setScrollProgress(progress);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    setAmbienceActive(!nextState);
    playTone(nextState ? 420 : 760, 0.06, 'square', 0.05);
  };

  const navLinks = [
    { label: 'DOSSIER', href: '#profile' },
    { label: 'PROJECTS', href: '#work' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'CAPABILITIES', href: '#stack' },
    { label: 'EQUIPMENT', href: '#equipment' },
    { label: "LET'S CHAT", href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    playTone(880, 0.03, 'sine', 0.03);
    setIsMobileMenuOpen(false);
    if (isSubpage) {
      onNavigateHome(href);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center h-14 px-4 sm:px-8 bg-[#080c15]/90 backdrop-blur-md border-b border-[#232e45] text-[#c3d0e8] select-none">
      {/* Brand Logo & Name */}
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          onNavigateHome('#top');
        }}
        onPointerEnter={() => playTone(980, 0.02, 'square', 0.02)}
        className="flex items-center gap-2.5 font-mono text-xs tracking-[0.22em] text-[#eaf1ff] hover:text-[#5fe0ff] transition-colors focus:outline-none"
      >
        <svg className="w-6 h-6 flex-none" viewBox="0 0 48 48" aria-hidden="true">
          <circle className="fill-none stroke-[#a3b4d4] stroke-[1.8]" cx="24" cy="24" r="20" />
          <path className="fill-none stroke-[#5fe0ff] stroke-[2.2]" d="M30.5 19.2 H18.7 V24" />
          <path className="fill-none stroke-[#5fe0ff] stroke-[2.2]" d="M17.5 28.8 H29.3 V24" />
          <path className="fill-none stroke-[#5fe0ff] stroke-[2.2]" d="M17.5 24 H30.5" />
        </svg>
        <span className="font-semibold tracking-[0.28em]">
          LIBOT<i className="not-italic text-[#7f90b4]">.AI</i>
          <span className="text-[#5fe0ff] ml-1">///</span>
        </span>
      </a>

      {/* Center/Right Nav Links */}
      <nav className="hidden md:flex items-center gap-6 lg:gap-8 ml-auto font-mono text-[11px] tracking-[0.24em]">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick(link.href);
            }}
            onPointerEnter={() => playTone(1100, 0.02, 'sine', 0.02)}
            className="text-[#7f90b4] hover:text-[#eaf1ff] py-2 relative group transition-colors focus:outline-none"
          >
            {link.label}
            <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#5fe0ff] group-hover:w-full transition-all duration-300" />
          </a>
        ))}
      </nav>

      {/* Audio Synthesizer Ambience Toggle */}
      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={!isMuted}
        aria-label="Ambient sound toggle"
        className="flex items-center gap-1.5 ml-4 sm:ml-6 px-3 py-1.5 border border-[#232e45] hover:border-[#5fe0ff] bg-[#0d1320]/60 font-mono text-[9px] tracking-[0.22em] transition-all cursor-pointer focus:outline-none"
      >
        <span className="flex items-end gap-[2px] h-3">
          <i
            className={`w-[2px] bg-[#5fe0ff] transition-all ${
              !isMuted ? 'h-3 animate-pulse' : 'h-1.5 opacity-40'
            }`}
          />
          <i
            className={`w-[2px] bg-[#5fe0ff] transition-all ${
              !isMuted ? 'h-2 animate-bounce' : 'h-1 opacity-40'
            }`}
          />
          <i
            className={`w-[2px] bg-[#5fe0ff] transition-all ${
              !isMuted ? 'h-3.5 animate-pulse' : 'h-2 opacity-40'
            }`}
          />
          <i
            className={`w-[2px] bg-[#5fe0ff] transition-all ${
              !isMuted ? 'h-2.5 animate-bounce' : 'h-1 opacity-40'
            }`}
          />
        </span>
        <span className={!isMuted ? 'text-[#5fe0ff]' : 'text-[#7f90b4]'}>
          {!isMuted ? 'AMBIENCE.LIVE' : 'AMBIENCE.MUTE'}
        </span>
      </button>

      {/* Mobile Menu Hamburger */}
      <button
        type="button"
        onClick={() => {
          setIsMobileMenuOpen((prev) => !prev);
          playTone(800, 0.04, 'square', 0.04);
        }}
        aria-expanded={isMobileMenuOpen}
        aria-label="Menu"
        className="md:hidden flex flex-col gap-1 ml-3 p-2 focus:outline-none cursor-pointer"
      >
        <span
          className={`block w-5 h-[1.5px] bg-[#a3b4d4] transition-all duration-300 ${
            isMobileMenuOpen ? 'rotate-45 translate-y-[5.5px]' : ''
          }`}
        />
        <span
          className={`block w-5 h-[1.5px] bg-[#a3b4d4] transition-all duration-200 ${
            isMobileMenuOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-5 h-[1.5px] bg-[#a3b4d4] transition-all duration-300 ${
            isMobileMenuOpen ? '-rotate-45 -translate-y-[5.5px]' : ''
          }`}
        />
      </button>

      {/* Progress Line beneath navbar */}
      <div className="absolute left-0 right-0 bottom-0 h-[1px] bg-transparent">
        <div
          className="h-full bg-[#5fe0ff] transition-all duration-100 shadow-[0_0_8px_#5fe0ff]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-14 left-0 right-0 bg-[#080c15]/98 border-b border-[#232e45] p-6 flex flex-col gap-4 font-mono text-xs tracking-[0.24em] animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className="text-[#a3b4d4] hover:text-[#5fe0ff] py-2 border-b border-[#232e45]/50"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
