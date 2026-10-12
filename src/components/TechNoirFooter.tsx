import { useState, useEffect } from 'react';
import { playTone } from '../lib/soundEngine';

interface TechNoirFooterProps {
  onOpenContact: () => void;
  email?: string;
}

export function TechNoirFooter({ onOpenContact, email = 'jinxarbiter1998@gmail.com' }: TechNoirFooterProps) {
  const [timeString, setTimeString] = useState('--:--:--');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeString(
        [now.getHours(), now.getMinutes(), now.getSeconds()]
          .map((n) => String(n).padStart(2, '0'))
          .join(':')
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryEmail) return;
    playTone(940, 0.08, 'square', 0.05);
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setIsChatOpen(false);
      setInquiryMsg('');
      setInquiryEmail('');
    }, 2400);
  };

  return (
    <footer id="contact" className="py-20 px-4 sm:px-8 max-w-[1200px] mx-auto select-none">
      {/* Section Header */}
      <div className="flex items-baseline gap-4 mb-8">
        <span className="font-mono text-xs tracking-[0.24em] text-[#5fe0ff]">06</span>
        <h2 className="font-mono text-2xl sm:text-3xl font-bold tracking-[0.18em] text-[#eaf1ff] uppercase">
          LET'S CHAT // INITIATE TRANSMISSION
        </h2>
        <span className="flex-1 h-[1px] bg-gradient-to-r from-[#33415f] to-transparent ml-2" />
      </div>

      {/* Main Footer Card */}
      <div className="bg-[#141b2a]/66 border border-[#232e45] backdrop-blur-[10px] p-6 sm:p-12 relative shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] before:content-[''] before:absolute before:-top-[1px] before:-left-[1px] before:w-2 before:h-2 before:border-t before:border-l before:border-[#5fe0ff] after:content-[''] after:absolute after:-bottom-[1px] after:-right-[1px] after:w-2 after:h-2 after:border-b after:border-r after:border-[#5fe0ff]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: CTA Pitch */}
          <div className="lg:col-span-6 space-y-4">
            <p className="font-mono text-xs tracking-[0.28em] text-[#5fe0ff]">
              LIBOT.DESIGN /// EST.2024
            </p>
            <h3 className="font-mono text-2xl sm:text-4xl font-bold tracking-[0.14em] text-[#eaf1ff] uppercase leading-tight">
              LET'S BUILD AN AUTOMATED PIPELINE.
            </h3>
            <p className="text-sm sm:text-base text-[#c3d0e8] leading-relaxed max-w-md font-sans">
              Looking to deploy scalable generative video for your brand, train custom character LoRAs, or automate social creative delivery?
              Let's talk specs and production milestones.
            </p>

            <button
              type="button"
              onClick={() => {
                setIsChatOpen(!isChatOpen);
                playTone(isChatOpen ? 500 : 850, 0.04, 'square', 0.04);
              }}
              onPointerEnter={() => playTone(1050, 0.02, 'sine', 0.02)}
              className="mt-4 px-6 py-3.5 bg-[#5fe0ff] hover:bg-[#7ce9ff] text-[#04060b] font-mono text-xs tracking-[0.26em] font-bold transition-all cursor-pointer shadow-[0_0_15px_rgba(95,224,255,0.3)] flex items-center gap-3"
            >
              <span>{isChatOpen ? 'CLOSE FORM' : "LET'S CHAT"}</span>
              <span className="font-mono">&rarr;</span>
            </button>
          </div>

          {/* Right Column: Links Matrix */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-6 font-mono text-xs tracking-[0.2em]">
            <div>
              <span className="text-[#5fe0ff] block mb-3 font-semibold">NAVIGATION</span>
              <ul className="space-y-2 text-[#7f90b4]">
                <li><a href="#profile" className="hover:text-[#eaf1ff] transition-colors">DOSSIER</a></li>
                <li><a href="#work" className="hover:text-[#eaf1ff] transition-colors">PROJECTS</a></li>
                <li><a href="#experience" className="hover:text-[#eaf1ff] transition-colors">EXPERIENCE</a></li>
                <li><a href="#shoots" className="hover:text-[#eaf1ff] transition-colors">PHOTOS</a></li>
                <li><a href="#stack" className="hover:text-[#eaf1ff] transition-colors">EQUIPMENT</a></li>
              </ul>
            </div>

            <div>
              <span className="text-[#5fe0ff] block mb-3 font-semibold">CONNECT</span>
              <ul className="space-y-2 text-[#7f90b4]">
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#eaf1ff] transition-colors"
                  >
                    LINKEDIN ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#eaf1ff] transition-colors"
                  >
                    GITHUB ↗
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-[#eaf1ff] transition-colors"
                  >
                    EMAIL ↗
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-[#5fe0ff] block mb-3 font-semibold">STATUS</span>
              <ul className="space-y-2 text-[#7f90b4]">
                <li className="text-[#5fe0ff] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5fe0ff] animate-pulse" />
                  AVAILABLE
                </li>
                <li>CALIFORNIA / REMOTE</li>
                <li>V3.2 REBUILD</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Embedded Chat / Form Drawer */}
        {isChatOpen && (
          <div className="mb-10 p-6 bg-[#0d1320] border border-[#5fe0ff] animate-fadeIn">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#232e45] font-mono text-xs tracking-[0.2em]">
              <span className="text-[#5fe0ff] font-bold">HELP ME, HELP YOU // DIRECT DISPATCH</span>
              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                className="text-[#7f90b4] hover:text-[#5fe0ff] text-xs cursor-pointer"
              >
                &larr; BACK
              </button>
            </div>

            {isSent ? (
              <div className="p-6 text-center font-mono text-sm tracking-wider text-[#5fe0ff]">
                TRANSMISSION SENT // WE WILL SYNC SHORTLY.
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                <div>
                  <input
                    type="email"
                    required
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="ENTER YOUR WORK EMAIL"
                    className="w-full bg-[#080c15] border border-[#232e45] focus:border-[#5fe0ff] p-3 font-mono text-xs tracking-wider text-[#eaf1ff] placeholder-[#7f90b4] outline-none"
                  />
                </div>
                <div>
                  <textarea
                    rows={3}
                    required
                    value={inquiryMsg}
                    onChange={(e) => setInquiryMsg(e.target.value)}
                    placeholder="WHAT ARE YOU WORKING ON? (PROJECT SCOPE / TIMELINE)"
                    className="w-full bg-[#080c15] border border-[#232e45] focus:border-[#5fe0ff] p-3 font-mono text-xs tracking-wider text-[#eaf1ff] placeholder-[#7f90b4] outline-none resize-none"
                  />
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-mono text-[10px] tracking-wider text-[#7f90b4]">
                    DIRECT INBOX: <a href={`mailto:${email}`} className="text-[#5fe0ff]">{email}</a>
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#5fe0ff] hover:bg-[#7ce9ff] text-[#04060b] font-mono text-xs tracking-[0.24em] font-bold cursor-pointer"
                  >
                    SEND TRANSMISSION &rarr;
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Bottom Status Bar */}
        <div className="pt-6 border-t border-[#232e45] flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] tracking-[0.24em] text-[#7f90b4]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#5fe0ff] rounded-full inline-block animate-ping" />
            <span className="text-[#c3d0e8]">STATUS: SYSTEM ONLINE</span>
          </div>

          <span className="text-[#7f90b4]">&copy; 2026 JIMMY LIBOT &middot; SIBALDESIGN ENGINE</span>

          <div className="flex items-center gap-3">
            <span className="text-[#7f90b4]">TERMINAL TIME:</span>
            <span className="text-[#5fe0ff] font-bold">{timeString}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
