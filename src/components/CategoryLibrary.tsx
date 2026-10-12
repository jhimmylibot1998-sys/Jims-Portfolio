import { ArrowLeft } from 'lucide-react';
import { ProjectItem } from '../types';
import { CategoryInfo } from '../lib/projectRegistry';
import { ProjectCard } from './ProjectCard';

interface CategoryLibraryProps {
  currentCategory: CategoryInfo;
  allCategories: CategoryInfo[];
  onSelectProject: (project: ProjectItem) => void;
  onNavigateCategory: (categorySlug: string) => void;
  onBackToHome: () => void;
}

export function CategoryLibrary({
  currentCategory,
  allCategories,
  onSelectProject,
  onNavigateCategory,
  onBackToHome,
}: CategoryLibraryProps) {
  return (
    <div className="min-h-screen bg-[#F2EFE7] text-[#191919] pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 pb-8 border-b border-[#D5D0C6]">
          <button
            onClick={onBackToHome}
            className="group inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-[#77756F] hover:text-[#191919] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#D65335]" />
            <span>Return to Production Journal</span>
          </button>

          <div className="font-mono text-xs text-[#77756F] flex items-center gap-2">
            <span>INDEX // projects/{currentCategory.slug}</span>
          </div>
        </div>

        {/* Section Header with Category Title & Tabbed Archive Index */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 py-12 border-b border-[#D5D0C6]">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-widest uppercase text-[#77756F]">
              <span className="w-2 h-2 bg-[#D65335]" />
              <span>CATEGORY CATALOGUE</span>
              <span className="text-[#D5D0C6]">/</span>
              <span>{currentCategory.count} {currentCategory.count === 1 ? 'Production Recorded' : 'Productions Recorded'}</span>
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#191919] font-normal tracking-tight">
              {currentCategory.name} Archive
            </h1>
            
            <p className="text-base text-[#55534E] leading-relaxed">
              Complete contact sheets, render specifications, and operational delivery notes for all projects indexed under {currentCategory.name.toLowerCase()}.
            </p>
          </div>

          {/* Printed Index Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#FAF8F5] border border-[#D5D0C6] max-w-full overflow-x-auto">
            {allCategories.map((cat) => {
              const isActive = cat.slug === currentCategory.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => onNavigateCategory(cat.slug)}
                  className={`px-3.5 py-1.5 font-mono text-xs tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#191919] text-[#F2EFE7] font-medium'
                      : 'text-[#77756F] hover:text-[#191919] hover:bg-[#EAE6DC]'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] ${isActive ? 'text-[#D65335]' : 'text-[#77756F]'}`}>
                    ({cat.count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Grid Layout matching the exact Contact-Plate design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 pt-12">
          {currentCategory.projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              badgeText={project.featured ? 'Featured' : undefined}
              onSelect={() => onSelectProject(project)}
            />
          ))}
        </div>

        {/* Bottom Navigation footer */}
        <div className="mt-20 pt-10 border-t border-[#D5D0C6] flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#191919] hover:text-[#D65335] px-5 py-2.5 bg-[#FAF8F5] hover:bg-[#EAE6DC] border border-[#D5D0C6] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#D65335]" />
            <span>Return to Cover Page</span>
          </button>

          <div className="font-mono text-[11px] text-[#77756F]">
            Auto-synced repository path: <span className="text-[#191919]">projects/{currentCategory.slug}/</span>
          </div>
        </div>

      </div>
    </div>
  );
}
