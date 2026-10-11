import React from 'react';
import { Sparkles, RotateCcw, ArrowUp, Atom, Brain } from 'lucide-react';
import { sound } from '../utils/sound';

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateDomains: () => void;
  onNavigateScience: () => void;
  onResetSession: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onNavigateDomains,
  onNavigateScience,
  onResetSession,
}) => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#06070a] text-slate-400 text-xs border-t border-slate-900 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Mission Column */}
          <div className="md:col-span-5 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="h-7 px-2 rounded-lg bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-400/50 flex items-center gap-1.5 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                <Brain className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-white font-mono font-bold text-[11px] tracking-tight">CQ+</span>
              </div>
              <span className="text-base font-bold text-white font-tech-title tracking-tight">
                Cogni-Q+
              </span>
            </div>

            <p className="text-cyan-300 font-medium">
              Think Beyond the Obvious.
            </p>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Train your mind to adapt, focus, perceive, learn, and decide. An experimental cognitive training laboratory inspired by quantum probability modeling in human judgment.
            </p>
          </div>

          {/* Scientific Credo Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-slate-200 font-semibold uppercase tracking-wider text-[11px] font-mono">
              Scientific Principles & Scope
            </h4>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              Quantum cognition is an established research paradigm in mathematical psychology. It models context effects and interference using quantum probability mathematics. It makes no claim of literal microphysical quantum phenomena occurring inside neural tubules.
            </p>
            <p className="text-slate-500 text-[11px]">
              Cogni-Q+ exercises are educational simulations and are not clinical diagnostics.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-slate-200 font-semibold uppercase tracking-wider text-[11px] font-mono">
              Curriculum Navigation
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>
                <button
                  onClick={() => {
                    sound.playClick();
                    onNavigateHome();
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    sound.playClick();
                    onNavigateDomains();
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Five Cognitive Domains
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    sound.playClick();
                    onNavigateScience();
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  About Quantum Cognition
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    sound.playClick();
                    if (window.confirm('Reset all completed scores and session history?')) {
                      onResetSession();
                    }
                  }}
                  className="hover:text-rose-400 text-slate-500 transition-colors flex items-center gap-1 mt-2"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Session Data</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Cogni-Q+ Cognitive Laboratory. Interactive Educational Platform.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};
