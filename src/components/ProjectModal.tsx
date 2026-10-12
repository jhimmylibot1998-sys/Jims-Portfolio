import { useEffect, useRef, useState } from 'react';
import { X, ArrowUpRight, Play, Upload, Film, Loader2, RefreshCw, AlertCircle } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onSelectProjectForInquiry: (projectName: string) => void;
  onUpdateVideo?: (projectId: string, videoUrl: string) => void;
}

export function ProjectModal({
  project,
  onClose,
  onSelectProjectForInquiry,
  onUpdateVideo,
}: ProjectModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      const hasVideo = Boolean(project.videoUrl);
      setIsPlayingVideo(hasVideo);
      setIsVideoLoading(hasVideo);
      setVideoError(false);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#191919]/75 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#FAF8F5] border border-[#D5D0C6] text-[#191919] shadow-2xl film-frame"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#FAF8F5] border-b border-[#D5D0C6]">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-[#77756F]">
            <span className="text-[#D65335] font-semibold">PLATE {project.number}</span>
            <span className="text-[#D5D0C6]">/</span>
            <span>{project.category}</span>
          </div>
          
          <div className="flex items-center gap-3">
            {onUpdateVideo && (
              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F2EFE7] hover:bg-[#EAE6DC] text-[#191919] text-xs font-mono cursor-pointer transition-colors border border-[#D5D0C6]">
                <Upload className="w-3.5 h-3.5 text-[#D65335]" />
                <span className="hidden sm:inline">Attach Video (.mp4)</span>
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
              onClick={onClose}
              aria-label="Close project modal"
              className="p-1.5 text-[#77756F] hover:text-[#D65335] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Media visual showcase */}
        <div className="relative aspect-[16/9] w-full bg-[#141414] overflow-hidden group">
          {project.videoUrl && isPlayingVideo ? (
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              {/* Blurred poster background during video initialization */}
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

              {/* Video preloader / buffering indicator */}
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
                      className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider bg-[#F2EFE7] text-[#191919] font-medium shadow-md transition-colors cursor-pointer hover:bg-white"
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

        {/* Content body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#77756F]">
              Production Overview
            </h3>
            <p className="text-base text-[#55534E] leading-relaxed">
              {project.overview || project.description}
            </p>
          </div>

          {project.tools && project.tools.length > 0 && (
            <div className="pt-4 border-t border-[#D5D0C6] flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="text-[#77756F] uppercase text-[11px] mr-1">NEURAL PIPELINE:</span>
              {project.tools.map((tool) => (
                <span key={tool} className="px-2.5 py-1 bg-[#F2EFE7] border border-[#D5D0C6] text-[#191919]">
                  {tool}
                </span>
              ))}
            </div>
          )}

          <div className="pt-4 border-t border-[#D5D0C6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="font-mono text-xs text-[#77756F] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#D65335]" />
              <span>{project.category} · {project.year}</span>
              {project.duration && (
                <>
                  <span className="text-[#D5D0C6]">·</span>
                  <span>{project.duration}</span>
                </>
              )}
            </div>

            <button
              onClick={() => {
                onClose();
                onSelectProjectForInquiry(project.title);
              }}
              className="py-2.5 px-5 bg-[#191919] hover:bg-[#D65335] text-[#F2EFE7] font-mono text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <span>Inquire About Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
