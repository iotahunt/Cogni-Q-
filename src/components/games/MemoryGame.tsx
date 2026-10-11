import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Brain,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ShieldAlert,
} from 'lucide-react';
import { sound } from '../../utils/sound';

interface MemoryGameProps {
  onReturnToLab: () => void;
  onCompleteGame: (score: number, total: number, completed: boolean) => void;
}

type MemoryStage = 'INTRO' | 'MEMORIZE' | 'RECALL' | 'FAILED' | 'SUCCESS';

export const MemoryGame: React.FC<MemoryGameProps> = ({
  onReturnToLab,
  onCompleteGame,
}) => {
  const [stage, setStage] = useState<MemoryStage>('INTRO');
  const [grid, setGrid] = useState<number[]>([]); // 9 numbers in order of index 0..8
  const [currentTarget, setCurrentTarget] = useState(1); // 1..9
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [wrongIndex, setWrongIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(5.0);
  const [isPracticeMode, setIsPracticeMode] = useState(false);

  const timerRef = useRef<number | null>(null);

  // Generate randomized 1..9 arrangement
  const startNewRound = (practice = isPracticeMode) => {
    setIsPracticeMode(practice);
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => 0.5 - Math.random());
    setGrid(numbers);
    setCurrentTarget(1);
    setSelectedIndices([]);
    setWrongIndex(null);
    setTimeLeft(5.0);
    setStage('MEMORIZE');
    sound.playTick();

    const startTime = Date.now();
    const duration = 5000;

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, (duration - elapsed) / 1000);
      setTimeLeft(Number(remaining.toFixed(1)));

      if (remaining <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        setStage('RECALL');
        sound.playBell();
      }
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleTileClick = (index: number) => {
    if (stage !== 'RECALL') return;
    if (selectedIndices.includes(index)) return; // Already completed tile

    const numberAtTile = grid[index];

    if (numberAtTile === currentTarget) {
      // Correct tile in sequence!
      sound.playSuccess();
      const nextSelected = [...selectedIndices, index];
      setSelectedIndices(nextSelected);

      if (currentTarget === 9) {
        // Complete victory!
        setStage('SUCCESS');
        sound.playBell();
        if (!isPracticeMode) {
          onCompleteGame(9, 9, true);
        }
      } else {
        setCurrentTarget((prev) => prev + 1);
      }
    } else {
      // Wrong tile selected: immediately end round
      sound.playError();
      setWrongIndex(index);
      setStage('FAILED');
      if (!isPracticeMode) {
        const correctCount = currentTarget - 1;
        onCompleteGame(correctCount, 9, false);
      }
    }
  };

  const correctCount = currentTarget - 1;

  return (
    <div className="relative min-h-[90vh] bg-[#0c101c] text-slate-100 p-4 sm:p-6 lg:p-8 overflow-hidden select-none">
      {/* Calm, meditative background gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-indigo-900/15 via-purple-900/10 to-slate-900/20 blur-[140px] rounded-full pointer-events-none" />

      {/* Top Header Bar */}
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-indigo-950/80 pb-4 mb-6">
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
          <div className="px-3 py-1 rounded bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-bold">
            DOMAIN 02 · MEMORY
          </div>
          {isPracticeMode && (
            <span className="text-[11px] font-mono text-purple-300 uppercase px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/40">
              Practice Mode
            </span>
          )}
        </div>
      </div>

      {/* STAGE 1: INTRO SCREEN */}
      {stage === 'INTRO' && (
        <div className="max-w-3xl mx-auto space-y-8 py-6">
          <div className="space-y-3">
            <div className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
              <Brain className="w-4 h-4 text-indigo-400" />
              <span>Challenge 02 · The Sequence Recall</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-serif-title tracking-tight">
              MEMORY: HOLD WHAT MATTERS
            </h1>
            <p className="text-indigo-300/80 font-mono text-xs uppercase tracking-wider">
              Spatial Working Memory Encoding & Sequential Retrieval
            </p>
          </div>

          <div className="space-y-4 text-sm text-slate-300 leading-relaxed bg-[#111728]/80 p-6 rounded-2xl border border-indigo-500/30 shadow-[0_0_25px_rgba(99,102,241,0.1)]">
            <p>
              Memory is the cognitive system that allows us to encode, retain, and retrieve information. It supports everything from remembering instructions and recognizing patterns to learning new skills and recalling past experiences.
            </p>
            <p>
              In the digital age, we often outsource remembering to search engines, reminders, and digital notes while simultaneously exposing ourselves to a continuous stream of new information. Frequent interruptions may interfere with how information is encoded and later retrieved.
            </p>
            <p className="text-indigo-200 font-medium">
              In this challenge, you will briefly observe a numbered grid. Once the numbers disappear, you must reconstruct the sequence from memory by selecting the tiles in the correct order.
            </p>
            <p className="font-semibold text-white">
              Observe carefully. Build a mental map. Recall what you saw.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
              <h2 className="text-slate-200 font-semibold flex items-center gap-1.5 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Protocol Rules</span>
              </h2>
              <ul className="text-slate-400 space-y-1 list-disc list-inside">
                <li>Study the 3×3 grid for exactly 5 seconds.</li>
                <li>When numbers vanish, click 1, then 2, 3... through 9.</li>
                <li>One error immediately halts the sequence.</li>
                <li>Completed tiles lock in place permanently.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
              <h2 className="text-slate-200 font-semibold flex items-center gap-1.5 text-xs">
                <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
                <span>Cognitive Modality</span>
              </h2>
              <p className="text-slate-400 leading-relaxed">
                Tests visuospatial working memory sketchpad and sequential trajectory chunking. Does not diagnose clinical memory conditions.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => startNewRound(false)}
              className="px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 rounded-xl hover:from-indigo-500 hover:to-purple-500 shadow-[0_0_25px_rgba(99,102,241,0.35)] transition-all active:scale-95"
            >
              START CHALLENGE
            </button>

            <button
              onClick={() => startNewRound(true)}
              className="px-5 py-3.5 text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors"
            >
              Practice Mode (Unlimited)
            </button>
          </div>
        </div>
      )}

      {/* STAGE 2: MEMORIZE & RECALL GRIDS */}
      {(stage === 'MEMORIZE' || stage === 'RECALL') && (
        <div className="max-w-xl mx-auto py-8 space-y-6 text-center">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-indigo-400">
              {stage === 'MEMORIZE' ? 'Phase 1 · Memorization' : 'Phase 2 · Sequential Recall'}
            </div>
            <h2 className="text-2xl font-bold text-white font-serif-title">
              {stage === 'MEMORIZE' ? 'Map the Grid (5 Seconds)' : `Select Target Number: ${currentTarget}`}
            </h2>
            <p className="text-xs text-slate-400">
              {stage === 'MEMORIZE'
                ? `Numbers disappear in ${timeLeft.toFixed(1)}s. Trace a path in your mind.`
                : `Progress: ${selectedIndices.length}/9 tiles recalled in sequence.`}
            </p>
          </div>

          {/* Progress bar for 5-second phase */}
          {stage === 'MEMORIZE' && (
            <div className="w-full max-w-xs mx-auto h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-400 to-cyan-400 transition-all duration-100 ease-linear"
                style={{ width: `${(timeLeft / 5.0) * 100}%` }}
              />
            </div>
          )}

          {/* 3x3 Grid Display */}
          <div className="p-6 rounded-2xl bg-[#0f1424]/90 border border-indigo-900/60 shadow-[0_0_40px_rgba(99,102,241,0.15)] inline-block">
            <div className="grid grid-cols-3 gap-3.5 sm:gap-4 w-64 h-64 sm:w-80 sm:h-80 mx-auto">
              {grid.map((num, idx) => {
                const isSelected = selectedIndices.includes(idx);
                const isMemorizePhase = stage === 'MEMORIZE';

                return (
                  <button
                    key={idx}
                    disabled={stage !== 'RECALL' || isSelected}
                    onClick={() => handleTileClick(idx)}
                    className={`relative rounded-xl border flex items-center justify-center transition-all duration-200 text-2xl sm:text-3xl font-mono font-bold ${
                      isMemorizePhase
                        ? 'bg-indigo-950/60 border-indigo-500/50 text-indigo-200 shadow-[0_0_15px_rgba(99,102,241,0.15)]'
                        : isSelected
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-default'
                        : 'bg-[#141b2f] border-slate-800 text-transparent hover:border-indigo-400/80 hover:bg-[#1a233d] hover:scale-102 active:scale-95 cursor-pointer'
                    }`}
                  >
                    {isMemorizePhase && <span>{num}</span>}
                    {!isMemorizePhase && isSelected && <span>{num}</span>}
                    {!isMemorizePhase && !isSelected && (
                      <span className="text-slate-700 text-sm font-sans">?</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-xs font-mono text-slate-500">
            {stage === 'RECALL'
              ? 'Click tiles in order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9'
              : 'Encoding numbers into spatial working memory'}
          </div>
        </div>
      )}

      {/* STAGE 3: FAILED OR SUCCESS COMPLETION VIEW */}
      {(stage === 'FAILED' || stage === 'SUCCESS') && (
        <div className="max-w-2xl mx-auto py-8 space-y-8">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              {stage === 'SUCCESS' ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              ) : (
                <XCircle className="w-8 h-8 text-rose-400" />
              )}
            </div>

            <h2 className="text-3xl font-extrabold text-white font-serif-title">
              {stage === 'SUCCESS' ? 'Sequence Reconstructed!' : 'Sequence Broken'}
            </h2>

            <div className="text-4xl font-black text-indigo-300 font-mono tracking-tight pt-1">
              {stage === 'SUCCESS' ? '9 / 9' : `${correctCount} / 9`}
              <span className="text-sm text-slate-400 font-normal ml-3">
                {stage === 'SUCCESS'
                  ? 'Flawless Recall'
                  : `Halted at target ${currentTarget}`}
              </span>
            </div>

            <p className="text-sm text-slate-300 max-w-md mx-auto">
              {stage === 'SUCCESS'
                ? 'You completely retained the 9-point spatial map and reconstructed the trajectory in flawless sequence.'
                : `You successfully retrieved ${correctCount} consecutive positions before the spatial trace encountered interference.`}
            </p>
          </div>

          {/* Grid Truth Reveal */}
          <div className="p-6 rounded-2xl bg-[#0f1424]/90 border border-slate-800 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-indigo-400 flex items-center justify-between">
              <span>Original Arrangement Truth</span>
              <span className="text-slate-400">Green = Reconstructed · Red = Missed</span>
            </div>

            <div className="grid grid-cols-3 gap-3 w-64 h-64 mx-auto">
              {grid.map((num, idx) => {
                const wasCorrectlySelected = selectedIndices.includes(idx);
                const wasWrongClick = wrongIndex === idx;

                return (
                  <div
                    key={idx}
                    className={`rounded-xl border flex flex-col items-center justify-center font-mono font-bold text-xl ${
                      wasCorrectlySelected
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                        : wasWrongClick
                        ? 'bg-rose-950/70 border-rose-500 text-rose-300'
                        : 'bg-slate-900/80 border-slate-700 text-slate-300'
                    }`}
                  >
                    <span>{num}</span>
                    <span className="text-[10px] text-slate-400 font-sans font-normal">
                      {wasCorrectlySelected ? 'Recalled' : wasWrongClick ? 'Mistake' : 'Remaining'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cognitive Science Reflection */}
          <div className="p-5 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-slate-300 leading-relaxed space-y-2">
            <span className="text-indigo-300 font-semibold block">
              Cognitive Insight: Visual Chunking & Working Memory
            </span>
            <p>
              Human working memory typically encodes 3 to 4 distinct visual items comfortably. Recalling a 9-item randomized matrix requires constructing higher-order spatial pathways (chunking numbers into triangular or linear routes) during the brief 5-second encoding window.
            </p>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                sound.playClick();
                startNewRound(false);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>TRY AGAIN</span>
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
