import { useState } from 'react';
import { ArrowUpRight, FolderOpen, Layers } from 'lucide-react';
import { ProjectItem } from '../types';
import { CategoryInfo } from '../lib/projectRegistry';
import { ProjectCard } from './ProjectCard';

interface FeaturedWorkProps {
  categories: CategoryInfo[];
  onSelectProject: (project: ProjectItem) => void;
  onNavigateCategory: (categorySlug: string) => void;
}

export function FeaturedWork({
  categories,
  onSelectProject,
  onNavigateCategory,
}: FeaturedWorkProps) {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>(
    () => categories[0]?.slug || 'ai-video'
  );

  const activeCategory =
    categories.find((c) => c.slug === selectedCategorySlug) ||
    categories[0];

  if (!activeCategory) {
    return null;
  }

  const featuredProject = activeCategory.featuredProject;
  const alternateProjects = activeCategory.projects.filter(
    (p) => p.id !== featuredProject.id
  );

  return (
    <section id="work" className="py-20 md:py-28 bg-[#F2EFE7] border-b border-[#D5D0C6]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header with Editorial Broadside Title */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[#D5D0C6]">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3 font-mono text-[11px] tracking-widest uppercase text-[#77756F]">
              <span className="w-2 h-2 bg-[#D65335]" />
              <span>ARCHIVE VOLUME 2026</span>
              <span className="text-[#D5D0C6]">/</span>
              <span>SELECTED MASTER PRODUCTION</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#191919] font-normal tracking-tight">
              Featured Work
            </h2>

            <p className="text-base text-[#55534E] leading-relaxed">
              Explore the lead production dossier below. Each category in the creative journal maintains its own complete project library of deliverables, process breakdown notes, and render specs.
            </p>
          </div>

          {/* Category Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#FAF8F5] border border-[#D5D0C6]">
            {categories.map((cat) => {
              const isActive = cat.slug === activeCategory.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategorySlug(cat.slug)}
                  className={`px-3.5 py-2 font-mono text-xs tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#191919] text-[#F2EFE7] font-medium shadow-xs'
                      : 'text-[#77756F] hover:text-[#191919] hover:bg-[#EAE6DC]'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] ${
                      isActive ? 'text-[#D65335]' : 'text-[#77756F]'
                    }`}
                  >
                    ({cat.count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ONE Featured Project Showcase */}
        <div className="space-y-8">
          {/* Header of Active Category */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D5D0C6]">
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-[#77756F]">
              <span className="text-[#D65335] font-semibold">
                FEATURED IN:
              </span>
              <span className="text-[#191919] font-medium">
                {activeCategory.name}
              </span>
              <span className="text-[#D5D0C6]">·</span>
              <span>{activeCategory.count} Productions in Library</span>
            </div>

            <button
              onClick={() => onNavigateCategory(activeCategory.slug)}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#D65335] hover:text-[#191919] hover:underline underline-offset-4 cursor-pointer transition-colors"
            >
              <span>Open Complete {activeCategory.name} Library ({activeCategory.count})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Primary Featured Project Card Plate */}
          <div className="w-full">
            <ProjectCard
              project={featuredProject}
              index={0}
              badgeText="Featured Production"
              onSelect={() => onSelectProject(featuredProject)}
            />
          </div>

          {/* Also in this library sub-strip */}
          {alternateProjects.length > 0 && (
            <div className="pt-2 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-[#77756F] border-b border-[#D5D0C6]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[#191919] font-medium uppercase text-[11px]">
                  Also in {activeCategory.name}:
                </span>
                {alternateProjects.map((alt) => (
                  <button
                    key={alt.id}
                    onClick={() => onSelectProject(alt)}
                    className="hover:text-[#D65335] hover:underline underline-offset-4 cursor-pointer text-left"
                  >
                    {alt.title} ({alt.year})
                  </button>
                ))}
              </div>

              <button
                onClick={() => onNavigateCategory(activeCategory.slug)}
                className="text-[#D65335] hover:text-[#191919] hover:underline underline-offset-4 cursor-pointer shrink-0 inline-flex items-center gap-1.5"
              >
                <span>View All ({activeCategory.count})</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Scalable Category Library Index Cards */}
        <div className="pt-8 space-y-6">
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-[#77756F]">
            <div className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-[#D65335]" />
              <span className="text-[#191919] font-medium">Browse All Category Libraries</span>
            </div>
            <span>{categories.length} Specialized Archives</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat, idx) => {
              const isCurrent = cat.slug === activeCategory.slug;
              return (
                <div
                  key={cat.slug}
                  onClick={() => onNavigateCategory(cat.slug)}
                  className={`p-5 bg-[#FAF8F5] border transition-all cursor-pointer flex flex-col justify-between gap-6 group ${
                    isCurrent
                      ? 'border-[#191919] shadow-xs'
                      : 'border-[#D5D0C6] hover:border-[#191919]'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase text-[#77756F]">
                      <span className="text-[#D65335] font-semibold">SECTION 0{idx + 1}</span>
                      <span>{cat.count} {cat.count === 1 ? 'Production' : 'Productions'}</span>
                    </div>

                    <h4 className="font-serif text-xl text-[#191919] group-hover:text-[#D65335] transition-colors leading-snug">
                      {cat.name}
                    </h4>

                    <p className="text-xs text-[#55534E] line-clamp-2">
                      Lead: {cat.featuredProject.title} ({cat.featuredProject.year})
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#D5D0C6] flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[#77756F] group-hover:text-[#191919]">
                    <span>Enter Library</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#D65335] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
