import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Play,
  Upload,
  Film,
  Loader2,
  RefreshCw,
  AlertCircle,
  Clock,
  CheckCircle2,
  Cpu,
} from 'lucide-react';
import { ProjectItem } from '../types';
import { CategoryInfo } from '../lib/projectRegistry';

interface CaseStudyPageProps {
  project: ProjectItem;
  category: CategoryInfo;
  onBackToCategory: () => void;
  onBackToHome: () => void;
  onSelectProject: (project: ProjectItem) => void;
  onOpenInquiry: (projectName: string) => void;
  onUpdateVideo?: (projectId: string, videoUrl: string) => void;
}

export function CaseStudyPage({
  project,
  category,
  onBackToCategory,
  onBackToHome,
  onSelectProject,
  onOpenInquiry,
  onUpdateVideo,
}: CaseStudyPageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const hasVideo = Boolean(project.videoUrl);
    setIsPlayingVideo(hasVideo);
    setIsVideoLoading(hasVideo);
    setVideoError(false);
  }, [project]);

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdateVideo) {
      const blobUrl = URL.createObjectURL(file);
      onUpdateVideo(project.id, blobUrl);
      setIsPlayingVideo(true);
      setIsVideoLoading(true);
      setVideoError(false);
    }
  };

  const handleStartPlayback = () => {
    setIsPlayingVideo(true);
    setIsVideoLoading(true);
    setVideoError(false);
  };

  const handleRetryVideo = () => {
    setVideoError(false);
    setIsVideoLoading(true);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  };

  // Find previous and next projects in this category
  const currentIndex = category.projects.findIndex((p) => p.id === project.id);
  const prevProject =
    currentIndex > 0 ? category.projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < category.projects.length - 1
      ? category.projects[currentIndex + 1]
      : null;

  // Visual Timeline Steps based on project type
  const isAutomation =
    project.category.toLowerCase().includes('automation') ||
    project.categorySlug?.includes('automation');

  const timelineSteps = isAutomation
    ? [
        {
          stage: 'Phase 01',
          name: 'Payload Intake & Triage',
          duration: '< 1.2s',
          desc: 'Typeform / Webhook ingestion into autonomous reasoning model.',
        },
        {
          stage: 'Phase 02',
          name: 'Multimodal Synthesis & Parsing',
          duration: '3.4s avg',
          desc: 'Gemini 2.5 Flash extracts creative brief constraints and tagging.',
        },
        {
          stage: 'Phase 03',
          name: 'Relational Database Sync',
          duration: 'Immediate',
          desc: 'Airtable task record populated with automated status hooks.',
        },
        {
          stage: 'Phase 04',
          name: 'Autonomous Delivery & Alerting',
          duration: '< 500ms',
          desc: 'Slack alerts, staging links, and automated team notifications.',
        },
      ]
    : [
        {
          stage: 'Phase 01',
          name: 'Prompt Architecture & Concept Framing',
          duration: 'Day 01',
          desc: 'Keyframe generation, visual treatment, and camera trajectory scripting.',
        },
        {
          stage: 'Phase 02',
          name: 'Neural Video Diffusion Render',
          duration: 'Day 02',
          desc: 'Multi-pass rendering in Runway Gen-3 / Kling with custom LoRA consistency.',
        },
        {
          stage: 'Phase 03',
          name: 'Audio Mix & Voice Modeling',
          duration: 'Day 02',
          desc: 'ElevenLabs synthetic voice tracks and adaptive sound design mixing.',
        },
        {
          stage: 'Phase 04',
          name: '4K Upscaling & Cinema Grading',
          duration: 'Day 03',
          desc: 'Topaz Video AI 60fps grain grading and DaVinci Resolve color conform.',
        },
      ];

  return (
    <article className="min-h-screen bg-[#F2EFE7] text-[#191919] pt-28 pb-32">
      <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-12">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#D5D0C6] font-mono text-xs uppercase tracking-wider text-[#77756F]">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToHome}
              className="hover:text-[#191919] transition-colors cursor-pointer"
            >
              Cover
            </button>
            <span className="text-[#D5D0C6]">/</span>
            <button
              onClick={onBackToCategory}
              className="hover:text-[#191919] transition-colors cursor-pointer"
            >
              {category.name}
            </button>
            <span className="text-[#D5D0C6]">/</span>
            <span className="text-[#191919] font-medium">{project.title}</span>
          </div>

          <div className="flex items-center gap-3">
            {onUpdateVideo && (
              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#EAE6DC] text-[#191919] text-xs font-mono cursor-pointer transition-colors border border-[#D5D0C6]">
                <Upload className="w-3.5 h-3.5 text-[#D65335]" />
                <span className="hidden sm:inline">Attach Video File (.mp4)</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime"
                  className="hidden"
                  onChange={handleVideoFileChange}
                />
              </label>
            )}

            <button
              onClick={onBackToCategory}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#EAE6DC] text-[#191919] text-xs font-mono transition-colors cursor-pointer border border-[#D5D0C6]"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#D65335]" />
              <span>Back to Library</span>
            </button>
          </div>
        </div>

        {/* Project Header Info */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-[#77756F]">
            <span className="text-[#D65335] font-semibold">
              PLATE {project.number}
            </span>
            <span className="text-[#D5D0C6]">·</span>
            <span className="text-[#191919]">{project.category}</span>
            <span className="text-[#D5D0C6]">·</span>
            <span>{project.year}</span>
            {project.featured && (
              <>
                <span className="text-[#D5D0C6]">·</span>
                <span className="text-[#D65335] border border-[#D65335] px-1.5 py-0.2 text-[9px] font-semibold">
                  FEATURED LEAD PRODUCTION
                </span>
              </>
            )}
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#191919] font-normal tracking-tight">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-[#55534E] leading-relaxed max-w-3xl font-normal">
            {project.description}
          </p>
        </header>

        {/* Media visual showcase */}
        <div className="relative aspect-[16/9] w-full bg-[#141414] border border-[#2B2A27] overflow-hidden group shadow-md film-frame">
          {project.videoUrl && isPlayingVideo ? (
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              {/* Blurred poster background during video initialization for seamless visual continuity */}
              {isVideoLoading && project.image && (
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter blur-md brightness-40 scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60" />
                </div>
              )}

              {/* High-tech video preloader / buffering indicator */}
              {isVideoLoading && !videoError && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black/40 backdrop-blur-sm pointer-events-none transition-opacity duration-300">
                  <div className="relative flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full border border-[#D65335]/30 animate-ping absolute" />
                    <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-[#D65335] animate-spin" />
                    <Loader2 className="w-5 h-5 text-[#D65335] animate-spin absolute" />
                  </div>

                  <div className="flex flex-col items-center gap-1.5 text-center px-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-[#D65335] animate-pulse" />
                      <span className="text-xs font-mono tracking-widest uppercase text-white font-medium">
                        INITIALIZING VIDEO STREAM
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-white/70 tracking-wide">
                      Buffering 4K frames & media stream...
                    </span>
                  </div>
                </div>
              )}

              {/* Video playback failure fallback */}
              {videoError ? (
                <div className="relative z-10 flex flex-col items-center justify-center gap-3 p-6 text-center max-w-sm">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-white">Playback Error</div>
                    <p className="text-xs text-white/70 font-mono">
                      Unable to stream the video from the source URL.
                    </p>
                  </div>
                  <button
                    onClick={handleRetryVideo}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors cursor-pointer border border-white/10"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Retry Stream</span>
                  </button>
                </div>
              ) : (
                <video
                  ref={videoRef}
                  src={project.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  loop
                  onLoadStart={() => {
                    setIsVideoLoading(true);
                    setVideoError(false);
                  }}
                  onWaiting={() => setIsVideoLoading(true)}
                  onCanPlay={() => setIsVideoLoading(false)}
                  onLoadedData={() => setIsVideoLoading(false)}
                  onPlaying={() => setIsVideoLoading(false)}
                  onError={() => {
                    setIsVideoLoading(false);
                    setVideoError(true);
                  }}
                  className={`w-full h-full object-contain bg-black transition-opacity duration-500 relative z-[1] ${
                    isVideoLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                />
              )}
            </div>
          ) : (
            <div className="relative w-full h-full">
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Simulated cinematic player overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none">
                <div className="space-y-1 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D65335] bg-black/80 px-2 py-0.5 rounded-xs border border-white/10">
                    4K MASTER RENDER AVAILABLE
                  </span>
                  <div className="text-2xl sm:text-3xl font-serif font-normal text-white tracking-tight">
                    {project.title}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 pointer-events-auto">
                  {project.videoUrl ? (
                    <button
                      onClick={handleStartPlayback}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider bg-[#F2EFE7] hover:bg-white text-[#191919] font-medium shadow-md transition-colors cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-[#191919]" />
                      <span>Play Reel</span>
                    </button>
                  ) : onUpdateVideo ? (
                    <label className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-white/90 bg-black/70 hover:bg-black/90 px-3 py-1.5 rounded-xs border border-white/20 cursor-pointer transition-colors">
                      <Film className="w-3.5 h-3.5 text-[#D65335]" />
                      <span>{project.duration || 'Watch Reel'}</span>
                    </label>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Visual Project Timeline & Workflow Duration Indicator */}
        <section className="bg-[#FAF8F5] border border-[#D5D0C6] p-6 sm:p-8 space-y-6 film-frame">
          <div className="flex items-center justify-between pb-4 border-b border-[#D5D0C6]">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#77756F]">
              <Clock className="w-4 h-4 text-[#D65335]" />
              <span className="text-[#191919] font-medium">Production Timeline & Architecture Flow</span>
            </div>
            <div className="font-mono text-[11px] text-[#77756F]">
              Total Cycle: <span className="text-[#191919] font-medium">{project.duration || '24-72 Hours'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="space-y-2 relative">
                <div className="flex items-center justify-between font-mono text-[10px] text-[#77756F]">
                  <span className="text-[#D65335] font-semibold">{step.stage}</span>
                  <span className="bg-[#EAE6DC] px-1.5 py-0.5 text-[#191919]">{step.duration}</span>
                </div>
                <h4 className="font-serif text-base font-medium text-[#191919] leading-snug">
                  {step.name}
                </h4>
                <p className="text-xs text-[#55534E] leading-relaxed">
                  {step.desc}
                </p>
                {idx < timelineSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-2 text-[#D5D0C6] font-mono text-xs">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Content body and Details */}
        <div className="p-8 sm:p-10 bg-[#FAF8F5] border border-[#D5D0C6] space-y-10 film-frame">
          
          {/* Key Metrics (if available in project.json) */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 p-6 bg-[#F2EFE7] border border-[#D5D0C6]">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#77756F]">
                    {m.label}
                  </div>
                  <div className="font-serif text-3xl sm:text-4xl text-[#191919] font-normal tabular-nums">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Overview */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#77756F]">
              Production Overview & Brief
            </h2>
            <p className="text-base sm:text-lg text-[#55534E] leading-relaxed font-sans">
              {project.overview || project.description}
            </p>
          </div>

          {/* Challenge & Solution if present */}
          {(project.challenge || project.solution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#D5D0C6]">
              {project.challenge && (
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#D65335]">
                    The Challenge
                  </span>
                  <p className="text-sm text-[#55534E] leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
              )}
              {project.solution && (
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#191919]">
                    The AI Solution
                  </span>
                  <p className="text-sm text-[#55534E] leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tools & Neural Models */}
          {project.tools && project.tools.length > 0 && (
            <div className="space-y-3 pt-6 border-t border-[#D5D0C6]">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#77756F]">
                Neural Models & Generative Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="font-mono text-xs px-3 py-1.5 bg-[#F2EFE7] text-[#191919] border border-[#D5D0C6]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-6 border-t border-[#D5D0C6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="font-mono text-xs text-[#77756F] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#D65335]" />
              <span>{project.category} · {project.year}</span>
              {project.client && (
                <>
                  <span className="text-[#D5D0C6]">·</span>
                  <span>{project.client}</span>
                </>
              )}
            </div>

            <button
              onClick={() => onOpenInquiry(project.title)}
              className="py-3 px-6 bg-[#191919] hover:bg-[#D65335] text-[#F2EFE7] font-mono text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Inquire About Similar Production</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Previous / Next Project navigation in category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#D5D0C6]">
          {prevProject ? (
            <button
              onClick={() => onSelectProject(prevProject)}
              className="p-5 bg-[#FAF8F5] hover:bg-[#EAE6DC] border border-[#D5D0C6] text-left transition-colors cursor-pointer flex flex-col gap-1"
            >
              <span className="font-mono text-[11px] text-[#77756F] flex items-center gap-1">
                <ArrowLeft className="w-3 h-3 text-[#D65335]" />
                Previous in {category.name}
              </span>
              <span className="font-serif text-lg text-[#191919]">
                {prevProject.title}
              </span>
            </button>
          ) : (
            <div />
          )}

          {nextProject ? (
            <button
              onClick={() => onSelectProject(nextProject)}
              className="p-5 bg-[#FAF8F5] hover:bg-[#EAE6DC] border border-[#D5D0C6] text-right transition-colors cursor-pointer flex flex-col items-end gap-1"
            >
              <span className="font-mono text-[11px] text-[#77756F] flex items-center gap-1">
                Next in {category.name}
                <ArrowRight className="w-3 h-3 text-[#D65335]" />
              </span>
              <span className="font-serif text-lg text-[#191919]">
                {nextProject.title}
              </span>
            </button>
          ) : (
            <div />
          )}
        </div>

      </div>
    </article>
  );
}
