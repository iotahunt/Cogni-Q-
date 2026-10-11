import React, { useState } from 'react';
import {
  ArrowLeft,
  RotateCcw,
  Eye,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Lightbulb,
  ShieldCheck,
} from 'lucide-react';
import { PERCEPTION_QUESTIONS } from '../../data/gameContent';
import { PerceptionQuestion } from '../../types/cognition';
import { sound } from '../../utils/sound';
import realityGlitchImg from '../../assets/images/cogni_reality_glitch_1791699550933.jpg';

interface PerceptionGameProps {
  onReturnToLab: () => void;
  onCompleteGame: (score: number, total: number) => void;
}

type GameStage = 'INTRO' | 'PLAYING' | 'QUESTION_FEEDBACK' | 'RESULTS';

export const PerceptionGame: React.FC<PerceptionGameProps> = ({
  onReturnToLab,
  onCompleteGame,
}) => {
  const [stage, setStage] = useState<GameStage>('INTRO');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userChoices, setUserChoices] = useState<string[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  const currentQ: PerceptionQuestion = PERCEPTION_QUESTIONS[currentIdx];

  const startGame = () => {
    setCurrentIdx(0);
    setUserChoices([]);
    setSelectedLabel(null);
    setStage('PLAYING');
    sound.playClick();
  };

  const handleSelectOption = (label: string) => {
    if (selectedLabel !== null) return;
    setSelectedLabel(label);

    const isMatch = label === currentQ.correctLabel;
    if (isMatch) sound.playSuccess();
    else sound.playError();

    setUserChoices((prev) => [...prev, label]);
    setStage('QUESTION_FEEDBACK');
  };

  const handleNextQuestion = () => {
    sound.playClick();
    setSelectedLabel(null);

    if (currentIdx + 1 < PERCEPTION_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setStage('PLAYING');
    } else {
      const score = userChoices.filter(
        (choice, idx) => choice === PERCEPTION_QUESTIONS[idx].correctLabel
      ).length;
      onCompleteGame(score, 5);
      setStage('RESULTS');
    }
  };

  const score = userChoices.filter(
    (choice, idx) => choice === PERCEPTION_QUESTIONS[idx]?.correctLabel
  ).length;

  return (
    <div className="relative min-h-[90vh] bg-gradient-to-b from-[#0e0d16] via-[#121020] to-[#0a0912] text-slate-100 p-4 sm:p-6 lg:p-8 overflow-hidden select-none">
      {/* Ethereal shifting light aura */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-purple-900/40 pb-4 mb-6">
        <button
          onClick={() => {
            sound.playClick();
            onReturnToLab();
          }}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Lab</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded bg-purple-950/80 border border-purple-400/30 text-purple-200 text-xs font-mono font-bold">
            DOMAIN 04 · PERCEPTION
          </div>
          {stage !== 'INTRO' && stage !== 'RESULTS' && (
            <div className="text-xs font-mono text-slate-400">
              Scenario <span className="text-purple-300 font-bold">{currentIdx + 1}</span> of 5
            </div>
          )}
        </div>
      </div>

      {/* STAGE 1: INTRO */}
      {stage === 'INTRO' && (
        <div className="max-w-3xl mx-auto space-y-8 py-6">
          <div className="space-y-3">
            <div className="text-xs font-mono font-semibold text-purple-300 uppercase tracking-widest flex items-center gap-2">
              <Eye className="w-4 h-4 text-purple-400" />
              <span>Challenge 04 · The Reality Glitch</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-serif-title tracking-tight">
              PERCEPTION: REALITY IS NOT ALWAYS WHAT IT SEEMS
            </h1>
            <p className="text-purple-300 font-mono text-xs uppercase tracking-wider">
              Cognitive Assumptions, Optical Framing & Ambiguity Testing
            </p>
          </div>

          <div className="space-y-4 text-sm text-slate-300 leading-relaxed bg-[#151324]/90 p-6 rounded-2xl border border-purple-500/30 shadow-[0_0_25px_rgba(168,85,247,0.15)]">
            <p>
              Perception is the process through which the brain organizes and interprets sensory information to construct an understanding of the world. What we perceive is influenced by the information available, our expectations, attention, prior experience, and the context in which something appears.
            </p>
            <p>
              In the digital age, images, edited videos, visual effects, incomplete headlines, and rapidly presented information can encourage us to form conclusions before examining the available evidence.
            </p>
            <p className="text-purple-200 font-medium">
              In this challenge, you will encounter five unusual scenarios. Each contains clues, assumptions, or misleading details. Your task is to distinguish what the scenario actually supports from what your mind initially assumes.
            </p>
            <p className="font-semibold text-white">
              Look again. Question the obvious. Find the detail that changes everything.
            </p>
          </div>

          {/* Exhibition Artwork Preview */}
          <div className="relative rounded-2xl overflow-hidden border border-purple-900/40 bg-black/60 flex items-center">
            <div className="w-1/3 aspect-[4/3] overflow-hidden">
              <img
                src={realityGlitchImg}
                alt="Optical perception and impossible geometry artwork"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-2/3 p-4 text-xs text-slate-300 space-y-1.5">
              <span className="font-semibold text-purple-300 block">Perceptual Heuristics in Action</span>
              <p className="text-slate-400 leading-relaxed">
                Your brain fills in missing gaps unconsciously. This challenge requires checking whether the evidence actually proves a conclusion, or merely makes it intuitive.
              </p>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-center">
            <button
              onClick={startGame}
              className="px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-black bg-gradient-to-r from-purple-300 via-indigo-200 to-slate-100 rounded-xl hover:from-purple-200 hover:to-white shadow-[0_0_25px_rgba(192,132,252,0.35)] transition-all active:scale-95"
            >
              START CHALLENGE
            </button>
          </div>
        </div>
      )}

      {/* STAGE 2: PLAYING SCENARIO */}
      {stage === 'PLAYING' && currentQ && (
        <div className="max-w-3xl mx-auto py-6 space-y-7">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400">
              Scenario 0{currentQ.id} · {currentQ.title}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-serif-title">
              {currentQ.question}
            </h2>
          </div>

          {/* Scenario Narrative Box */}
          <div className="p-6 rounded-2xl bg-[#141224]/90 border border-purple-500/20 shadow-xl text-sm sm:text-base text-slate-200 leading-relaxed whitespace-pre-line">
            {currentQ.scenario}
          </div>

          {/* 4 Options */}
          <div className="space-y-3 pt-1">
            {currentQ.options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => handleSelectOption(opt.label)}
                className="w-full text-left p-4 sm:p-5 rounded-xl border border-slate-800 bg-[#151426]/70 hover:bg-[#1f1d38] hover:border-purple-400/80 transition-all text-xs sm:text-sm text-slate-200 shadow-sm flex items-start gap-3 group focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <span className="w-6 h-6 rounded-md bg-purple-950/80 border border-purple-500/50 flex items-center justify-center text-xs font-mono font-bold text-purple-300 group-hover:bg-purple-500 group-hover:text-black shrink-0">
                  {opt.label}
                </span>
                <span className="pt-0.5">{opt.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STAGE 3: QUESTION FEEDBACK & RIGOROUS EXPLANATION */}
      {stage === 'QUESTION_FEEDBACK' && currentQ && (
        <div className="max-w-3xl mx-auto py-6 space-y-6">
          {(() => {
            const isMatch = selectedLabel === currentQ.correctLabel;
            return (
              <div
                className={`p-6 sm:p-8 rounded-2xl border ${
                  isMatch
                    ? 'bg-purple-950/40 border-purple-400/60 shadow-[0_0_30px_rgba(168,85,247,0.2)]'
                    : 'bg-slate-900/80 border-slate-700 shadow-xl'
                } space-y-5`}
              >
                <div className="flex items-center gap-3">
                  {isMatch ? (
                    <CheckCircle2 className="w-7 h-7 text-purple-300 shrink-0" />
                  ) : (
                    <XCircle className="w-7 h-7 text-rose-400 shrink-0" />
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-white font-serif-title">
                      {isMatch
                        ? 'Accurate Deduction!'
                        : `Alternate Interpretation (Intended Answer: ${currentQ.correctLabel})`}
                    </h3>
                    <p className="text-xs text-slate-400">
                      You chose Option {selectedLabel}.
                    </p>
                  </div>
                </div>

                {/* Key Clue Banner */}
                <div className="p-4 rounded-xl bg-purple-950/50 border border-purple-700/40 flex items-start gap-3 text-xs text-purple-200">
                  <Lightbulb className="w-4 h-4 text-purple-300 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Critical Clue:</strong>
                    {currentQ.keyClue}
                  </div>
                </div>

                {/* Detailed Scientific & Logical Explanation */}
                <div className="p-5 rounded-xl bg-black/60 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
                  <span className="font-semibold text-purple-300 block">
                    Logical & Perceptual Analysis:
                  </span>
                  <p>{currentQ.explanation}</p>
                </div>

                {/* Cognitive Bias Challenged */}
                <div className="p-4 rounded-xl bg-black/40 border border-slate-800 text-xs text-slate-400 space-y-1">
                  <span className="font-mono text-purple-400 text-[11px] uppercase tracking-wider block">
                    Cognitive Bias Audited:
                  </span>
                  <p>{currentQ.biasChallenged}</p>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-black bg-purple-300 hover:bg-purple-200 transition-colors shadow-lg active:scale-95 flex items-center gap-2"
                  >
                    <span>
                      {currentIdx + 1 < PERCEPTION_QUESTIONS.length
                        ? 'Next Scenario'
                        : 'View Perception Assessment'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* STAGE 4: RESULTS */}
      {stage === 'RESULTS' && (
        <div className="max-w-3xl mx-auto py-8 space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-semibold text-purple-400 uppercase tracking-widest">
              Challenge Complete · Perceptual Audit
            </span>
            <h2 className="text-3xl font-extrabold text-white font-serif-title">
              Reality Glitch Assessment
            </h2>
            <div className="text-4xl font-black text-purple-300 font-mono tracking-tight pt-1">
              {score} / 5
              <span className="text-base text-slate-400 font-normal ml-3">
                ({Math.round((score / 5) * 100)}% Aligned Deductions)
              </span>
            </div>
            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              {score >= 4
                ? 'High vigilance against hasty cognitive closure. You checked physical premises and avoided unverified assumptions.'
                : 'Instructive exercise in perceptual framing. Remember that intuitive plausibility does not equal conclusive proof.'}
            </p>
          </div>

          {/* Scenario Review Cards */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-400">
              Scenario-by-Scenario Audit & Critical Clues
            </h3>
            {PERCEPTION_QUESTIONS.map((q, idx) => {
              const userChoice = userChoices[idx];
              const isMatch = userChoice === q.correctLabel;

              return (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-[#141224]/80 border border-slate-800 text-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200 text-sm">
                      {q.id}. {q.title}
                    </span>
                    <span
                      className={`font-mono font-bold ${
                        isMatch ? 'text-purple-300' : 'text-slate-400'
                      }`}
                    >
                      Your Choice: {userChoice} {isMatch ? '(Aligned)' : `(Intended: ${q.correctLabel})`}
                    </span>
                  </div>
                  <div className="text-slate-400 leading-relaxed">
                    <strong className="text-purple-300">Key Clue:</strong> {q.keyClue}
                  </div>
                  <p className="text-slate-400 italic bg-black/40 p-3 rounded-lg border border-slate-800/80">
                    {q.explanation}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Perspective Reflection */}
          <div className="p-6 rounded-2xl bg-purple-950/30 border border-purple-800/40 text-xs text-slate-300 leading-relaxed space-y-2">
            <h4 className="text-purple-300 font-semibold text-sm">
              Reflective Summary: The Trap of Premature Certainty
            </h4>
            <p>
              When confronted with an unexplained scenario, human cognition naturally abhors vacuum and swiftly fabricates a cohesive narrative. Real-world perception requires holding judgment in superposition until all vantage angles, lighting conditions, and procedural methods are verified.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={startGame}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-purple-300 hover:bg-purple-200 shadow-[0_0_20px_rgba(192,132,252,0.3)] transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>PLAY AGAIN</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onReturnToLab();
              }}
              className="px-6 py-3 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
            >
              RETURN TO COGNI-Q+ LAB
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
