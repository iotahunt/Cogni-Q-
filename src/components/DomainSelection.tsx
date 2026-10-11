import React from 'react';
import { Eye, Brain, RefreshCw, Zap, Compass, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { DOMAINS } from '../data/gameContent';
import { DomainId, UserSessionProgress } from '../types/cognition';
import { sound } from '../utils/sound';

interface DomainSelectionProps {
  onSelectDomain: (domainId: DomainId) => void;
  sessionProgress: UserSessionProgress;
}

export const DomainSelection: React.FC<DomainSelectionProps> = ({
  onSelectDomain,
  sessionProgress,
}) => {
  const getDomainIcon = (id: DomainId) => {
    switch (id) {
      case 'attention':
        return <Zap className="w-5 h-5 text-cyan-400" />;
      case 'memory':
        return <Brain className="w-5 h-5 text-indigo-400" />;
      case 'learning':
        return <RefreshCw className="w-5 h-5 text-emerald-400" />;
      case 'perception':
        return <Eye className="w-5 h-5 text-purple-300" />;
      case 'decision':
        return <Compass className="w-5 h-5 text-amber-300" />;
    }
  };

  const getDomainArtSnippet = (id: DomainId) => {
    switch (id) {
      case 'attention':
        return (
          <div className="relative h-28 w-full overflow-hidden rounded-xl bg-black/80 border border-cyan-500/20 flex items-center justify-center p-3">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-fuchsia-900/20 to-black pointer-events-none" />
            <div className="relative flex flex-col items-center gap-1.5 w-full">
              <div className="w-full flex items-center justify-between text-[11px] font-mono text-cyan-400">
                <span>Signal vs. Noise</span>
                <span className="text-pink-400 font-bold animate-pulse">! INTERRUPT !</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-gradient-to-r from-cyan-400 to-pink-500 animate-pulse" />
              </div>
              <div className="flex gap-1.5 text-[10px] text-slate-400">
                <span className="px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 font-bold">10s Fact</span>
                <span className="px-1.5 py-0.5 rounded bg-pink-950/80 border border-pink-800/60 text-pink-300">Feed Clutter</span>
              </div>
            </div>
          </div>
        );
      case 'memory':
        return (
          <div className="relative h-28 w-full overflow-hidden rounded-xl bg-[#0a0f1d] border border-indigo-500/20 flex items-center justify-center p-3">
            <div className="grid grid-cols-3 gap-1.5 w-24 h-24">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <div
                  key={n}
                  className="rounded-md border border-indigo-500/30 bg-indigo-950/40 flex items-center justify-center text-[11px] font-mono text-indigo-300"
                >
                  {n === 1 || n === 5 || n === 9 ? n : '·'}
                </div>
              ))}
            </div>
          </div>
        );
      case 'learning':
        return (
          <div className="relative h-28 w-full overflow-hidden rounded-xl bg-[#0f1422] border border-amber-500/20 flex items-center justify-center p-3">
            <div className="flex flex-col items-center gap-2">
              <div className="text-lg font-bold tracking-wider text-rose-500 font-mono">
                &ldquo;GREEN&rdquo;
              </div>
              <div className="text-[10px] font-mono text-slate-400 flex items-center gap-2">
                <span className="text-amber-400">Phase 1: Color</span>
                <span className="text-slate-600">⇄</span>
                <span className="text-emerald-400">Phase 2: Word</span>
              </div>
            </div>
          </div>
        );
      case 'perception':
        return (
          <div className="relative h-28 w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-900 border border-purple-500/20 flex items-center justify-center p-3">
            <div className="relative w-16 h-16 border-2 border-dashed border-purple-400/50 rounded-lg rotate-12 flex items-center justify-center">
              <div className="w-10 h-10 border border-slate-300 rounded-sm -rotate-12 flex items-center justify-center text-[10px] font-mono text-purple-200">
                Shift
              </div>
            </div>
          </div>
        );
      case 'decision':
        return (
          <div className="relative h-28 w-full overflow-hidden rounded-xl bg-[#0a0a0d] border border-amber-500/25 flex items-center justify-center p-3">
            <div className="flex items-center justify-center gap-4 text-amber-200/90 font-tech-title">
              <span className="text-xs tracking-widest text-amber-300">Option A</span>
              <span className="text-xs text-amber-500/70">⚖</span>
              <span className="text-xs tracking-widest text-amber-300">Option B</span>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="domains-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#090b10] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-cyan-950/70 border border-cyan-500/40 text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
            <span>🎮 5 PLAYABLE INTERACTIVE GAMES INSIDE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-tech-title tracking-tight">
            THE FIVE COGNITIVE DOMAINS
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Click on any domain below to start its playable challenge. These are full interactive games with real-time timers, adaptive rules, scoring, and instant cognitive feedback.
          </p>
        </div>

        {/* 5 Domain Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {DOMAINS.map((domain) => {
            const isCompleted = sessionProgress.completedDomains[domain.id];

            return (
              <div
                key={domain.id}
                onClick={() => {
                  sound.playClick();
                  onSelectDomain(domain.id);
                }}
                className={`group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl border transition-all duration-300 cursor-pointer ${domain.theme.bgStyle} ${domain.theme.borderStyle}`}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    sound.playClick();
                    onSelectDomain(domain.id);
                  }
                }}
              >
                {/* Top card header */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                        {getDomainIcon(domain.id)}
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        {domain.number}
                      </span>
                    </div>

                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800 uppercase tracking-wider font-semibold">
                        Ready To Play
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-2xl font-bold text-white font-tech-title tracking-tight group-hover:text-cyan-300 transition-colors">
                      {domain.name}
                    </h3>
                    <div className={`text-xs font-mono font-semibold tracking-wider uppercase mt-1 ${domain.theme.accent}`}>
                      {domain.subtitle}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed min-h-[40px]">
                    &ldquo;{domain.description}&rdquo;
                  </p>

                  {/* Visual theme artifact preview */}
                  <div className="pt-1">{getDomainArtSnippet(domain.id)}</div>
                </div>

                {/* Bottom card footer with BIG ENTER CHALLENGE BUTTON */}
                <div className="pt-6 mt-5 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Game:</span>
                    <span className="font-bold text-slate-200">{domain.gameTitle}</span>
                  </div>

                  {/* BIG ENTER CHALLENGE BUTTON */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.playClick();
                      onSelectDomain(domain.id);
                    }}
                    className="w-full py-3.5 px-5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 hover:from-cyan-300 hover:to-white shadow-[0_0_20px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.55)] transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>ENTER CHALLENGE</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
