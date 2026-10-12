import { playTone } from '../lib/soundEngine';

interface TechItem {
  k: string;
  v: string;
  d: string;
  lvl: number;
}

const EQUIPMENT_DATA: TechItem[] = [
  {
    k: 'SYNTHESIS',
    v: 'COMFYUI ARCHITECTURE',
    d: 'Modular neural node trees, latent conditioning, and custom custom LoRA injection pipelines.',
    lvl: 96,
  },
  {
    k: 'CINEMA',
    v: 'RUNWAY GEN-3 ALPHA & LTX',
    d: 'Commercial camera tracking, motion brush control, and multi-angle cinematic coverage.',
    lvl: 92,
  },
  {
    k: 'DIFFUSION',
    v: 'FLUX.1 & MIDJOURNEY V6',
    d: 'Hyper-detailed photographic concepting, lighting look-dev, and macro caustics rendering.',
    lvl: 95,
  },
  {
    k: 'AUTOMATION',
    v: 'N8N AGENTIC ENGINE',
    d: 'Automated webhook triggers, multi-model LLM director loops, and cloud render farm dispatch.',
    lvl: 90,
  },
  {
    k: 'POST-PROD',
    v: 'DAVINCI RESOLVE STUDIO',
    d: 'ACES color management, neural neural upscaling, optical flow retiming, and audio mastering.',
    lvl: 94,
  },
  {
    k: 'VFX / MOTION',
    v: 'AFTER EFFECTS & BLENDER',
    d: 'Motion typography, HUD interface graphics, camera projections, and 3D product integration.',
    lvl: 88,
  },
  {
    k: 'AUDIO FX',
    v: 'NEURAL FOLEY & ELEVENLABS',
    d: 'Synthetic voice cloning, ambient drone spatialization, and sound bed ducking.',
    lvl: 89,
  },
  {
    k: 'ENGINEERING',
    v: 'REACT / VITE / PYTHON',
    d: 'Bespoke client portals, headless rendering scripts, and automated media ingest pipelines.',
    lvl: 86,
  },
];

export function TechNoirEquipment() {
  return (
    <section id="stack" className="py-20 px-4 sm:px-8 max-w-[1200px] mx-auto select-none">
      {/* Section Header */}
      <div className="flex items-baseline gap-4 mb-4">
        <span className="font-mono text-xs tracking-[0.24em] text-[#5fe0ff]">05</span>
        <h2 className="font-mono text-2xl sm:text-3xl font-bold tracking-[0.18em] text-[#eaf1ff] uppercase">
          EQUIPMENT // PIPELINE TOPOLOGY
        </h2>
        <span className="flex-1 h-[1px] bg-gradient-to-r from-[#33415f] to-transparent ml-2" />
      </div>

      <p className="font-mono text-xs tracking-[0.2em] text-[#7f90b4] mb-8">
        PRODUCTION HARDWARE, GENERATIVE ENGINES, AND AUTOMATION STACKS
      </p>

      {/* Equipment Tiles Grid (4-column layout matching Sibaldesign .grid--stack) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {EQUIPMENT_DATA.map((item, idx) => (
          <article
            key={item.v}
            onPointerEnter={() => playTone(880 + idx * 35, 0.02, 'sine', 0.02)}
            className="group bg-[#141b2a]/66 border border-[#232e45] hover:border-[#5fe0ff] p-5 backdrop-blur-[10px] transition-all flex flex-col justify-between relative shadow-[0_10px_30px_-15px_rgba(0,0,0,0.8)]"
          >
            <div>
              {/* Category key */}
              <span className="font-mono text-[10px] tracking-[0.26em] text-[#5fe0ff] block mb-2 font-semibold">
                {item.k}
              </span>

              {/* Title */}
              <h3 className="font-mono text-sm font-bold tracking-[0.1em] text-[#eaf1ff] mb-2 group-hover:text-[#5fe0ff] transition-colors">
                {item.v}
              </h3>

              {/* Description */}
              <p className="text-xs text-[#a3b4d4] leading-relaxed mb-4 font-sans">
                {item.d}
              </p>
            </div>

            {/* Proficiency / Precision Level Bar */}
            <div className="pt-2">
              <div className="flex justify-between items-center font-mono text-[9px] tracking-[0.2em] text-[#7f90b4] mb-1.5">
                <span>EFFICIENCY</span>
                <span className="text-[#5fe0ff]">{item.lvl}%</span>
              </div>
              <div className="h-[2px] w-full bg-[#232e45] overflow-hidden">
                <div
                  className="h-full bg-[#5fe0ff] group-hover:bg-[#7ce9ff] shadow-[0_0_6px_#5fe0ff] transition-all duration-700"
                  style={{ width: `${item.lvl}%` }}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
