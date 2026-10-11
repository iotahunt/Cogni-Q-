import React, { useState } from 'react';
import { BookOpen, Layers, GitCompare, Sparkles, HelpCircle } from 'lucide-react';
import { sound } from '../utils/sound';
import labInstallationImg from '../assets/images/cogni_lab_installation_1791699511418.jpg';

interface ScienceSectionProps {
  onEnterChallenges?: () => void;
}

export const ScienceSection: React.FC<ScienceSectionProps> = ({ onEnterChallenges }) => {
  // Interactive demonstrator of the Order Effect in Quantum Cognition
  const [orderMode, setOrderMode] = useState<'A_THEN_B' | 'B_THEN_A'>('A_THEN_B');

  return (
    <section id="science-section" className="py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 bg-[#07090e]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-400">
            <span>Cognitive Science & Quantum Probability</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif-title tracking-tight">
            THE SCIENCE OF AN UNCERTAIN MIND
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Why traditional probability fails to explain how humans actually think, decide, and adapt.
          </p>
        </div>

        {/* Editorial Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Main Editorial Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6 text-slate-300 leading-relaxed">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-sm space-y-5">
              <p className="text-lg text-cyan-200 font-medium leading-relaxed">
                Welcome to a new way of training your mind.
              </p>

              <p className="text-base text-slate-300 leading-relaxed">
                <strong className="text-white font-semibold">Quantum cognition</strong> is an established research concept in cognitive science and psychology. It uses the mathematical framework of quantum probability—not literal quantum physics in the brain—to model how people make judgments and decisions under uncertainty. Research shows it can explain context effects, changing preferences, and decision patterns that classical probability models often struggle to capture.
              </p>

              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-slate-200 text-sm leading-relaxed">
                <span className="text-cyan-400 font-semibold block mb-1">In simple terms:</span>
                Your thoughts, memories, and choices are not always fixed in advance. They can shift depending on what you focus on, what happened before, and the context you are in. In today’s digital world—full of fast information, distractions, and constant decisions—this is more relevant than ever.
              </div>

              <p className="text-base text-slate-300 leading-relaxed">
                Our games apply this research-inspired idea through challenges that stimulate attention, memory, learning, perception, and decision-making. Shifting rules, distractions, incomplete information, and changing perspectives train your mind to adapt, focus, and choose with clarity.
              </p>

              <p className="text-base text-slate-100 font-medium leading-relaxed border-t border-slate-800 pt-4">
                This is not about becoming &ldquo;quantum.&rdquo; It is about training the way your brain actually works: flexibly, contextually, and under uncertainty.
              </p>
            </div>

            {/* Scientific Disclaimer Card */}
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-xs text-slate-400 flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <p>
                <strong className="text-slate-300">Important Scientific Note:</strong> Cogni-Q+ is an educational and experimental experience. Its games are inspired by cognitive concepts and are not clinical assessments or medical diagnostics.
              </p>
            </div>
          </div>

          {/* Right Column: Lab Image and Interactive Order-Effects Visualizer */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Laboratory Aesthetic Visual */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src={labInstallationImg}
                  alt="Futuristic Cognitive Science Experimental Lab"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 bg-slate-900/90 border-t border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                <span>The Experimental Setting</span>
                <span className="font-mono text-cyan-400">Contextual Interference</span>
              </div>
            </div>

            {/* Interactive Demonstration: The Non-Commutative Order Effect */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GitCompare className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                    Order Effect Demonstrator
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-slate-400">Non-Commutative Math: A·B ≠ B·A</span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                In classical probability, P(A and B) = P(B and A). But in human minds, evaluating Question A first reshapes the cognitive context for Question B (Busemeyer & Wang).
              </p>

              {/* Toggle Order Buttons */}
              <div className="flex items-center gap-2 p-1 bg-black/60 rounded-lg border border-slate-800">
                <button
                  onClick={() => {
                    sound.playClick();
                    setOrderMode('A_THEN_B');
                  }}
                  className={`flex-1 py-1.5 px-3 rounded text-xs font-medium transition-all ${
                    orderMode === 'A_THEN_B'
                      ? 'bg-cyan-500 text-black font-semibold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Order 1: A then B
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setOrderMode('B_THEN_A');
                  }}
                  className={`flex-1 py-1.5 px-3 rounded text-xs font-medium transition-all ${
                    orderMode === 'B_THEN_A'
                      ? 'bg-purple-500 text-white font-semibold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Order 2: B then A
                </button>
              </div>

              {/* Dynamic Contextual Result */}
              <div className="p-4 rounded-xl bg-black/70 border border-slate-800/80 space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium">
                    {orderMode === 'A_THEN_B'
                      ? '1. "Are you satisfied with your career?" → 2. "Are you happy in life?"'
                      : '1. "Are you happy in life?" → 2. "Are you satisfied with your career?"'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono pt-1">
                  <span className="text-slate-400">Measured Agreement Rate:</span>
                  <span className="text-cyan-300 font-bold">
                    {orderMode === 'A_THEN_B' ? '73% Agreement (Career Priming)' : '58% Agreement (Broad Frame Priming)'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 italic pt-1">
                  {orderMode === 'A_THEN_B'
                    ? 'Asking about career first narrows conscious awareness onto vocational metrics before answering general life questions.'
                    : 'Asking about life satisfaction first provides an overarching emotional baseline, dampening the vocational impact.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Scientific Pillar Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="text-base font-semibold text-white">Superposition of Beliefs</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Before a decision is demanded, human judgments exist in an indefinite state that simultaneously entertains conflicting perspectives rather than fixed predefined values.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="text-base font-semibold text-white">Contextual Interference</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Just like wave interference, competing stimuli and distractions can constructively amplify or destructively cancel out our intended cognitive focus.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <h4 className="text-base font-semibold text-white">Dynamic Rule Reversal</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cognitive flexibility requires rapidly updating mental projection axes when rules flip, overriding automatic reflexes through adaptive executive control.
            </p>
          </div>
        </div>

        {/* Big Action Callout: ENTER CHALLENGE */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-950 via-cyan-950/40 to-slate-950 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(6,182,212,0.15)] text-center sm:text-left">
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              ⚡ Action Over Theory
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-tech-title">
              Ready to Test Your Cognitive Limits?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Do not just read the science—experience it directly in the 5 interactive laboratory games.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              if (onEnterChallenges) {
                onEnterChallenges();
              } else {
                const el = document.getElementById('domains-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 hover:from-cyan-300 hover:to-white shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all whitespace-nowrap active:scale-95 shrink-0"
          >
            ENTER CHALLENGE
          </button>
        </div>
      </div>
    </section>
  );
};
