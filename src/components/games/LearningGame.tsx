import React, { useState } from 'react';
import {
  ArrowLeft,
  RotateCcw,
  Zap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  AlertOctagon,
  ArrowRight,
} from 'lucide-react';
import { LEARNING_QUESTIONS } from '../../data/gameContent';
import { LearningColor, LearningQuestion } from '../../types/cognition';
import { sound } from '../../utils/sound';

interface LearningGameProps {
  onReturnToLab: () => void;
  onCompleteGame: (score: number, total: number, p1Score: number, p2Score: number) => void;
}

type GameStage = 'INTRO' | 'PLAYING' | 'RULE_SHIFT_WARNING' | 'RESULTS';

const COLOR_MAP: Record<LearningColor, { textClass: string; bgClass: string; hex: string }> = {
  RED: {
    textClass: 'text-rose-500',
    bgClass: 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-900/40',
    hex: '#f43f5e',
  },
  BLUE: {
    textClass: 'text-sky-400',
    bgClass: 'bg-sky-500 hover:bg-sky-600 text-white shadow-sky-900/40',
    hex: '#38bdf8',
  },
  GREEN: {
    textClass: 'text-emerald-400',
    bgClass: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-900/40',
    hex: '#34d399',
  },
  YELLOW: {
    textClass: 'text-amber-300',
    bgClass: 'bg-amber-400 hover:bg-amber-500 text-black shadow-amber-900/40',
    hex: '#fde047',
  },
};

const COLOR_OPTIONS: LearningColor[] = ['RED', 'BLUE', 'GREEN', 'YELLOW'];

