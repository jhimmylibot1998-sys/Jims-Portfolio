import React, { useRef } from 'react';
import { ArrowDown, ArrowUpRight, Camera } from 'lucide-react';

interface HeroProps {
  eyebrow: string;
  heading1: string;
  heading2: string;
  heading3: string;
  heading4?: string;
  professionalTitle?: string;
  supportingText: string;
  availabilityText: string;
  portraitUrl: string;
  onViewWork: () => void;
  onContact: () => void;
  onUpdatePortrait: (url: string) => void;
}

export function Hero({
  supportingText,
  portraitUrl,
  onViewWork,
  onContact,
  onUpdatePortrait,
}: HeroProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onUpdatePortrait(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-[#F2EFE7] border-b border-[#D5D0C6]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Top Production Log Marker */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 md:mb-12 border-b border-[#D5D0C6] font-mono text-[11px] tracking-wider uppercase text-[#77756F]">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 bg-[#D65335]" />
            <span className="text-[#191919] font-medium">JIMMY LIBOT · FIELD LOG NO. 04</span>
            <span className="text-[#D5D0C6]">/</span>
            <span>AI VIDEO & WORKFLOW ARCHITECTURE</span>
          </div>
          <div className="flex items-center gap-4">
            <span>2026 EDITION</span>
            <span className="text-[#D5D0C6]">·</span>
            <span>AVAILABLE WORLDWIDE / REMOTE</span>
          </div>
        </div>

        {/* Asymmetrical 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Left Column: Expressive Editorial Typography & Context */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <span className="font-mono text-xs tracking-widest uppercase text-[#D65335] block">
                CREATIVE DIRECTION & AUTOMATION SYSTEMS
              </span>

              {/* Expressive Editorial Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.15rem] leading-[1.03] text-[#191919] font-normal tracking-tight text-balance">
                Directing <em className="italic font-normal">synthetic cinema</em>. Architecting <em className="italic font-normal">autonomous production</em>.
              </h1>

              {/* Concise rationale paragraph */}
              <p className="text-base sm:text-lg text-[#55534E] leading-relaxed max-w-xl font-normal">
                {supportingText ||
                  'I combine generative AI cinematography with intelligent multi-agent automation to help global studios and ambitious brands produce broadcast-caliber film content without traditional production friction.'}
              </p>
            </div>

            {/* Clear routes into the work */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onViewWork}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#191919] hover:bg-[#D65335] text-[#F2EFE7] font-mono text-xs uppercase tracking-wider transition-colors duration-150 cursor-pointer shadow-xs active:translate-y-px"
              >
                <span>Index of Selected Work</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onContact}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent hover:bg-[#EAE6DC] text-[#191919] border border-[#191919] font-mono text-xs uppercase tracking-wider transition-colors duration-150 cursor-pointer active:translate-y-px"
              >
                <span>Initiate Project Brief</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#D65335]" />
              </button>
            </div>

            {/* Small supporting labels: authentic production notes */}
            <div className="pt-8 border-t border-[#D5D0C6] grid grid-cols-2 sm:grid-cols-3 gap-6 font-mono text-[11px] text-[#77756F]">
              <div className="space-y-1">
                <span className="text-[#191919] block font-medium uppercase tracking-wider">PRIMARY ENGINES</span>
                <span>Runway Gen-3 · Kling · Gemini</span>
              </div>
              <div className="space-y-1">
                <span className="text-[#191919] block font-medium uppercase tracking-wider">ORCHESTRATION</span>
                <span>n8n · Make · Webhooks · LLMs</span>
              </div>
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[#191919] block font-medium uppercase tracking-wider">DELIVERY MASTER</span>
                <span>4K 60fps · ProRes & DCI Grading</span>
              </div>
            </div>

          </div>

          {/* Right Column: Authentic Production Contact Sheet Plate */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <div className="relative w-full max-w-md bg-[#FAF8F5] border border-[#D5D0C6] p-4 shadow-sm film-frame">
              
              {/* Contact Sheet Top Metadata Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-[#D5D0C6] font-mono text-[10px] tracking-wider uppercase text-[#77756F]">
                <div className="flex items-center gap-2">
                  <span className="text-[#D65335] font-semibold">FIG. 01</span>
                  <span>/ CONTACT FRAME</span>
                </div>
                <span>EXP. 2026 // D-LOG</span>
              </div>

              {/* Master visual image plate */}
              <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden my-3 bg-[#EAE6DC] border border-[#D5D0C6] group">
                <img
                  src={portraitUrl}
                  alt="Jimmy Libot - Creative Production Still"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 transition-all duration-500"
                />

                {/* Film frame corner tick marks */}
                <div className="absolute top-2 left-2 text-[10px] font-mono text-white/80 bg-black/40 px-1.5 py-0.5 pointer-events-none">
                  F/1.8 · 50MM
                </div>

                {/* Replace portrait/still affordance */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload replacement production still"
                  className="absolute bottom-3 right-3 p-2 bg-[#191919]/80 hover:bg-[#D65335] text-white transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Contact Sheet Bottom Caption */}
              <div className="pt-2 flex items-baseline justify-between font-mono text-[10px] text-[#77756F]">
                <div>
                  <span className="text-[#191919] font-medium uppercase tracking-wider block">JIMMY LIBOT</span>
                  <span>Creative Direction & Automated Workflows</span>
                </div>
                <span className="text-[#D65335] tracking-widest uppercase text-[9px] font-semibold">
                  VERIFIED DIRECT
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
