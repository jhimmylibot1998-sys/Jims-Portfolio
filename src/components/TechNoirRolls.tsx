import { useState } from 'react';
import { playTone } from '../lib/soundEngine';

import imgCinematic from '../assets/images/project_cinematic_commercial_1790278740706.jpg';
import imgFootwear from '../assets/images/project_luxury_footwear_1790284979420.jpg';
import imgLumisera from '../assets/images/project_beauty_lumisera_1790284918103.jpg';
import imgSocial from '../assets/images/project_social_video_system_1790278750774.jpg';
import imgBento from '../assets/images/project_bento_organizer_1790284935153.jpg';
import imgOlaplex from '../assets/images/project_olaplex_bonding_1790284993640.jpg';
import imgCachivane from '../assets/images/project_cachivane_handbag_1790284949240.jpg';
import imgSink from '../assets/images/project_sink_organizer_1790284964834.jpg';

interface RollImage {
  id: string;
  src: string;
  label: string;
  aspect: string;
  exif: string;
}

interface PhotoRoll {
  id: string;
  title: string;
  category: string;
  hardware: string;
  date: string;
  frames: RollImage[];
}

const ROLLS_DATA: PhotoRoll[] = [
  {
    id: 'roll-cinematic-ai',
    title: 'SYNTHETIC CINEMATOGRAPHY',
    category: 'NEURAL FRAMING // 35MM GRAIN',
    hardware: 'COMFYUI + FLUX.1 + RUNWAY GEN-3',
    date: '2025 / CURRENT',
    frames: [
      {
        id: 'fr-01',
        src: imgCinematic,
        label: 'AETHERIA ANAMORPHIC STILL',
        aspect: '16/9',
        exif: '35MM · F/1.8 · 1/48 SEC · ISO 400',
      },
      {
        id: 'fr-02',
        src: imgFootwear,
        label: 'LEATHER DETAIL & TEXTURE',
        aspect: '4/5',
        exif: '50MM MACRO · F/2.8 · 1/125 · ISO 200',
      },
      {
        id: 'fr-03',
        src: imgLumisera,
        label: 'DROPLET REFRACTION MACRO',
        aspect: '16/9',
        exif: '85MM · F/2.0 · 1/250 · ISO 100',
      },
      {
        id: 'fr-04',
        src: imgSocial,
        label: 'CYBERNETIC RUNWAY MODEL',
        aspect: '4/5',
        exif: '45MM · F/1.4 · 1/60 · ISO 800',
      },
    ],
  },
  {
    id: 'roll-commercial-ugc',
    title: 'COMMERCIAL E-COMMERCE LAB',
    category: 'PRODUCT ARCHITECTURE // STUDIO',
    hardware: 'MIDJOURNEY V6 + DAVINCI RESOLVE',
    date: '2024 / 2025',
    frames: [
      {
        id: 'fr-05',
        src: imgBento,
        label: 'MODULUXE MODULAR EXPLODED',
        aspect: '16/9',
        exif: 'STUDIO KEY 5600K · DIFFUSED · 1/160',
      },
      {
        id: 'fr-06',
        src: imgOlaplex,
        label: 'AMBER GLASS CAUSTIC PASS',
        aspect: '4/5',
        exif: 'RIM LIGHT · PRISM FLARE · ISO 50',
      },
      {
        id: 'fr-07',
        src: imgCachivane,
        label: 'PARIS GRAINED LEATHER STILL',
        aspect: '4/5',
        exif: '50MM · NATURAL SUN · 1/500 · F/2.2',
      },
      {
        id: 'fr-08',
        src: imgSink,
        label: 'AQUATIC WORKFLOW DEMO',
        aspect: '16/9',
        exif: 'HYDROPHOBIC CAPTURE · 1/1000',
      },
    ],
  },
];

