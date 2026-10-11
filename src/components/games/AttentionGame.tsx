import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Bell,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Zap,
  Info,
} from 'lucide-react';
import {
  ATTENTION_QUESTIONS_POOL,
  ATTENTION_NOTIFICATIONS,
} from '../../data/gameContent';
import { AttentionQuestion, AttentionRoundResult } from '../../types/cognition';
import { sound } from '../../utils/sound';

interface AttentionGameProps {
  onReturnToLab: () => void;
  onCompleteGame: (score: number, total: number, percentage: number) => void;
}

type GameStage = 'INTRO' | 'MEMORIZE' | 'ANSWER' | 'ROUND_FEEDBACK' | 'SUMMARY';

interface ActiveNotification {
  id: number;
  text: string;
  top: string;
  left: string;
  color: string;
}

export const AttentionGame: React.FC<AttentionGameProps> = ({
  onReturnToLab,
  onCompleteGame,
}) => {
  const [stage, setStage] = useState<GameStage>('INTRO');
  const [currentRound, setCurrentRound] = useState(0);
  const [sessionQuestions, setSessionQuestions] = useState<AttentionQuestion[]>([]);
  const [results, setResults] = useState<AttentionRoundResult[]>([]);
  const [timeLeft, setTimeLeft] = useState(10.0);
  const [activeNotifications, setActiveNotifications] = useState<ActiveNotification[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const timerRef = useRef<number | null>(null);
  const notificationIntervalRef = useRef<number | null>(null);

  // Initialize a fresh 5-question session from the pool
  const initGame = () => {
    // Shuffle and pick 5
    const shuffled = [...ATTENTION_QUESTIONS_POOL].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);
    setSessionQuestions(selected);
    setCurrentRound(0);
    setResults([]);
    setStage('MEMORIZE');
    startMemorizePhase();
  };

  const startMemorizePhase = () => {
    setTimeLeft(10.0);
    setActiveNotifications([]);
    sound.playTick();

    const startTime = Date.now();
    const duration = 10000;

    // Progress timer
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, (duration - elapsed) / 1000);
      setTimeLeft(Number(remaining.toFixed(1)));

      if (remaining <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        if (notificationIntervalRef.current) clearInterval(notificationIntervalRef.current);
        setActiveNotifications([]);
        setStage('ANSWER');
        sound.playBell();
      }
    }, 100);

    // Chaotic notifications spawning
    if (notificationIntervalRef.current) clearInterval(notificationIntervalRef.current);
    let notifCounter = 0;
    notificationIntervalRef.current = window.setInterval(() => {
      notifCounter++;
      const randomText =
        ATTENTION_NOTIFICATIONS[Math.floor(Math.random() * ATTENTION_NOTIFICATIONS.length)];

      const colors = [
        'bg-pink-600/90 text-white border-pink-400',
        'bg-cyan-600/90 text-white border-cyan-400',
        'bg-amber-600/90 text-white border-amber-300',
        'bg-rose-700/90 text-white border-rose-400',
        'bg-purple-600/90 text-white border-purple-300',
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      // Position along perimeter or top, strictly never blocking the bottom answer cards
      const topPositions = ['8%', '14%', '20%', '26%', '32%'];
      const leftPositions = ['4%', '12%', '72%', '80%', '86%'];

      const newNotif: ActiveNotification = {
        id: notifCounter,
        text: randomText,
        top: topPositions[Math.floor(Math.random() * topPositions.length)],
        left: leftPositions[Math.floor(Math.random() * leftPositions.length)],
        color: randomColor,
      };

      sound.playGlitch();
      setActiveNotifications((prev) => [...prev.slice(-4), newNotif]);
    }, 700);
  };

  // Clean up all timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (notificationIntervalRef.current) clearInterval(notificationIntervalRef.current);
    };
  }, []);

  const handleSelectAnswer = (index: number) => {
    if (selectedOption !== null) return; // Prevent double click
    setSelectedOption(index);

    const question = sessionQuestions[currentRound];
    const isCorrect = index === question.correctIndex;

    if (isCorrect) sound.playSuccess();
    else sound.playError();

    const roundResult: AttentionRoundResult = {
      round: currentRound + 1,
      topic: question.topic,
      statement: question.originalStatement,
      userAnswerIndex: index,
      correctIndex: question.correctIndex,
      isCorrect,
      explanation: question.explanation,
    };

    setResults((prev) => [...prev, roundResult]);
    setStage('ROUND_FEEDBACK');
  };

  const handleNextRound = () => {
    sound.playClick();
    setSelectedOption(null);
    if (currentRound + 1 < sessionQuestions.length) {
      setCurrentRound((prev) => prev + 1);
      setStage('MEMORIZE');
      startMemorizePhase();
    } else {
      // Game completed
      const totalScore = results.filter((r) => r.isCorrect).length;
      const pct = Math.round((totalScore / sessionQuestions.length) * 100);
      onCompleteGame(totalScore, sessionQuestions.length, pct);
      setStage('SUMMARY');
    }
  };

  const currentQuestion = sessionQuestions[currentRound];
  const score = results.filter((r) => r.isCorrect).length;

  return (
    <div className="relative min-h-[90vh] bg-black text-slate-100 p-4 sm:p-6 lg:p-8 overflow-hidden select-none">
      {/* Neon glitch aura in background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Header Bar */}
      <div className="max-w-5xl mx-auto flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
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
          <div className="px-3 py-1 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono font-bold">
            DOMAIN 01 · ATTENTION
          </div>
          {stage !== 'INTRO' && stage !== 'SUMMARY' && (
            <div className="text-xs font-mono text-slate-400">
              Round <span className="text-cyan-400 font-bold">{currentRound + 1}</span> of 5
            </div>
          )}
        </div>
      </div>

      {/* STAGE 1: INTRO SCREEN */}
      {stage === 'INTRO' && (
        <div className="max-w-3xl mx-auto space-y-8 py-6">
          <div className="space-y-3">
            <div className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
              <Zap className="w-4 h-4 text-pink-500 animate-pulse" />
              <span>Challenge 01 · The Distraction Protocol</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-serif-title tracking-tight">
              ATTENTION: THE WAR FOR YOUR FOCUS
            </h1>
            <p className="text-pink-400 font-mono text-xs uppercase tracking-wider">
              High-Entropy Sensory Interference Environment
            </p>
          </div>

          <div className="space-y-4 text-sm text-slate-300 leading-relaxed bg-slate-950/90 p-6 rounded-2xl border border-cyan-500/30 shadow-[0_0_25px_rgba(6,182,212,0.15)]">
            <p>
              Attention is the cognitive process that allows us to select relevant information while filtering out competing stimuli. It helps us concentrate on a task, notice important details, and resist distractions.
            </p>
            <p>
              In today&apos;s digital environment, notifications, short-form videos, messages, memes, and constantly changing information compete for our limited attention. Switching between competing stimuli can make it harder to maintain focus on a single task.
            </p>
            <p className="text-cyan-300 font-medium">
              In this challenge, you will briefly study a scientific statement while a stream of irrelevant notifications competes for your attention. Once the statement disappears, you must identify the original fact from three similar alternatives.
            </p>
            <p className="font-semibold text-white">
              Can you protect the important information from the noise?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h2 className="text-slate-200 font-semibold flex items-center gap-1.5 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>How to Play</span>
              </h2>
              <ul className="text-slate-400 space-y-1 list-disc list-inside">
                <li>Study the scientific card during its 10-second window.</li>
                <li>Ignore notifications sliding into your peripheral vision.</li>
                <li>Select the exact original fact from the 3 choices.</li>
                <li>5 consecutive rounds per session.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h2 className="text-slate-200 font-semibold flex items-center gap-1.5 text-xs">
                <AlertTriangle className="w-3.5 h-3.5 text-pink-400" />
                <span>Simulated Cognitive Model</span>
              </h2>
              <p className="text-slate-400 leading-relaxed">
                This challenge models selective sensory gating and attentional bottlenecks. It is an educational simulation, not a clinical diagnostic assessment.
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-center">
            <button
              onClick={() => {
                sound.playClick();
                initGame();
              }}
              className="px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-pink-400 to-cyan-300 rounded-xl hover:from-cyan-300 hover:to-pink-300 shadow-[0_0_30px_rgba(236,72,153,0.35)] transition-all active:scale-95"
            >
              START CHALLENGE
            </button>
          </div>
        </div>
      )}

      {/* STAGE 2: MEMORIZE PHASE (10 SECONDS + CHAOTIC NOTIFICATIONS) */}
      {stage === 'MEMORIZE' && currentQuestion && (
        <div className="relative max-w-3xl mx-auto py-12 min-h-[460px] flex flex-col justify-center">
          {/* Floating chaotic notifications */}
          {activeNotifications.map((notif) => (
            <div
              key={notif.id}
              style={{ top: notif.top, left: notif.left }}
              className={`absolute z-30 max-w-[210px] p-2.5 rounded-lg border text-xs font-medium shadow-xl pointer-events-none transform -rotate-1 animate-glitch ${notif.color}`}
            >
              <div className="flex items-center gap-1.5 font-bold text-[10px] uppercase opacity-90">
                <Bell className="w-3 h-3" />
                <span>Notification</span>
              </div>
              <div className="mt-1 line-clamp-2">{notif.text}</div>
            </div>
          ))}

          {/* Central Target Science Card */}
          <div className="relative z-20 p-8 rounded-2xl bg-black/95 border-2 border-cyan-400 shadow-[0_0_50px_rgba(6,182,212,0.4)] text-center space-y-6 backdrop-blur-xl">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
              <span className="uppercase tracking-widest">Topic: {currentQuestion.topic}</span>
              <span className="text-pink-400 font-bold tabular-nums">
                Disappearing in {timeLeft.toFixed(1)}s
              </span>
            </div>

            {/* Countdown Progress Bar */}
            <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-pink-500 via-cyan-400 to-emerald-400 transition-all duration-100 ease-linear"
                style={{ width: `${(timeLeft / 10.0) * 100}%` }}
              />
            </div>

            <p className="text-lg sm:text-xl font-medium text-white leading-relaxed max-w-2xl mx-auto">
              &ldquo;{currentQuestion.originalStatement}&rdquo;
            </p>

            <div className="text-xs font-mono text-slate-400">
              Hold this exact statement in working memory. The noise is designed to distract you.
            </div>
          </div>
        </div>
      )}

      {/* STAGE 3: ANSWER SELECTION (NO NOTIFICATIONS, PURE CHOICE) */}
      {stage === 'ANSWER' && currentQuestion && (
        <div className="max-w-3xl mx-auto py-8 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              Recall Phase · Filter the Noise
            </span>
            <h2 className="text-2xl font-bold text-white font-serif-title">
              Which statement matches what you just read?
            </h2>
            <p className="text-xs text-slate-400">
              Topic: <strong className="text-slate-300">{currentQuestion.topic}</strong>
            </p>
          </div>

          <div className="space-y-3.5 pt-2">
            {currentQuestion.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectAnswer(idx)}
                className="w-full text-left p-5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 hover:border-cyan-400/80 transition-all text-sm text-slate-200 leading-relaxed shadow-md group focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-md bg-slate-800 border border-slate-600 flex items-center justify-center text-xs font-mono font-bold text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="pt-0.5">{opt}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STAGE 4: IMMEDIATE ROUND FEEDBACK */}
      {stage === 'ROUND_FEEDBACK' && currentQuestion && (
        <div className="max-w-3xl mx-auto py-8 space-y-6">
          {(() => {
            const isCorrect = selectedOption === currentQuestion.correctIndex;
            return (
              <div
                className={`p-6 rounded-2xl border ${
                  isCorrect
                    ? 'bg-emerald-950/40 border-emerald-500/60 shadow-[0_0_30px_rgba(16,185,129,0.2)]'
                    : 'bg-rose-950/40 border-rose-500/60 shadow-[0_0_30px_rgba(244,63,94,0.2)]'
                } space-y-5`}
              >
                <div className="flex items-center gap-3">
                  {isCorrect ? (
                    <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="w-7 h-7 text-rose-400 shrink-0" />
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-white font-serif-title">
                      {isCorrect ? 'Focus Maintained!' : 'Attentional Distortion'}
                    </h3>
                    <p className="text-xs text-slate-300">
                      {isCorrect
                        ? 'You successfully filtered out the digital noise and identified the original fact.'
                        : 'A distracting foil slipped past your selective filter.'}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/60 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                    Original Scientific Fact:
                  </div>
                  <p className="text-sm font-medium text-white leading-relaxed">
                    &ldquo;{currentQuestion.originalStatement}&rdquo;
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <span className="font-semibold text-cyan-300 block mb-1">Scientific Context:</span>
                  {currentQuestion.explanation}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNextRound}
                    className="px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-lg active:scale-95"
                  >
                    {currentRound + 1 < sessionQuestions.length ? 'Next Round' : 'View Challenge Results'}
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* STAGE 5: RESULTS SUMMARY */}
      {stage === 'SUMMARY' && (
        <div className="max-w-3xl mx-auto py-8 space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest">
              Challenge Complete · Attention Audit
            </span>
            <h2 className="text-3xl font-extrabold text-white font-serif-title">
              Focus Filter Assessment
            </h2>
            <div className="text-4xl font-black text-cyan-400 font-mono tracking-tight pt-2">
              {score} / 5
              <span className="text-base text-slate-400 font-normal ml-3">
                ({Math.round((score / 5) * 100)}% Accuracy)
              </span>
            </div>
            <p className="text-sm text-cyan-200/90 max-w-md mx-auto">
              {score === 5
                ? '5/5 — Focus maintained. Exceptional sensory filtering against ambient digital noise.'
                : score >= 3
                ? 'Solid focus. You filtered the majority of high-entropy distractions under time pressure.'
                : 'Distraction interference observed. Sensory clutter competed with working memory encoding.'}
            </p>
          </div>

          {/* Round by Round Review */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-400">
              Round-by-Round Breakdown
            </h3>
            {results.map((res, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">
                    Round {res.round}: {res.topic}
                  </span>
                  <span
                    className={`font-mono font-bold ${
                      res.isCorrect ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {res.isCorrect ? '✓ Correct' : '✗ Foil Chosen'}
                  </span>
                </div>
                <p className="text-slate-400 italic">&ldquo;{res.statement}&rdquo;</p>
              </div>
            ))}
          </div>

          {/* Cognitive Reflection */}
          <div className="p-5 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-slate-300 leading-relaxed space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold">
              <Info className="w-4 h-4" />
              <span>Cognitive Reflection: The Cost of Interruption</span>
            </div>
            <p>
              Research into attentional capture demonstrates that even task-irrelevant notifications degrade neural representations in working memory. When multiple stimuli compete for the same sensory channel, your brain expends additional executive energy merely suppressing the irrelevant signals.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                sound.playClick();
                initGame();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all active:scale-95"
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
