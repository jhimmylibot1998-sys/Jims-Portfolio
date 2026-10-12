import { useState } from 'react';
import { ChevronDown, ArrowUpRight, Check } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesProps {
  services: ServiceItem[];
  onSelectService: (serviceName: string) => void;
}

export function Services({ services, onSelectService }: ServicesProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-[#FAF8F5] border-b border-[#D5D0C6]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#D5D0C6]">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3 font-mono text-[11px] tracking-widest uppercase text-[#77756F]">
              <span className="w-2 h-2 bg-[#D65335]" />
              <span>CAPABILITIES REGISTER</span>
              <span className="text-[#D5D0C6]">/</span>
              <span>SIX COMMERCIAL PRACTICES</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#191919] font-normal tracking-tight">
              Production Capabilities
            </h2>

            <p className="text-base text-[#55534E] leading-relaxed">
              Every capability is engineered to eliminate creative friction—whether directing 4K cinematic video or connecting multi-tier webhook systems.
            </p>
          </div>

          <div className="font-mono text-xs text-[#77756F]">
            ENGAGEMENTS: <span className="text-[#191919] font-medium">CAMPAIGN-BASED & RETAINER ADVISORY</span>
          </div>
        </div>

        {/* 3-Column Ledger Grid separated by hairline borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#D5D0C6] mt-12 border border-[#D5D0C6]">
          {services.map((service, index) => {
            const isExpanded = expandedId === service.id;

            return (
              <div
                key={service.id}
                className="bg-[#FAF8F5] p-7 sm:p-8 flex flex-col justify-between hover:bg-[#F2EFE7] transition-colors duration-150 group"
              >
                <div className="space-y-4">
                  {/* Item index */}
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#77756F] uppercase tracking-wider">
                    <span className="text-[#D65335] font-semibold">CAPABILITY 0{index + 1}</span>
                    <span className="text-[#D5D0C6]">●</span>
                  </div>

                  {/* Title & Short description */}
                  <h3 className="font-serif text-2xl font-normal text-[#191919] leading-snug group-hover:text-[#D65335] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-[#55534E] leading-relaxed font-sans">
                    {service.shortDesc}
                  </p>

                  {/* Expandable scope & deliverables */}
                  {isExpanded && (
                    <div className="pt-4 border-t border-[#D5D0C6] space-y-4 animate-in fade-in duration-150">
                      <p className="text-xs text-[#55534E] leading-relaxed">
                        {service.fullDesc}
                      </p>

                      <div className="space-y-2">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#77756F] block">
                          SPECIFICATION & DELIVERABLES:
                        </span>
                        <ul className="space-y-1.5 font-sans text-xs text-[#191919]">
                          {service.deliverables.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#D65335] text-[11px] font-mono shrink-0">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {service.tools && (
                        <div className="pt-2">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#77756F] block mb-1">
                            CORE ENGINES:
                          </span>
                          <span className="font-mono text-[11px] text-[#191919]">
                            {service.tools.join(' · ')}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer action toggle & inquiry */}
                <div className="pt-6 mt-6 border-t border-[#D5D0C6] flex items-center justify-between font-mono text-xs">
                  <button
                    onClick={() => toggleExpand(service.id)}
                    className="text-[#77756F] hover:text-[#191919] transition-colors flex items-center gap-1.5 cursor-pointer focus:outline-none"
                  >
                    <span>{isExpanded ? 'Less' : 'Scope & Specs'}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-150 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <button
                    onClick={() => onSelectService(service.title)}
                    className="text-[#191919] hover:text-[#D65335] transition-colors flex items-center gap-1 cursor-pointer font-medium uppercase tracking-wider text-[11px]"
                  >
                    <span>Commission</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#D65335]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
