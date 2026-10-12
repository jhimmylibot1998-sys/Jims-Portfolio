import { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, SlidersHorizontal } from 'lucide-react';

interface NavbarProps {
  initials: string;
  name: string;
  onOpenContact: () => void;
  onToggleEdit: () => void;
  isEditOpen: boolean;
  onNavigateHome?: (sectionHash?: string) => void;
  isSubpage?: boolean;
}

export function Navbar({
  initials,
  name,
  onOpenContact,
  onToggleEdit,
  isEditOpen,
  onNavigateHome,
  isSubpage = false,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Selected Work', href: '#work' },
    { label: 'Capabilities', href: '#services' },
    { label: 'Process Ledger', href: '#process' },
    { label: 'Studio Profile', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (isSubpage && onNavigateHome) {
      onNavigateHome(href);
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isSubpage && onNavigateHome) {
      onNavigateHome();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
        scrolled
          ? 'bg-[#F2EFE7]/95 backdrop-blur-md border-b border-[#D5D0C6] py-3.5 shadow-xs'
          : 'bg-[#F2EFE7] border-b border-[#D5D0C6] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
        {/* Zone 1: Wordmark with authentic editorial masthead styling */}
        <a
          href="/"
          onClick={handleLogoClick}
          className="flex items-baseline gap-3 group focus:outline-none cursor-pointer shrink-0"
        >
          <span className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#191919] group-hover:text-[#D65335] transition-colors">
            {name || 'Jimmy Libot'}
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] tracking-widest uppercase text-[#77756F]">
            / PRODUCTION JOURNAL
          </span>
        </a>

        {/* Zone 2: 4-5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-mono tracking-wider uppercase text-[#77756F]">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="hover:text-[#191919] hover:underline decoration-[#D65335] underline-offset-8 transition-colors duration-150 py-1 focus:outline-none cursor-pointer whitespace-nowrap shrink-0"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + subtle customizer trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleEdit}
            title={isEditOpen ? 'Close field notebook config' : 'Edit portfolio data'}
            className={`p-2 text-xs font-mono border transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer ${
              isEditOpen
                ? 'bg-[#191919] text-[#F2EFE7] border-[#191919]'
                : 'text-[#77756F] hover:text-[#191919] bg-[#FAF8F5] hover:bg-[#EAE6DC] border-[#D5D0C6]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden lg:inline text-[11px] uppercase tracking-wider">Editor</span>
          </button>

          <button
            onClick={onOpenContact}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-wider uppercase text-[#F2EFE7] bg-[#191919] hover:bg-[#D65335] transition-colors duration-150 whitespace-nowrap cursor-pointer shadow-xs active:translate-y-px"
          >
            <span>Initiate Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 bg-[#FAF8F5] border border-[#D5D0C6] text-[#191919] hover:bg-[#EAE6DC] focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#D5D0C6] px-6 py-6 space-y-4 animate-in fade-in duration-150">
          <div className="flex flex-col space-y-3 font-mono text-xs uppercase tracking-wider text-[#77756F]">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-left text-sm py-2 border-b border-[#D5D0C6] text-[#191919] hover:text-[#D65335] cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-3 text-center text-xs font-mono tracking-wider uppercase text-[#F2EFE7] bg-[#191919] hover:bg-[#D65335] transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Initiate Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
