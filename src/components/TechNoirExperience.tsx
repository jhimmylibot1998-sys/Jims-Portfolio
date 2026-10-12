import { playTone } from '../lib/soundEngine';

interface ExperienceEntry {
  from: string;
  to: string;
  role: string;
  org: string;
  loc: string;
  desc: string;
}

const EXPERIENCE_DATA: ExperienceEntry[] = [
  {
    from: '2024',
    to: 'PRESENT',
    role: 'Lead AI Video & Automation Director',
    org: 'Autonomous Studio & Direct Client Engagements',
    loc: 'REMOTE',
    desc: 'Engineering end-to-end synthetic video pipelines, commercial prompt systems, and generative video workflows with ComfyUI, Runway Gen-3, Flux, and custom LoRAs for luxury, cosmetics, and DTC brands.',
  },
  {
    from: '2023',
    to: '2024',
    role: 'Creative Automation Systems Engineer',
    org: 'Brand Motion Systems',
    loc: 'REMOTE',
    desc: 'Architected n8n multi-agent orchestration hooks connecting Slack, Airtable, and headless rendering servers for automated high-volume variant production across 9:16 and 16:9 aspect ratios.',
  },
  {
    from: '2022',
    to: '2023',
    role: 'Commercial Video Editor & VFX Specialist',
    org: 'Kinetic Media Group',
    loc: 'CALIFORNIA / REMOTE',
    desc: 'Directed post-production, neural upscaling, 3D camera projections, and audio design for viral short-form and high-conversion e-commerce brand commercials.',
  },
  {
    from: '2020',
    to: '2022',
    role: 'Digital Content & Motion Designer',
    org: 'Digital Horizon Agency',
    loc: 'CALIFORNIA',
    desc: 'Created motion graphics systems, product showcase reels, visual brand guidelines, and high-velocity social media campaigns.',
  },
  {
    from: '2018',
    to: '2020',
    role: 'Front-End & Interactive Media Designer',
    org: 'Creative Tech Collective',
    loc: 'CALIFORNIA',
    desc: 'Designed interactive web presentations, visual design libraries, and multimedia microsites.',
  },
];

export function TechNoirExperience() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-8 max-w-[1200px] mx-auto select-none">
      {/* Section Header */}
      <div className="flex items-baseline gap-4 mb-4">
        <span className="font-mono text-xs tracking-[0.24em] text-[#5fe0ff]">03</span>
        <h2 className="font-mono text-2xl sm:text-3xl font-bold tracking-[0.18em] text-[#eaf1ff] uppercase">
          EXPERIENCE // PRODUCTION LOGS
        </h2>
        <span className="flex-1 h-[1px] bg-gradient-to-r from-[#33415f] to-transparent ml-2" />
      </div>

      <p className="font-mono text-xs tracking-[0.2em] text-[#7f90b4] mb-8">
        PRODUCTION MILESTONES &amp; AUTOMATION ARCHITECTURE ROLES
      </p>

      {/* Experience Table / Logs Container */}
      <div className="bg-[#141b2a]/66 border border-[#232e45] backdrop-blur-[10px] divide-y divide-[#232e45] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]">
        {EXPERIENCE_DATA.map((entry, idx) => (
          <article
            key={idx}
            onPointerEnter={() => playTone(820 + idx * 40, 0.02, 'sine', 0.02)}
            className="group grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 p-6 sm:p-8 hover:bg-[#1e283c]/50 transition-colors"
          >
            {/* Timeline date column */}
            <div className="md:col-span-3 flex md:flex-col justify-between md:justify-start items-baseline gap-2 font-mono text-xs tracking-[0.2em]">
              <span className="text-[#5fe0ff] font-bold">{entry.from}</span>
              <span className="hidden md:inline-block w-4 h-[1px] bg-[#33415f] my-1 group-hover:bg-[#5fe0ff] transition-colors" />
              <span className="text-[#7f90b4]">{entry.to}</span>
            </div>

            {/* Role & Org Column */}
            <div className="md:col-span-7 space-y-2">
              <h3 className="font-mono text-base sm:text-lg font-bold text-[#eaf1ff] tracking-[0.1em] group-hover:text-[#5fe0ff] transition-colors">
                {entry.role}
              </h3>
              <p className="font-mono text-xs tracking-[0.22em] text-[#5fe0ff]">
                {entry.org}
              </p>
              <p className="text-sm text-[#c3d0e8] leading-relaxed font-sans pt-1">
                {entry.desc}
              </p>
            </div>

            {/* Location & Log Index */}
            <div className="md:col-span-2 flex md:flex-col justify-between items-end font-mono text-[10.5px] tracking-[0.22em] text-[#7f90b4]">
              <span>{entry.loc}</span>
              <span className="text-[#33415f] text-base group-hover:text-[#5fe0ff] transition-colors">
                LOG.{String(EXPERIENCE_DATA.length - idx).padStart(2, '0')}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
