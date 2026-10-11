import React from 'react';
import { X, Award, RotateCcw, CheckCircle2, ArrowRight } from 'lucide-react';
import { UserSessionProgress, DomainId } from '../types/cognition';
import { DOMAINS } from '../data/gameContent';
import { sound } from '../utils/sound';

interface LabProgressSummaryProps {
  isOpen: boolean;
  onClose: () => void;
  sessionProgress: UserSessionProgress;
  onSelectDomain: (id: DomainId) => void;
  onResetProgress: () => void;
}

export const LabProgressSummary: React.FC<LabProgressSummaryProps> = ({
  isOpen,
  onClose,
  sessionProgress,
  onSelectDomain,
  onResetProgress,
}) => {
  if (!isOpen) return null;

  const completedCount = Object.values(sessionProgress.completedDomains).filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#0e111a] border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-serif-title">
                Lab Session Progress
              </h2>
              <p className="text-xs text-slate-400">
                Cognitive Training Audit & Recorded High Scores
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Aggregate Progress Bar */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-300">Curriculum Completion</span>
            <span className="text-cyan-400 font-bold">{completedCount} of 5 Domains Finished</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-amber-400 transition-all duration-300"
              style={{ width: `${(completedCount / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* 5 Domains Status List */}
        <div className="space-y-3">
          {DOMAINS.map((domain) => {
            const isCompleted = sessionProgress.completedDomains[domain.id];
            const hs = sessionProgress.highScores;

            let scoreDetail = 'Not attempted yet in this session';
            if (domain.id === 'attention' && hs.attention) {
              scoreDetail = `Best Score: ${hs.attention.score}/${hs.attention.total} (${hs.attention.percentage}%)`;
            } else if (domain.id === 'memory' && hs.memory) {
              scoreDetail = `Best Sequence: ${hs.memory.score}/${hs.memory.total} ${
                hs.memory.completed ? '· Flawless' : ''
              }`;
            } else if (domain.id === 'learning' && hs.learning) {
              scoreDetail = `Score: ${hs.learning.score}/${hs.learning.total} (P1: ${hs.learning.p1Score}/5, P2: ${hs.learning.p2Score}/5)`;
            } else if (domain.id === 'perception' && hs.perception) {
              scoreDetail = `Score: ${hs.perception.score}/${hs.perception.total} Deductions`;
            } else if (domain.id === 'decision' && hs.decision) {
              scoreDetail = `Profile Archetype: "${hs.decision.profileTitle}"`;
            }

            return (
              <div
                key={domain.id}
                className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center justify-between text-xs gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-500">{domain.number}</span>
                    <span className="font-semibold text-white">{domain.name}</span>
                    <span className="text-slate-400 font-normal">({domain.gameTitle})</span>
                  </div>
                  <div className="text-slate-400 font-mono text-[11px]">{scoreDetail}</div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isCompleted ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-mono text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Done</span>
                    </span>
                  ) : (
                    <span className="text-slate-500 font-mono text-[11px]">Pending</span>
                  )}

                  <button
                    onClick={() => {
                      sound.playClick();
                      onClose();
                      onSelectDomain(domain.id);
                    }}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-500 hover:text-black text-slate-200 transition-colors font-semibold text-[11px] flex items-center gap-1"
                  >
                    <span>{isCompleted ? 'Replay' : 'Play'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reset Progress Action */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500">Local browser session data</span>
          <button
            onClick={() => {
              sound.playClick();
              if (window.confirm('Reset your current session progress and scores?')) {
                onResetProgress();
              }
            }}
            className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Lab Progress</span>
          </button>
        </div>
      </div>
    </div>
  );
};
