import { useState } from 'react';
import { ProjectItem } from '../types';
import { playTone } from '../lib/soundEngine';

interface TechNoirWorkProps {
  projects?: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

const DEFAULT_TIMELINES: Record<string, { phase: string; duration: string; details: string }[]> = {
  'ai-video': [
    { phase: 'Latent Prompt Architecture', duration: 'Phase 01', details: 'Structuring positive/negative conditioning, dynamic camera trajectories, and seed locking.' },
    { phase: 'Runway / Kling Synthesis', duration: 'Phase 02', details: 'Rendering multi-pass temporal keyframes with optical flow consistency and sub-frame pacing.' },
    { phase: '4K Upscaling & Topaz Pass', duration: 'Phase 03', details: 'Neural frame enhancement, chromatic aberration recovery, and organic 35mm grain matching.' },
    { phase: 'DaVinci Resolve Mastering', duration: 'Phase 04', details: 'ACES color transform, macro audio spatialization, and broadcast export encoding.' },
  ],
  'ugc-commercial': [
    { phase: 'Creator Persona Synthesis', duration: 'Phase 01', details: 'Synthesizing natural lighting conditions, creator voice timbre, and authentic cadence.' },
    { phase: 'Facial Motion Keyframing', duration: 'Phase 02', details: 'Temporal lip-sync mapping, micro-expressions, and natural eye contact pacing.' },
    { phase: 'Hook & Variant Cut Generation', duration: 'Phase 03', details: 'Producing multiple high-energy 3-second opening variations for paid performance tests.' },
    { phase: 'Vertical Omnichannel Export', duration: 'Phase 04', details: '9:16 high-bitrate encoding with synced kinetic typography captions.' },
  ],
  'ecommerce-product-demo': [
    { phase: 'Photorealistic CAD / Mesh Ingest', duration: 'Phase 01', details: 'Preparing reference geometry, lighting environment textures, and product angle maps.' },
    { phase: 'Kinetic Movement & Fluid Pass', duration: 'Phase 02', details: 'Generative fluid surface tension simulation and exploded mechanical assembly motions.' },
    { phase: 'High-Resolution Frame Upscale', duration: 'Phase 03', details: 'Preserving fine branding logos, micro-engravings, and caustic reflections.' },
    { phase: 'Amazon & DTC Delivery', duration: 'Phase 04', details: 'Multi-variant cutdowns optimized for high conversion rate and add-to-cart metrics.' },
  ],
  'intelligent-automation': [
    { phase: 'Webhook & Ingestion Pipeline', duration: 'Phase 01', details: 'Connecting Typeform briefs, Google Drive staging buckets, and instant n8n triggers.' },
    { phase: 'Gemini LLM Synthesis Engine', duration: 'Phase 02', details: 'Extracting video narrative beats, generating automated shotlists, and metadata tags.' },
    { phase: 'Autonomous Video Render Cluster', duration: 'Phase 03', details: 'API-driven batch rendering across Runway Gen-3 and ElevenLabs endpoints.' },
    { phase: 'Omnichannel Cloud Deployment', duration: 'Phase 04', details: 'Automated publishing to YouTube, TikTok, and Frame.io client approval dashboards.' },
  ],
};

export function TechNoirWork({ projects = [], onSelectProject }: TechNoirWorkProps) {
  // Track active project index for the horizontal blueprint viewer
  const [activeIndex, setActiveIndex] = useState(0);
  // Track active step for each project's interactive blueprint story
  const [activeSteps, setActiveSteps] = useState<Record<string, number>>({});

  const safeProjects = Array.isArray(projects) && projects.length > 0 ? projects : [];
  const activeProj = safeProjects[activeIndex] || safeProjects[0];

  const handleStepHover = (projId: string, stepIdx: number) => {
    setActiveSteps((prev) => ({ ...prev, [projId]: stepIdx }));
    playTone(900 + stepIdx * 120, 0.025, 'square', 0.03);
  };

  const handleCardClick = (project: ProjectItem) => {
    playTone(1050, 0.05, 'square', 0.05);
    onSelectProject(project);
  };

  if (!activeProj) {
    return null;
  }

  // Safely extract project attributes with reliable fallbacks
  const projectTools = (activeProj.tools && activeProj.tools.length > 0)
    ? activeProj.tools
    : (activeProj.toolsUsed && activeProj.toolsUsed.length > 0)
    ? activeProj.toolsUsed
    : ['Runway Gen-3', 'Midjourney v6', 'ComfyUI', 'DaVinci Resolve'];

  const categorySlug = activeProj.categorySlug || 'ai-video';
  const defaultCategoryTimeline = DEFAULT_TIMELINES[categorySlug] || DEFAULT_TIMELINES['ai-video'];
  const projectTimeline = (activeProj.timeline && activeProj.timeline.length > 0)
    ? activeProj.timeline
    : defaultCategoryTimeline;

  const currentStepIdx = activeSteps[activeProj.id] ?? 0;
  const clampedStepIdx = Math.min(Math.max(0, currentStepIdx), projectTimeline.length - 1);
  const currentStep = projectTimeline[clampedStepIdx] || projectTimeline[0];

  const imageSrc = activeProj.image || activeProj.thumbnailUrl || '';
  const descriptionText = activeProj.description || activeProj.overview || activeProj.shortDescription || '';

  return (
    <section id="work" className="py-20 px-4 sm:px-8 max-w-[1200px] mx-auto select-none">
      {/* Section Header */}
      <div className="flex items-baseline gap-4 mb-4">
        <span className="font-mono text-xs tracking-[0.24em] text-[#5fe0ff]">02</span>
        <h2 className="font-mono text-2xl sm:text-3xl font-bold tracking-[0.18em] text-[#eaf1ff] uppercase">
          PROJECTS // INTERACTIVE BLUEPRINTS
        </h2>
        <span className="flex-1 h-[1px] bg-gradient-to-r from-[#33415f] to-transparent ml-2" />
      </div>

      <p className="font-mono text-xs tracking-[0.2em] text-[#7f90b4] mb-8">
        HOVER A TIMELINE STEP FOR DEEP WORKFLOW STORY // CLICK TO OPEN FULL CASE STUDY &amp; VIDEO
      </p>

      {/* Project Switcher Tabs (Band Index) */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-[#232e45] pb-4">
        {safeProjects.map((proj, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <button
              key={proj.id || idx}
              type="button"
              onClick={() => {
                setActiveIndex(idx);
                playTone(750 + idx * 60, 0.04, 'square', 0.04);
              }}
              onPointerEnter={() => playTone(980, 0.015, 'sine', 0.02)}
              className={`px-4 py-2 font-mono text-xs tracking-[0.22em] border transition-all cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? 'bg-[#5fe0ff]/15 border-[#5fe0ff] text-[#5fe0ff] shadow-[0_0_12px_rgba(95,224,255,0.25)]'
                  : 'bg-[#141b2a]/40 border-[#232e45] text-[#7f90b4] hover:border-[#33415f] hover:text-[#c3d0e8]'
              }`}
            >
              <span className="text-[10px] opacity-75">PRJ.{String(idx + 1).padStart(2, '0')}</span>
              <span className="font-semibold">{proj.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Blueprint Band */}
      <article className="bg-[#141b2a]/66 border border-[#232e45] backdrop-blur-[10px] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] relative before:content-[''] before:absolute before:-top-[1px] before:-left-[1px] before:w-2 before:h-2 before:border-t before:border-l before:border-[#5fe0ff] after:content-[''] after:absolute after:-bottom-[1px] after:-right-[1px] after:w-2 after:h-2 after:border-b after:border-r after:border-[#5fe0ff]">
        {/* Top Panel Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-[#232e45] font-mono text-[10.5px] tracking-[0.28em] text-[#a3b4d4] bg-gradient-to-r from-[#283652]/40 to-transparent">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-[#5fe0ff] inline-block shadow-[0_0_6px_#5fe0ff]" />
            <span className="text-[#5fe0ff]">PRJ.{String(activeIndex + 1).padStart(3, '0')}</span>
            <span>// {activeProj.category.toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-4 text-[#7f90b4]">
            <span>DURATION: {activeProj.duration || '14 DAYS'}</span>
            <span>CLIENT: {activeProj.client || 'CONFIDENTIAL'}</span>
          </div>
        </div>

        {/* Cinematic Frame Preview with Scanline & Hover Glint */}
        <figure
          onClick={() => handleCardClick(activeProj)}
          className="relative aspect-[16/8] sm:aspect-[21/9] w-full overflow-hidden bg-[#080c15] border-b border-[#232e45] cursor-pointer group"
        >
          {imageSrc && (
            <img
              src={imageSrc}
              alt={activeProj.title}
              className="w-full h-full object-cover filter brightness-90 contrast-110 transition-all duration-700 group-hover:scale-105 group-hover:brightness-100"
            />
          )}
          {/* Scanline diagonal animation */}
          <span className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-[#5fe0ff]/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

          {/* Cyan HUD Overlay in Image Corner */}
          <div className="absolute top-3 right-3 px-3 py-1 bg-[#080c15]/80 backdrop-blur-sm border border-[#232e45] font-mono text-[9px] tracking-[0.24em] text-[#5fe0ff] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5fe0ff] animate-ping" />
            <span>CLICK TO EXPAND BLUEPRINT</span>
          </div>

          {/* Bottom Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#080c15] via-[#080c15]/80 to-transparent flex items-end justify-between">
            <div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#5fe0ff]">
                FEATURED PIPELINE
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-mono tracking-[0.14em] text-[#eaf1ff]">
                {activeProj.title}
              </h3>
            </div>
            <span className="font-mono text-xs tracking-[0.2em] text-[#5fe0ff] underline underline-offset-4">
              OPEN STUDY &rarr;
            </span>
          </div>
        </figure>

        {/* Interactive Blueprint Step Matrix */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <p className="text-sm sm:text-base text-[#c3d0e8] leading-relaxed mb-4">
              {descriptionText}
            </p>
          </div>

          {/* Step Ticks / Phase Bars (Sibaldesign Signature Blueprint) */}
          {projectTimeline && projectTimeline.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-[#232e45]">
              <div className="flex items-center justify-between font-mono text-[10.5px] tracking-[0.24em] text-[#a3b4d4]">
                <span>EXECUTION TIMELINE // MULTI-PHASE ARCHITECTURE</span>
                <span className="text-[#5fe0ff]">
                  STEP {String(clampedStepIdx + 1).padStart(2, '0')} / {String(projectTimeline.length).padStart(2, '0')}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {projectTimeline.map((step, sIdx) => {
                  const isStepActive = clampedStepIdx === sIdx;
                  return (
                    <div
                      key={step.phase || sIdx}
                      onPointerEnter={() => handleStepHover(activeProj.id, sIdx)}
                      className={`p-3 border font-mono transition-all cursor-pointer ${
                        isStepActive
                          ? 'bg-[#5fe0ff]/10 border-[#5fe0ff] text-[#eaf1ff] shadow-[0_0_10px_rgba(95,224,255,0.2)]'
                          : 'bg-[#0d1320] border-[#232e45] text-[#7f90b4] hover:border-[#33415f]'
                      }`}
                    >
                      <div className="flex justify-between items-center text-[9px] mb-1">
                        <span className={isStepActive ? 'text-[#5fe0ff]' : 'text-[#7f90b4]'}>
                          PHASE 0{sIdx + 1}
                        </span>
                        <span className="text-[8.5px] opacity-75">{step.duration}</span>
                      </div>
                      <p className="text-xs font-semibold tracking-wider truncate">
                        {step.phase}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Active Phase Deep Dive Story */}
              <div className="p-4 bg-[#0d1320]/80 border border-[#232e45] font-mono text-xs tracking-wider text-[#c3d0e8] flex items-start gap-3">
                <span className="text-[#5fe0ff] text-base leading-none">◤</span>
                <div>
                  <span className="text-[#5fe0ff] font-bold block mb-1">
                    {currentStep?.phase?.toUpperCase()} [{currentStep?.duration}]
                  </span>
                  <p className="text-[#a3b4d4] text-xs leading-relaxed font-sans">
                    {currentStep?.details ||
                      activeProj.promptEngineering ||
                      activeProj.solution ||
                      activeProj.overview ||
                      'Custom generative checkpoint orchestration, motion latent conditioning, and procedural color timing.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tools & Tech Tags */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#232e45]">
            <div className="flex flex-wrap gap-2">
              {projectTools.map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-1 bg-[#0d1320] border border-[#232e45] font-mono text-[10px] tracking-[0.16em] text-[#a3b4d4]"
                >
                  {tool}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleCardClick(activeProj)}
              className="px-5 py-2.5 bg-[#5fe0ff]/10 hover:bg-[#5fe0ff] text-[#5fe0ff] hover:text-[#04060b] border border-[#5fe0ff] font-mono text-xs tracking-[0.24em] font-bold transition-all cursor-pointer"
            >
              VIEW FULL BLUEPRINT &rarr;
            </button>
          </div>
        </div>
      </article>

      {/* Horizontal HUD Progress Rail for Projects */}
      <div className="flex items-center justify-between mt-8 font-mono text-[10px] tracking-[0.28em] text-[#7f90b4]">
        <div className="flex items-center gap-3">
          <span className="text-[#eaf1ff] font-bold">PRJ.{String(activeIndex + 1).padStart(2, '0')}</span>
          <span>/</span>
          <span>{String(safeProjects.length).padStart(2, '0')} TOTAL WORKFLOWS</span>
        </div>
        <div className="flex-1 max-w-xs mx-6 h-[1px] bg-[#232e45] relative">
          <div
            className="absolute left-0 top-0 bottom-0 bg-[#5fe0ff] transition-all duration-300"
            style={{ width: `${safeProjects.length > 0 ? ((activeIndex + 1) / safeProjects.length) * 100 : 0}%` }}
          />
        </div>
        <a
          href="#experience"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('experience');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="hover:text-[#5fe0ff] transition-colors"
        >
          SKIP TO EXPERIENCE &darr;
        </a>
      </div>
    </section>
  );
}
