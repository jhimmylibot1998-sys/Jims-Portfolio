import { ArrowUpRight } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectCardProps {
  project: ProjectItem;
  index?: number;
  onSelect: () => void;
  badgeText?: string;
}

export function ProjectCard({
  project,
  index = 0,
  onSelect,
  badgeText,
}: ProjectCardProps) {
  return (
    <article
      onClick={onSelect}
      className="group relative flex flex-col bg-[#FAF8F5] border border-[#D5D0C6] hover:border-[#191919] transition-all duration-200 cursor-pointer w-full p-5 sm:p-7 film-frame shadow-xs"
    >
      {/* Top Folio Strip */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#D5D0C6] font-mono text-[10px] tracking-wider uppercase text-[#77756F]">
        <div className="flex items-center gap-2.5">
          <span className="text-[#D65335] font-semibold">PLATE 0{index + 1}</span>
          <span className="text-[#D5D0C6]">/</span>
          <span>{project.category}</span>
        </div>
        
        <div className="flex items-center gap-2">
          {badgeText && (
            <span className="text-[#D65335] border border-[#D65335] px-1.5 py-0.2 text-[9px] font-semibold">
              {badgeText}
            </span>
          )}
          <span className="text-[#191919]">{project.year}</span>
        </div>
      </div>

      {/* Media Image Plate with Film Framing */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#EAE6DC] border border-[#D5D0C6] group-hover:border-[#191919] transition-colors duration-200">
        <img
          src={project.image}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter grayscale-[15%] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-500"
        />

        {/* Film edge technical markings */}
        <div className="absolute top-2 left-2 pointer-events-none font-mono text-[9px] tracking-widest text-[#F2EFE7] bg-black/60 px-1.5 py-0.5">
          {project.duration || 'MASTER // 4K'}
        </div>

        {/* Hover inspection prompt */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 backdrop-blur-xs">
          <div className="px-3.5 py-1.5 bg-[#F2EFE7] text-[#191919] border border-[#191919] font-mono text-[11px] tracking-wider uppercase flex items-center gap-2 shadow-sm">
            <span>Read Field Dossier</span>
            <ArrowUpRight className="w-3 h-3 text-[#D65335]" />
          </div>
        </div>
      </div>

      {/* Editorial Content Block */}
      <div className="pt-5 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#77756F]">
            {project.client && (
              <>
                <span className="text-[#191919]">{project.client}</span>
                <span>·</span>
              </>
            )}
            <span>{project.duration || 'Production Case'}</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-[1.75rem] font-normal leading-snug text-[#191919] group-hover:text-[#D65335] transition-colors flex items-start justify-between gap-3">
            <span>{project.title}</span>
            <ArrowUpRight className="w-4 h-4 text-[#77756F] group-hover:text-[#D65335] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 mt-1.5" />
          </h3>

          <p className="text-sm text-[#55534E] leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Tools and Pipeline Marginalia */}
        <div className="pt-4 border-t border-[#D5D0C6] flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-[#77756F]">
          <div className="flex flex-wrap items-center gap-1.5">
            {project.tools.slice(0, 3).map((tool, i) => (
              <span key={tool} className="text-[#191919]">
                {tool}
                {i < Math.min(project.tools.length, 3) - 1 && <span className="text-[#77756F] ml-1.5">/</span>}
              </span>
            ))}
            {project.tools.length > 3 && (
              <span className="text-[#77756F]">+{project.tools.length - 3}</span>
            )}
          </div>

          <span className="text-[#D65335] font-semibold text-[10px] uppercase tracking-wider">
            VIEW DOSSIER →
          </span>
        </div>
      </div>
    </article>
  );
}
