import React, { useState } from 'react';
import {
  ArrowLeft,
  RotateCcw,
  Compass,
  Sparkles,
  HelpCircle,
  ArrowRight,
  BookOpen,
  Scale,
  Feather,
} from 'lucide-react';
import { DECISION_SCENARIOS, calculateDecisionProfile } from '../../data/gameContent';
import { DecisionScenario, DecisionProfile } from '../../types/cognition';
import { sound } from '../../utils/sound';

interface DecisionGameProps {
  onReturnToLab: () => void;
  onCompleteGame: (profileTitle: string, choices: ('A' | 'B')[]) => void;
}

type DecisionStage = 'INTRO' | 'PLAYING' | 'INTERMEDIATE_CONFIRM' | 'PROFILE';

export const DecisionGame: React.FC<DecisionGameProps> = ({
  onReturnToLab,
  onCompleteGame,
}) => {
  const [stage, setStage] = useState<DecisionStage>('INTRO');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [choices, setChoices] = useState<('A' | 'B')[]>([]);
  const [lastSelectedChoice, setLastSelectedChoice] = useState<'A' | 'B' | null>(null);

  const currentScenario: DecisionScenario = DECISION_SCENARIOS[currentIdx];

  const startGame = () => {
    setCurrentIdx(0);
    setChoices([]);
    setLastSelectedChoice(null);
    setStage('PLAYING');
    sound.playClick();
  };

  const handleCommitChoice = (choice: 'A' | 'B') => {
    setLastSelectedChoice(choice);
    sound.playBell();

    const nextChoices = [...choices, choice];
    setChoices(nextChoices);
    setStage('INTERMEDIATE_CONFIRM');
  };

  const handleNextScenario = () => {
    sound.playClick();
    setLastSelectedChoice(null);

    if (currentIdx + 1 < DECISION_SCENARIOS.length) {
      setCurrentIdx((prev) => prev + 1);
      setStage('PLAYING');
    } else {
      // Completed all 5 decisions -> calculate profile
      const profile = calculateDecisionProfile(choices);
      onCompleteGame(profile.title, choices);
      setStage('PROFILE');
    }
  };

  const activeProfile: DecisionProfile | null =
    stage === 'PROFILE' ? calculateDecisionProfile(choices) : null;

  return (
    <div className="relative min-h-[90vh] bg-[#09090b] text-[#f4efe6] p-4 sm:p-6 lg:p-8 overflow-hidden select-none">
      {/* Luxury gold & ivory ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-600/10 via-yellow-500/5 to-transparent blur-[160px] rounded-full pointer-events-none" />

      {/* Top Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-amber-500/20 pb-4 mb-6">
        <button
          onClick={() => {
            sound.playClick();
            onReturnToLab();
          }}
          className="inline-flex items-center gap-2 text-xs font-semibold text-amber-200/70 hover:text-amber-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Lab</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
            DOMAIN 05 · DECISION-MAKING
          </div>
          {stage !== 'INTRO' && stage !== 'PROFILE' && (
            <div className="text-xs font-mono text-amber-300/70">
              Dilemma <span className="text-amber-300 font-bold">{currentIdx + 1}</span> of 5
            </div>
          )}
        </div>
      </div>

      {/* STAGE 1: INTRO */}
      {stage === 'INTRO' && (
        <div className="max-w-3xl mx-auto space-y-8 py-6">
          <div className="space-y-3">
            <div className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-widest flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-300" />
              <span>Challenge 05 · The Moral Compass</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-tech-title tracking-tight">
              DECISION-MAKING: THE WEIGHT OF A CHOICE
            </h1>
            <p className="text-amber-300/80 font-mono text-xs uppercase tracking-wider">
              Values, Competing Priorities & Trade-offs Under Uncertainty
            </p>
          </div>

          <div className="space-y-4 text-sm text-[#e8e2d5] leading-relaxed bg-[#111115]/90 p-6 sm:p-8 rounded-2xl border border-amber-500/30 shadow-[0_0_30px_rgba(217,119,6,0.15)]">
            <p>
              Decision-making is the cognitive process of evaluating alternatives and selecting a course of action. It can involve incomplete information, competing goals, emotional responses, social expectations, and uncertainty about consequences.
            </p>
            <p>
              In the digital age, we are constantly asked to choose quickly: what to believe, what to prioritize, what to share, and what to ignore. Fast decisions can be shaped by framing, immediate rewards, personal values, and the information available at the moment.
            </p>
            <p className="text-amber-200">
              In this challenge, you will face five difficult scenarios with two competing options. There is no predetermined correct answer. Each choice reveals something about the priorities you express in that particular situation.
            </p>
            <p className="font-semibold text-white">
              Choose honestly. Consider the trade-off. Discover the patterns in your decisions.
            </p>
          </div>

          {/* Exhibition Artwork Visual Card */}
          <div className="relative rounded-2xl overflow-hidden border border-amber-500/25 bg-black/80 flex items-center">
            <div className="w-1/3 aspect-[4/3] overflow-hidden">
              <img
                src="/src/assets/images/cogni_moral_compass_1791699524852.jpg"
                alt="Minimalist sculpture of moral choices and scales"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div className="w-2/3 p-4 sm:p-6 text-xs text-amber-200/90 space-y-1.5">
              <span className="font-semibold text-amber-300 block font-tech-title text-sm">Non-Judgemental Reflective Engine</span>
              <p className="text-slate-400 leading-relaxed font-sans">
                Neither choice is rewarded or condemned. Your series of selections generates a nuanced philosophical archetype analyzing 10 ethical dimensions.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 text-xs text-amber-200/70 flex items-start gap-2.5 font-sans">
            <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong>Disclaimer:</strong> Your results describe patterns in your answers to these fictional dilemmas. They are reflective interpretations, not a validated psychological personality assessment.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-center">
            <button
              onClick={startGame}
              className="px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-black bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-500 rounded-xl hover:from-amber-100 hover:to-yellow-400 shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all active:scale-95"
            >
              START CHALLENGE
            </button>
          </div>
        </div>
      )}

      {/* STAGE 2: ACTIVE DILEMMA QUESTION */}
      {stage === 'PLAYING' && currentScenario && (
        <div className="max-w-3xl mx-auto py-6 space-y-7">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
              Dilemma 0{currentScenario.id} of 5
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-tech-title">
              {currentScenario.title}
            </h2>
          </div>

          {/* Dilemma Narrative */}
          <div className="p-7 rounded-2xl bg-[#111116]/95 border border-amber-500/30 text-base sm:text-lg text-[#f2ede4] leading-relaxed shadow-xl">
            &ldquo;{currentScenario.scenario}&rdquo;
          </div>

          {/* Trade-off Notice Banner */}
          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/25 flex items-center gap-2.5 text-xs text-amber-200 font-sans">
            <Scale className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{currentScenario.tradeoffNotice}</span>
          </div>

          {/* Option A & Option B Decision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
            {/* Option A */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-[#121217] hover:border-amber-400/80 transition-all flex flex-col justify-between space-y-5 group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-amber-950/80 border border-amber-500/40 flex items-center justify-center font-mono font-bold text-xs text-amber-300">
                    A
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">Choice Pathway</span>
                </div>
                <p className="text-sm text-[#e8e2d5] leading-relaxed">
                  {currentScenario.optionA.text}
                </p>
              </div>

              <button
                onClick={() => handleCommitChoice('A')}
                className="w-full py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-amber-300 hover:bg-amber-200 transition-colors shadow-md active:scale-95"
              >
                Commit to Choice A
              </button>
            </div>

            {/* Option B */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-[#121217] hover:border-amber-400/80 transition-all flex flex-col justify-between space-y-5 group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-amber-950/80 border border-amber-500/40 flex items-center justify-center font-mono font-bold text-xs text-amber-300">
                    B
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">Choice Pathway</span>
                </div>
                <p className="text-sm text-[#e8e2d5] leading-relaxed">
                  {currentScenario.optionB.text}
                </p>
              </div>

              <button
                onClick={() => handleCommitChoice('B')}
                className="w-full py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-amber-300 hover:bg-amber-200 transition-colors shadow-md active:scale-95"
              >
                Commit to Choice B
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 3: INTERMEDIATE NEUTRAL CONFIRMATION */}
      {stage === 'INTERMEDIATE_CONFIRM' && currentScenario && (
        <div className="max-w-2xl mx-auto py-12 space-y-6 text-center">
          <div className="p-8 rounded-3xl bg-[#121218] border border-amber-500/30 shadow-2xl space-y-5">
            <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300">
              <Feather className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-white font-tech-title">
              Choice Recorded
            </h3>

            <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">
              You selected Option {lastSelectedChoice}:
            </p>

            <p className="text-sm text-[#f0eade] italic max-w-lg mx-auto bg-black/40 p-4 rounded-xl border border-slate-800">
              &ldquo;
              {lastSelectedChoice === 'A'
                ? currentScenario.optionA.text
                : currentScenario.optionB.text}
              &rdquo;
            </p>

            <p className="text-xs text-amber-200/80 font-sans">
              Your priority in this dilemma has been incorporated into your cognitive profile.
            </p>

            <div className="pt-2">
              <button
                onClick={handleNextScenario}
                className="px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-amber-300 hover:bg-amber-200 transition-colors shadow-lg active:scale-95 flex items-center gap-2 mx-auto"
              >
                <span>
                  {currentIdx + 1 < DECISION_SCENARIOS.length
                    ? 'Proceed to Next Dilemma'
                    : 'Generate Reflective Profile'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 4: PERSONALITY & REFLECTION PROFILE */}
      {stage === 'PROFILE' && activeProfile && (
        <div className="max-w-4xl mx-auto py-8 space-y-10">
          {/* Profile Header */}
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-widest">
              Dynamic Cognitive Profile · {choices.join(' - ')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-tech-title">
              {activeProfile.title}
            </h2>
            <p className="text-sm sm:text-base text-amber-200/90 italic">
              &ldquo;{activeProfile.subtitle}&rdquo;
            </p>
          </div>

          {/* Overview Statement */}
          <div className="p-7 rounded-2xl bg-[#121218]/95 border border-amber-500/30 text-sm sm:text-base text-[#eee7da] leading-relaxed shadow-xl">
            {activeProfile.summary}
          </div>

          {/* Prominent Themes */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase text-amber-400 tracking-wider">
              Prominent Recurring Dimensions In Your Answers
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {activeProfile.prominentThemes.map((th, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-950/40 border border-amber-500/30 text-xs font-medium text-amber-200"
                >
                  ✦ {th}
                </span>
              ))}
            </div>
          </div>

          {/* Balanced Strengths & Trade-offs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm font-sans">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h4 className="text-amber-300 font-semibold text-sm flex items-center gap-2">
                <span>Characteristic Strengths</span>
              </h4>
              <ul className="text-slate-300 space-y-2 list-disc list-inside">
                {activeProfile.strengths.map((str, i) => (
                  <li key={i}>{str}</li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h4 className="text-amber-300 font-semibold text-sm flex items-center gap-2">
                <span>Ethical Tensions & Trade-offs</span>
              </h4>
              <ul className="text-slate-300 space-y-2 list-disc list-inside">
                {activeProfile.tradeoffs.map((tr, i) => (
                  <li key={i}>{tr}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Individual Choices & Interpretations Breakdown */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase text-amber-400 tracking-wider">
              Breakdown of Your 5 Individual Choices
            </h3>
            <div className="space-y-3">
              {DECISION_SCENARIOS.map((scen, idx) => {
                const choice = choices[idx];
                const opt = choice === 'A' ? scen.optionA : scen.optionB;

                return (
                  <div
                    key={scen.id}
                    className="p-5 rounded-2xl bg-[#111116] border border-slate-800 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white text-sm font-tech-title">
                        {scen.id}. {scen.title}
                      </span>
                      <span className="font-mono text-amber-300 font-bold px-2 py-0.5 rounded bg-amber-950/60 border border-amber-600/40">
                        Chose Option {choice}
                      </span>
                    </div>
                    <p className="text-slate-400 italic">&ldquo;{opt.text}&rdquo;</p>
                    <div className="p-3 rounded-lg bg-black/40 border border-slate-800/80 text-amber-200/90 leading-relaxed font-sans">
                      <strong className="text-amber-300">Interpretation: </strong>
                      {opt.interpretation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3 Reflection Questions */}
          <div className="p-6 rounded-2xl bg-amber-950/20 border border-amber-500/25 space-y-3">
            <h4 className="text-amber-300 font-semibold text-sm font-tech-title flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Questions for Your Ongoing Reflection</span>
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-slate-300">
              {activeProfile.reflectionQuestions.map((q, i) => (
                <p key={i} className="italic">
                  {i + 1}. &ldquo;{q}&rdquo;
                </p>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={startGame}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-amber-300 hover:bg-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RETAKE THE CHALLENGE</span>
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
