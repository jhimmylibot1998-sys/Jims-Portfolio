import { useState, useEffect } from 'react';
import { playTone, resumeAudio } from '../lib/soundEngine';

interface BootSequenceProps {
  onBootComplete: () => void;
  brandName?: string;
  initials?: string;
}

const BOOT_LOG_STEPS: [string, string, string][] = [
  ['INIT', 'core.runtime', 'OK'],
  ['LOAD', 'field.hatch', '45DEG / 4PX'],
  ['LOAD', 'panel.glass', 'BLUR 14'],
  ['CALIB', 'viewport.grid', '1200 MAX'],
  ['SYNC', 'neural.engine', 'COMFYUI + FLUX'],
  ['BIND', 'scroll.observer', 'ACTIVE'],
  ['GEN', 'duotone.ramps', 'CYAN / SLATE'],
  ['OPEN', 'audio.bus', 'STANDBY'],
  ['DONE', 'sequence.complete', 'ENTER'],
];

export function BootSequence({ onBootComplete, brandName = 'LIBOT', initials = 'JL' }: BootSequenceProps) {
  const [stage, setStage] = useState<'splash' | 'loading' | 'done'>('splash');
  const [logIndex, setLogIndex] = useState(0);
  const [percent, setPercent] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Handle splash button click -> proceed to loader
  const handleEnter = () => {
    resumeAudio();
    playTone(660, 0.09, 'square', 0.06);
    setIsExiting(true);

    setTimeout(() => {
      setStage('loading');
      setIsExiting(false);
    }, 620);
  };

  // Step through the boot readout items
  useEffect(() => {
    if (stage !== 'loading') return;

    let currentStep = 0;
    const totalSteps = BOOT_LOG_STEPS.length;
    const intervalMs = 210;

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep <= totalSteps) {
        setLogIndex(currentStep);
        setPercent(Math.round((currentStep / totalSteps) * 100));
        playTone(520 + currentStep * 70, 0.035, 'square', 0.035);
      } else {
        clearInterval(interval);
        playTone(1320, 0.12, 'sine', 0.06);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setStage('done');
            onBootComplete();
          }, 620);
        }, 400);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [stage, onBootComplete]);

  if (stage === 'done') return null;

  return (
    <>
      {/* ══ SPLASH SCREEN ══ */}
      {stage === 'splash' && (
        <section
          id="splash"
          className={`fixed inset-0 z-[100] grid place-items-center bg-[#080c15] text-[#c3d0e8] select-none ${
            isExiting ? 'animate-[bootOut_0.7s_cubic-bezier(0.65,0,0.35,1)_forwards]' : ''
          }`}
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(120, 150, 200, 0.16) 1px, transparent 0), linear-gradient(180deg, rgba(10, 15, 26, 0.6), rgba(6, 9, 17, 0.95))',
            backgroundSize: '14px 14px, 100% 100%',
          }}
        >
          <div className="w-[min(760px,86vw)] p-6">
            {/* Logo Mark */}
            <div className="flex items-center gap-4 mb-[clamp(34px,8vh,74px)]">
              <svg className="w-[52px] h-[52px] flex-none overflow-visible animate-[markIn_1.1s_cubic-bezier(0.16,1,0.3,1)_both]" viewBox="0 0 48 48" aria-hidden="true">
                <circle
                  className="fill-none stroke-[#a3b4d4] stroke-[1.6]"
                  style={{ strokeDasharray: 132, strokeDashoffset: 0 }}
                  cx="24"
                  cy="24"
                  r="20"
                />
                <circle
                  className="fill-none stroke-[#7f90b4] stroke-[1] opacity-70"
                  style={{ strokeDasharray: 92, strokeDashoffset: 0 }}
                  cx="24"
                  cy="24"
                  r="14"
                />
                <path className="fill-none stroke-[#5fe0ff] stroke-[2.4]" d="M30.5 19.2 H18.7 V24" />
                <path className="fill-none stroke-[#5fe0ff] stroke-[2.4]" d="M17.5 28.8 H29.3 V24" />
                <path className="fill-none stroke-[#5fe0ff] stroke-[2.4]" d="M17.5 24 H30.5" />
              </svg>
              <div className="flex flex-col leading-none">
                <span className="font-mono text-[clamp(24px,3.6vw,34px)] font-bold tracking-[0.34em] -mr-[0.34em] text-[#eaf1ff]">
                  {brandName}
                </span>
                <span className="flex justify-between font-mono text-[10px] text-[#7f90b4] mt-[7px] tracking-[0.2em]">
                  <span>S</span>
                  <span>T</span>
                  <span>U</span>
                  <span>D</span>
                  <span>I</span>
                  <span>O</span>
                </span>
              </div>
            </div>

            {/* Terminal Lines */}
            <ol className="font-mono text-[11px] tracking-[0.28em] text-[#a3b4d4] grid gap-3.5 mb-8">
              <li className="flex items-center gap-2">
                <span>JIMMY LIBOT · PRESENTS</span>
              </li>
              <li className="flex items-center gap-2 text-[#7f90b4]">
                <span>AI VIDEO &amp; AUTOMATION SPECIALIST [EDITION / 2026]</span>
              </li>
              <li className="flex items-center gap-2 text-[#5fe0ff]">
                <span>TECH-NOIR CONSOLE INTERACTION <span className="text-[#5fe0ff]">◤</span></span>
              </li>
            </ol>

            {/* Enter Button */}
            <button
              id="enter"
              type="button"
              onClick={handleEnter}
              onPointerEnter={() => playTone(1180, 0.03, 'square', 0.03)}
              className="group flex items-center gap-3.5 mt-[clamp(28px,5vh,44px)] font-mono text-[11px] tracking-[0.26em] text-[#eaf1ff] hover:text-[#5fe0ff] transition-all cursor-pointer py-2 focus:outline-none"
            >
              <span className="w-[clamp(40px,8vw,100px)] h-[1px] bg-[#33415f] group-hover:bg-[#5fe0ff] group-hover:w-[clamp(60px,12vw,140px)] transition-all duration-300" />
              <span className="flex gap-1">
                <i className="w-1 h-3 bg-[#5fe0ff] inline-block animate-pulse" />
                <i className="w-1 h-3 bg-[#5fe0ff] inline-block opacity-70" />
                <i className="w-1 h-3 bg-[#5fe0ff] inline-block opacity-40" />
              </span>
              <span className="text-[#5fe0ff] font-semibold tracking-[0.3em]">
                ENTER CONSOLE &rarr;
              </span>
            </button>

            <p className="mt-[clamp(40px,10vh,90px)] font-mono text-[9px] tracking-[0.3em] text-[#33415f]">
              AUTONOMOUS WORKFLOWS · NEURAL CINEMATOGRAPHY · SIBALDESIGN ARCHITECTURE
            </p>
          </div>
        </section>
      )}

      {/* ══ LOADER SCREEN ══ */}
      {stage === 'loading' && (
        <section
          id="loader"
          className={`fixed inset-0 z-[100] grid place-items-center bg-[#080c15] text-[#c3d0e8] select-none ${
            isExiting ? 'animate-[bootOut_0.7s_cubic-bezier(0.65,0,0.35,1)_forwards]' : ''
          }`}
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(120, 150, 200, 0.16) 1px, transparent 0)',
            backgroundSize: '14px 14px',
          }}
        >
          <div className="grid justify-items-center gap-6 w-[min(520px,86vw)] p-6">
            {/* Ring percentage */}
            <div className="relative w-[120px] h-[120px] grid place-items-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
                <circle
                  className="fill-none stroke-[#232e45] stroke-[1.5]"
                  cx="60"
                  cy="60"
                  r="52"
                />
                <circle
                  className="fill-none stroke-[#5fe0ff] stroke-[1.5] transition-all duration-200"
                  style={{
                    strokeDasharray: 326.7,
                    strokeDashoffset: 326.7 * (1 - percent / 100),
                    filter: 'drop-shadow(0 0 6px rgba(95,224,255,0.6))',
                  }}
                  cx="60"
                  cy="60"
                  r="52"
                />
              </svg>
              <span className="absolute font-mono text-[22px] tracking-[0.06em] text-[#eaf1ff]">
                {String(percent).padStart(2, '0')}
              </span>
            </div>

            <p className="font-mono text-[11px] tracking-[0.42em] text-[#a3b4d4]">
              SD.LOADING.CONSOLE
            </p>

            {/* Readout logs */}
            <ul className="font-mono text-[10px] tracking-[0.14em] text-[#3f4d6d] grid gap-1.5 w-full min-h-[120px] content-start bg-[#0d1320]/80 p-4 border border-[#232e45] rounded-none">
              {BOOT_LOG_STEPS.slice(0, logIndex).slice(-6).map(([c, d, h], i) => (
                <li key={i} className="flex justify-between items-center text-[#7f90b4] py-0.5 border-b border-[#232e45]/40 last:border-b-0">
                  <span className="font-bold text-[#5fe0ff] w-12">{c}</span>
                  <span className="flex-1 text-[#c3d0e8]">{d}</span>
                  <span className="text-[#a3b4d4] italic">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