export const LearningGame: React.FC<LearningGameProps> = ({
  onReturnToLab,
  onCompleteGame,
}) => {
  const [stage, setStage] = useState<GameStage>('INTRO');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<{ isCorrect: boolean; rulePhase: 1 | 2 }[]>([]);
  const [lastFeedback, setLastFeedback] = useState<{ isCorrect: boolean; text: string } | null>(
    null
  );
  const [isLocked, setIsLocked] = useState(false);

  const currentQ = LEARNING_QUESTIONS[currentIdx];

  const startGame = () => {
    setCurrentIdx(0);
    setAnswers([]);
    setLastFeedback(null);
    setIsLocked(false);
    setStage('PLAYING');
    sound.playClick();
  };

  const handleChooseColor = (chosen: LearningColor) => {
    if (isLocked || !currentQ) return;
    setIsLocked(true);

    const isPhase1 = currentQ.rulePhase === 1;
    // In Phase 1: correct answer is the FONT COLOR
    // In Phase 2: correct answer is the WORD TEXT
    const correctAnswer = isPhase1 ? currentQ.color : currentQ.word;
    const isCorrect = chosen === correctAnswer;

    if (isCorrect) {
      sound.playSuccess();
      setLastFeedback({
        isCorrect: true,
        text: `Correct! Rule was: ${isPhase1 ? 'FONT COLOR' : 'WORD MEANING'}`,
      });
    } else {
      sound.playError();
      setLastFeedback({
        isCorrect: false,
        text: `Incorrect. You chose ${chosen}, but target ${
          isPhase1 ? 'font color' : 'word name'
        } was ${correctAnswer}.`,
      });
    }

    const nextAnswers = [...answers, { isCorrect, rulePhase: currentQ.rulePhase }];
    setAnswers(nextAnswers);

    // Brief timeout to advance smoothly
    setTimeout(() => {
      setLastFeedback(null);
      setIsLocked(false);

      if (currentIdx === 4) {
        // Just finished question 5: trigger rule shift alert!
        sound.playGlitch();
        setStage('RULE_SHIFT_WARNING');
      } else if (currentIdx + 1 < LEARNING_QUESTIONS.length) {
        setCurrentIdx((prev) => prev + 1);
      } else {
        // Completed all 10 questions
        const p1Score = nextAnswers.filter((a) => a.rulePhase === 1 && a.isCorrect).length;
        const p2Score = nextAnswers.filter((a) => a.rulePhase === 2 && a.isCorrect).length;
        const total = p1Score + p2Score;
        onCompleteGame(total, 10, p1Score, p2Score);
        setStage('RESULTS');
      }
    }, 700);
  };

  const p1Score = answers.filter((a) => a.rulePhase === 1 && a.isCorrect).length;
  const p2Score = answers.filter((a) => a.rulePhase === 2 && a.isCorrect).length;
  const totalScore = p1Score + p2Score;

  return (
    <div className="relative min-h-[90vh] bg-[#0c1222] text-slate-100 p-4 sm:p-6 lg:p-8 overflow-hidden select-none">
      {/* Neon ambient backlight */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-rose-500/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-[110px] pointer-events-none" />

      {/* Top Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
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
          <div className="px-3 py-1 rounded bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
            DOMAIN 03 · LEARNING
          </div>
          {stage === 'PLAYING' && (
            <div className="text-xs font-mono text-slate-400">
              Question <span className="text-amber-400 font-bold">{currentIdx + 1}</span> of 10
            </div>
          )}
        </div>
      </div>

      {/* STAGE 1: INTRO */}
      {stage === 'INTRO' && (
        <div className="max-w-3xl mx-auto space-y-8 py-6">
          <div className="space-y-3">
            <div className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-widest flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Challenge 03 · The Rule Reversal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-serif-title tracking-tight">
              LEARNING: MASTER THE RULE. BREAK THE HABIT.
            </h1>
            <p className="text-amber-300 font-mono text-xs uppercase tracking-wider">
              Cognitive Set-Shifting & Proactive Interference Protocol
            </p>
          </div>

          <div className="space-y-4 text-sm text-slate-300 leading-relaxed bg-[#141a2c]/90 p-6 rounded-2xl border border-amber-500/30 shadow-[0_0_25px_rgba(245,158,11,0.15)]">
            <p>
              Learning is the process through which experience changes what we know, remember, or do. It includes recognizing patterns, adapting to feedback, and updating behavior when circumstances change.
            </p>
            <p>
              In a digital world, interfaces, applications, and social platforms constantly teach us patterns. We become accustomed to familiar signals and automatic responses. However, a previously useful rule can suddenly become incorrect when the context changes.
            </p>
            <p className="text-amber-200 font-medium">
              In this challenge, you will identify colors using one rule and then switch to a different rule halfway through. The key is not just learning the first rule. It is noticing when the rule changes and adapting your response.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
              <h2 className="text-rose-400 font-semibold flex items-center gap-1.5 text-xs">
                <span>Phase 1 (Questions 1–5): Text-Color Rule</span>
              </h2>
              <p className="text-slate-300">
                Choose the <strong>color of the text</strong>. Ignore what the word says.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
              <h2 className="text-emerald-400 font-semibold flex items-center gap-1.5 text-xs">
                <span>Phase 2 (Questions 6–10): Word-Meaning Rule</span>
              </h2>
              <p className="text-slate-300">
                Choose the <strong>color named by the word</strong>. Ignore the font color.
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-center">
            <button
              onClick={startGame}
              className="px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 via-emerald-400 to-amber-300 rounded-xl hover:from-amber-300 hover:to-emerald-300 shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all active:scale-95"
            >
              START CHALLENGE
            </button>
          </div>
        </div>
      )}

      {/* STAGE 2: MID-GAME RULE SHIFT WARNING */}
      {stage === 'RULE_SHIFT_WARNING' && (
        <div className="max-w-2xl mx-auto py-12 text-center space-y-6">
          <div className="p-8 rounded-3xl bg-rose-950/70 border-2 border-rose-500 shadow-[0_0_50px_rgba(244,63,94,0.4)] space-y-5 animate-pulse">
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-500/20 border border-rose-400 flex items-center justify-center">
              <AlertOctagon className="w-10 h-10 text-rose-400" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white font-serif-title tracking-tight">
              RULES HAVE CHANGED.
            </h2>

            <p className="text-rose-200 text-base max-w-lg mx-auto leading-relaxed">
              &ldquo;Your previous strategy will now lead you astray. Read the word, not the color.&rdquo;
            </p>

            <div className="p-4 rounded-xl bg-black/60 border border-rose-700/60 text-xs text-rose-300 font-mono">
              NEW ACTIVE DIRECTIVE: Choose the color NAMED by the word. IGNORE the text font color!
            </div>

            <div className="pt-3">
              <button
                onClick={() => {
                  sound.playClick();
                  setCurrentIdx(5); // Advance to Question 6
                  setStage('PLAYING');
                }}
                className="px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-500 shadow-[0_0_25px_rgba(244,63,94,0.4)] transition-all flex items-center gap-2 mx-auto"
              >
                <span>CONTINUE UNDER NEW RULE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 3: ACTIVE PLAYING */}
      {stage === 'PLAYING' && currentQ && (
        <div className="max-w-2xl mx-auto py-8 space-y-8 text-center">
          {/* Active Rule Indicator Banner */}
          <div
            className={`p-3.5 rounded-xl border text-xs font-mono font-bold tracking-wider uppercase transition-colors ${
              currentQ.rulePhase === 1
                ? 'bg-sky-950/60 border-sky-500/50 text-sky-300'
                : 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
            }`}
          >
            {currentQ.rulePhase === 1 ? (
              <span>RULE 1: CHOOSE THE COLOR OF THE TEXT · IGNORE THE WORD</span>
            ) : (
              <span>RULE 2: CHOOSE THE COLOR NAMED BY THE WORD · IGNORE THE TEXT COLOR</span>
            )}
          </div>

          {/* Central Stimulus Card */}
          <div className="p-10 rounded-3xl bg-[#11172a] border border-slate-700 shadow-2xl flex flex-col items-center justify-center min-h-[220px]">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">
              Incongruent Stimulus
            </span>
            <div
              className={`text-5xl sm:text-6xl font-black tracking-widest font-mono transition-transform duration-150 ${
                COLOR_MAP[currentQ.color].textClass
              }`}
            >
              {currentQ.word}
            </div>
          </div>

          {/* Feedback pill */}
          {lastFeedback && (
            <div
              className={`text-xs font-semibold py-1.5 px-4 rounded-full mx-auto inline-block ${
                lastFeedback.isCorrect
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                  : 'bg-rose-950 text-rose-300 border border-rose-600'
              }`}
            >
              {lastFeedback.text}
            </div>
          )}

          {/* 4 Large Answer Buttons */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-2">
            {COLOR_OPTIONS.map((col) => (
              <button
                key={col}
                disabled={isLocked}
                onClick={() => handleChooseColor(col)}
                className={`py-4 px-6 rounded-2xl font-bold tracking-wider text-base uppercase transition-all duration-150 active:scale-95 disabled:opacity-50 shadow-lg ${COLOR_MAP[col].bgClass}`}
              >
                {col}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 font-mono">
            Phase {currentQ.rulePhase} of 2 · Rapid executive inhibition required
          </div>
        </div>
      )}

      {/* STAGE 4: RESULTS */}
      {stage === 'RESULTS' && (
        <div className="max-w-3xl mx-auto py-8 space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-widest">
              Challenge Complete · Cognitive Flexibility
            </span>
            <h2 className="text-3xl font-extrabold text-white font-serif-title">
              Rule Reversal Audit
            </h2>
            <div className="text-4xl font-black text-amber-300 font-mono tracking-tight pt-1">
              {totalScore} / 10
              <span className="text-base text-slate-400 font-normal ml-3">
                ({Math.round((totalScore / 10) * 100)}% Overall Accuracy)
              </span>
            </div>
          </div>

          {/* Phase Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-sky-500/30 space-y-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-sky-400 uppercase font-semibold">
                  Phase 1 · Text-Color Rule
                </span>
                <span className="text-lg font-bold font-mono text-white">{p1Score} / 5</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Evaluates initial rule acquisition and suppressing the automatic reflex to read text (classic Stroop effect).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/70 border border-emerald-500/30 space-y-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 uppercase font-semibold">
                  Phase 2 · Word-Meaning Rule
                </span>
                <span className="text-lg font-bold font-mono text-white">{p2Score} / 5</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Evaluates mental set-shifting and overcoming proactive interference from the habit formed in Phase 1.
              </p>
            </div>
          </div>

          {/* Performance Reflection */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-3">
            <h3 className="text-white font-semibold text-sm">
              Cognitive Insight: Overcoming Habit Interference
            </h3>
            <p>
              &ldquo;Your first rule became a habit. Your challenge was to recognize when that habit needed to change.&rdquo;
            </p>
            <p className="text-slate-400">
              When a rule changes in real life—such as an algorithm update, an updated workflow, or changing conversational norms—the brain frequently experiences perseveration: repeating the previously rewarded response despite new conditions. Mastery involves recognizing the shift quickly and resetting behavioral responses.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={startGame}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all active:scale-95"
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
