import React from 'react';
import { Target, Shuffle, ShieldCheck, ArrowRight, Zap, Brain, RefreshCw, Eye, Compass } from 'lucide-react';
import { DomainId } from '../types/cognition';
import { sound } from '../utils/sound';

interface HowItWorksSectionProps {
  onSelectDomain: (id: DomainId) => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onSelectDomain }) => {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#090b12] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-400">
            <span>Methodology & Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif-title tracking-tight">
            HOW COGNI-Q+ WORKS
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            A three-step experiential framework bridging cognitive psychology, quantum probability models, and interactive challenges.
          </p>
        </div>

        {/* 3 Step Process Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-7 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 relative">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-sm">
              01
            </div>
            <h3 className="text-lg font-bold text-white font-serif-title">
              1. Enter the Context
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Unlike static multiple-choice quizzes, each Cogni-Q+ challenge immerses you in a tailored sensory environment—from high-entropy distraction noise to meditative spatial grids and sudden mid-stream rule flips.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 relative">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-mono font-bold text-sm">
              02
            </div>
            <h3 className="text-lg font-bold text-white font-serif-title">
              2. Collapse the State
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Under strict time limits or ambiguous visual cues, your mind is forced to collapse its superposition of possibilities into a decisive selection. We record speed, sequential chunking, and contextual adaptation.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 relative">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold text-sm">
              03
            </div>
            <h3 className="text-lg font-bold text-white font-serif-title">
              3. Audit Your Biases
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Each completion screen delivers immediate, scientifically grounded feedback. We explain why your working memory faulted, how proactive interference shaped your choices, or what moral dimensions guided your values.
            </p>
          </div>
        </div>

        {/* 5 Domain Direct Launcher */}
        <div className="p-8 rounded-3xl bg-slate-950/80 border border-slate-800/80 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white font-tech-title">
                Curriculum at a Glance
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Train each dimension independently. No sequential lockouts; explore in any order.
              </p>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onSelectDomain('attention');
              }}
              className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 hover:from-cyan-300 hover:to-white shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all whitespace-nowrap active:scale-95 shrink-0"
            >
              ENTER CHALLENGE
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { id: 'attention' as DomainId, label: '01 Attention', icon: <Zap className="w-4 h-4 text-cyan-400" /> },
              { id: 'memory' as DomainId, label: '02 Memory', icon: <Brain className="w-4 h-4 text-indigo-400" /> },
              { id: 'learning' as DomainId, label: '03 Learning', icon: <RefreshCw className="w-4 h-4 text-emerald-400" /> },
              { id: 'perception' as DomainId, label: '04 Perception', icon: <Eye className="w-4 h-4 text-purple-400" /> },
              { id: 'decision' as DomainId, label: '05 Decision', icon: <Compass className="w-4 h-4 text-amber-400" /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  onSelectDomain(item.id);
                }}
                className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/80 text-left transition-all group flex items-center justify-between"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 group-hover:text-white">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
