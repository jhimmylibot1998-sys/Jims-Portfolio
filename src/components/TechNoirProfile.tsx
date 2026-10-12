import { playTone } from '../lib/soundEngine';
import heroPortraitFallback from '../assets/images/hero_specialist_portrait_1790278730919.jpg';

interface TechNoirProfileProps {
  portraitUrl?: string;
  onOpenContact: () => void;
  onViewWork: () => void;
}

export function TechNoirProfile({ portraitUrl, onOpenContact, onViewWork }: TechNoirProfileProps) {
  return (
    <section id="profile" className="py-20 px-4 sm:px-8 max-w-[1200px] mx-auto select-none">
      {/* Section Header */}
      <div className="flex items-baseline gap-4 mb-10">
        <span className="font-mono text-xs tracking-[0.24em] text-[#5fe0ff]">01</span>
        <h2 className="font-mono text-2xl sm:text-3xl font-bold tracking-[0.18em] text-[#eaf1ff] uppercase">
          DOSSIER // PROFILE
        </h2>
        <span className="flex-1 h-[1px] bg-gradient-to-r from-[#33415f] to-transparent ml-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Subject ID card */}
        <div className="lg:col-span-5 bg-[#141b2a]/66 border border-[#232e45] backdrop-blur-[10px] p-6 relative flex flex-col justify-between before:content-[''] before:absolute before:-top-[1px] before:-left-[1px] before:w-2 before:h-2 before:border-t before:border-l before:border-[#5fe0ff]">
          <div>
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#232e45] font-mono text-[10px] tracking-[0.28em] text-[#a3b4d4]">
              <span className="w-1.5 h-1.5 bg-[#5fe0ff] inline-block shadow-[0_0_6px_#5fe0ff]" />
              <span>SUBJECT.ID // 0048-AI</span>
            </div>

            {/* Portrait with cyan duotone / scan overlay */}
            <figure className="relative aspect-[4/5] overflow-hidden bg-[#0d1320] border border-[#232e45] group">
              <img
                src={portraitUrl || heroPortraitFallback}
                alt="AI Video Specialist"
                className="w-full h-full object-cover transition-all duration-700 filter grayscale contrast-125 brightness-90 group-hover:filter-none group-hover:scale-105"
              />
              {/* Scanline light wipe effect */}
              <span className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#5fe0ff]/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000" />
              <div className="absolute bottom-2 left-2 right-2 px-3 py-1.5 bg-[#080c15]/80 backdrop-blur-sm border border-[#232e45] font-mono text-[9px] tracking-[0.2em] text-[#7f90b4] flex justify-between">
                <span>SENSOR.RESOLVED</span>
                <span className="text-[#5fe0ff]">ONLINE</span>
              </div>
            </figure>
          </div>

          <div className="pt-4 mt-4 border-t border-[#232e45] flex justify-between font-mono text-[10px] tracking-[0.26em] text-[#a3b4d4]">
            <span>JIMMY LIBOT</span>
            <span className="text-[#5fe0ff]">AI AUTOMATION SPECIALIST</span>
          </div>
        </div>

        {/* Right: Technical Dossier */}
        <div className="lg:col-span-7 bg-[#141b2a]/66 border border-[#232e45] backdrop-blur-[10px] p-6 sm:p-10 relative before:content-[''] before:absolute before:-bottom-[1px] before:-right-[1px] before:w-2 before:h-2 before:border-b before:border-r before:border-[#5fe0ff] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 mb-6 border-b border-[#232e45] font-mono text-[10px] tracking-[0.28em] text-[#a3b4d4]">
              <span className="w-1.5 h-1.5 bg-[#5fe0ff] inline-block shadow-[0_0_6px_#5fe0ff]" />
              <span>FIELD.NOTES // TECHNICAL RECORD</span>
            </div>

            <div className="space-y-5 text-sm sm:text-base text-[#c3d0e8] leading-relaxed">
              <p>
                Specialist in neural cinematography, generative AI video pipelines, and high-throughput content automation systems.
                Operating across the convergence of creative direction and computer engineering.
              </p>
              <p>
                Rather than treating generative models as mere prompt toys, I build robust production machinery: custom ComfyUI topologies,
                multi-agent orchestration frameworks (n8n, LangChain, webhook architectures), and automated rendering loops that output calibrated 4K cinema and high-conversion e-commerce assets.
              </p>
              <p className="text-xs font-mono text-[#7f90b4] border-l-2 border-[#5fe0ff] pl-3 py-1">
                Directing commercial spots, algorithmic UGC variations, and bespoke brand engines with zero latency and strict continuity.
              </p>
            </div>
          </div>

          {/* Action links row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-[#232e45]">
            <button
              type="button"
              onClick={() => {
                playTone(880, 0.04, 'square', 0.04);
                onViewWork();
              }}
              onPointerEnter={() => playTone(1100, 0.02, 'sine', 0.02)}
              className="flex justify-between items-center p-3.5 bg-[#0d1320] border border-[#232e45] hover:border-[#5fe0ff] font-mono text-xs tracking-[0.2em] text-[#eaf1ff] hover:text-[#5fe0ff] transition-all cursor-pointer"
            >
              <span className="text-[#7f90b4]">PROJECTS</span>
              <span>EXPLORE WORK &darr;</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playTone(780, 0.04, 'square', 0.04);
                onOpenContact();
              }}
              onPointerEnter={() => playTone(1100, 0.02, 'sine', 0.02)}
              className="flex justify-between items-center p-3.5 bg-[#0d1320] border border-[#232e45] hover:border-[#5fe0ff] font-mono text-xs tracking-[0.2em] text-[#eaf1ff] hover:text-[#5fe0ff] transition-all cursor-pointer"
            >
              <span className="text-[#7f90b4]">CONSULTATION</span>
              <span>INITIATE CHAT &rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