export function TechNoirRolls() {
  const [activeRollId, setActiveRollId] = useState('roll-cinematic-ai');
  const [lightboxImage, setLightboxImage] = useState<RollImage | null>(null);

  const activeRoll = ROLLS_DATA.find((r) => r.id === activeRollId) || ROLLS_DATA[0];

  const handleOpenLightbox = (frame: RollImage) => {
    playTone(1020, 0.05, 'square', 0.04);
    setLightboxImage(frame);
  };

  const handleCloseLightbox = () => {
    playTone(600, 0.04, 'square', 0.04);
    setLightboxImage(null);
  };

  return (
    <section id="shoots" className="py-20 px-4 sm:px-8 max-w-[1200px] mx-auto select-none">
      {/* Section Header */}
      <div className="flex items-baseline gap-4 mb-4">
        <span className="font-mono text-xs tracking-[0.24em] text-[#5fe0ff]">04</span>
        <h2 className="font-mono text-2xl sm:text-3xl font-bold tracking-[0.18em] text-[#eaf1ff] uppercase">
          PHOTOSHOOTS // CONTACT SHEETS
        </h2>
        <span className="flex-1 h-[1px] bg-gradient-to-r from-[#33415f] to-transparent ml-2" />
      </div>

      <p className="font-mono text-xs tracking-[0.2em] text-[#7f90b4] mb-8">
        PRODUCTION STILLS, HIGH-RESOLUTION PASSES, AND NEURAL LOOK-DEV CONTACT SHEETS
      </p>

      {/* Rolls Selector Tabs */}
      <div className="flex flex-wrap gap-3 mb-6">
        {ROLLS_DATA.map((roll, idx) => {
          const isSelected = roll.id === activeRollId;
          return (
            <button
              key={roll.id}
              type="button"
              onClick={() => {
                setActiveRollId(roll.id);
                playTone(850 + idx * 80, 0.03, 'square', 0.03);
              }}
              onPointerEnter={() => playTone(990, 0.015, 'sine', 0.02)}
              className={`px-4 py-2 border font-mono text-xs tracking-[0.2em] transition-all cursor-pointer flex items-center gap-3 ${
                isSelected
                  ? 'bg-[#5fe0ff]/15 border-[#5fe0ff] text-[#5fe0ff] shadow-[0_0_12px_rgba(95,224,255,0.2)]'
                  : 'bg-[#141b2a]/40 border-[#232e45] text-[#7f90b4] hover:border-[#33415f] hover:text-[#c3d0e8]'
              }`}
            >
              <span className="text-[10px] opacity-75">ROLL.0{idx + 1}</span>
              <span className="font-semibold">{roll.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Roll Metadata Banner */}
      <div className="bg-[#0d1320] border border-[#232e45] p-4 mb-6 flex flex-wrap items-center justify-between gap-4 font-mono text-[10.5px] tracking-[0.24em] text-[#a3b4d4]">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-[#5fe0ff] shadow-[0_0_6px_#5fe0ff]" />
          <span className="text-[#eaf1ff] font-bold">{activeRoll.category}</span>
        </div>
        <div className="flex items-center gap-4 text-[#7f90b4]">
          <span>PIPELINE: {activeRoll.hardware}</span>
          <em>/</em>
          <span>{activeRoll.date}</span>
        </div>
      </div>

      {/* Contact Sheet Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {activeRoll.frames.map((frame, fIdx) => (
          <article
            key={frame.id}
            onClick={() => handleOpenLightbox(frame)}
            onPointerEnter={() => playTone(920 + fIdx * 40, 0.02, 'sine', 0.02)}
            className="group bg-[#141b2a]/66 border border-[#232e45] hover:border-[#5fe0ff] transition-all cursor-pointer overflow-hidden relative"
          >
            {/* Top Frame Tag */}
            <div className="flex justify-between items-center px-3 py-2 border-b border-[#232e45] bg-[#0d1320]/80 font-mono text-[9px] tracking-[0.2em] text-[#7f90b4] group-hover:text-[#5fe0ff]">
              <span>FR.{String(fIdx + 1).padStart(3, '0')}</span>
              <span className="truncate max-w-[120px]">{frame.label}</span>
            </div>

            {/* Frame Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-[#080c15]">
              <img
                src={frame.src}
                alt={frame.label}
                className="w-full h-full object-cover filter brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-[#080c15] via-transparent to-transparent opacity-60" />
            </div>

            {/* EXIF Metadata Bar */}
            <div className="p-2.5 font-mono text-[9px] tracking-[0.16em] text-[#7f90b4] flex justify-between items-center bg-[#0d1320]/90 border-t border-[#232e45]">
              <span className="truncate">{frame.exif}</span>
              <span className="text-[#5fe0ff] ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                ZOOM &rarr;
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[110] bg-[#04070d]/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={handleCloseLightbox}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-[#0d1320] border border-[#5fe0ff] p-4 shadow-[0_0_50px_rgba(95,224,255,0.2)] animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header */}
            <div className="flex justify-between items-center pb-3 mb-3 border-b border-[#232e45] font-mono text-xs tracking-[0.2em]">
              <span className="text-[#5fe0ff] font-bold">{lightboxImage.label}</span>
              <button
                type="button"
                onClick={handleCloseLightbox}
                className="text-[#7f90b4] hover:text-[#5fe0ff] px-2 py-1 border border-[#232e45] hover:border-[#5fe0ff] text-[10px] tracking-widest cursor-pointer"
              >
                CLOSE [ESC] &times;
              </button>
            </div>

            {/* Big image */}
            <img
              src={lightboxImage.src}
              alt={lightboxImage.label}
              className="max-h-[70vh] w-auto mx-auto object-contain border border-[#232e45]"
            />

            {/* Lightbox Footer */}
            <div className="pt-3 mt-3 border-t border-[#232e45] flex justify-between font-mono text-[10px] tracking-[0.2em] text-[#7f90b4]">
              <span>SENSOR: {lightboxImage.exif}</span>
              <span className="text-[#5fe0ff]">RAW 16-BIT EXPORT</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
