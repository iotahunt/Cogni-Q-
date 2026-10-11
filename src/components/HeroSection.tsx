import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Compass, Atom, Sparkles, RefreshCw } from 'lucide-react';
import { sound } from '../utils/sound';
import quantumMindImg from '../assets/images/cogni_quantum_mind_1791699498031.jpg';

interface HeroSectionProps {
  onBeginJourney: () => void;
  onExploreScience: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBeginJourney,
  onExploreScience,
}) => {
  // Interactive Superposition state demonstrator
  const [isSuperposition, setIsSuperposition] = useState(true);
  const [collapsedState, setCollapsedState] = useState<'A' | 'B' | null>(null);
  const [superpositionWeight, setSuperpositionWeight] = useState(50);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Background subtle canvas particle & wave simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 600;
    };
    window.addEventListener('resize', handleResize);

    const particles: { x: number; y: number; vx: number; vy: number; radius: number; alpha: number }[] = [];
    const count = Math.min(45, Math.floor(width / 30));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let time = 0;
    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle wave interference curves
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.07)';
      for (let x = 0; x < width; x += 10) {
        const y = height * 0.5 + Math.sin(x * 0.005 + time) * 40 + Math.cos(x * 0.01 - time * 0.5) * 20;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.05)';
      for (let x = 0; x < width; x += 10) {
        const y = height * 0.55 + Math.cos(x * 0.004 - time) * 35 + Math.sin(x * 0.008 + time) * 25;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw particles & soft neural links
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${p.alpha * 0.6})`;
        ctx.fill();

        // Connect nearby points
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${(1 - dist / 110) * 0.15})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleCollapseState = () => {
    sound.playClick();
    if (isSuperposition) {
      const outcome = Math.random() < superpositionWeight / 100 ? 'A' : 'B';
      setCollapsedState(outcome);
      setIsSuperposition(false);
      sound.playSuccess();
    } else {
      setIsSuperposition(true);
      setCollapsedState(null);
      setSuperpositionWeight(Math.floor(Math.random() * 60) + 20);
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-6 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800/60">
      {/* Background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
        aria-hidden="true"
      />

      {/* Radial ambient lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-tr from-cyan-600/15 via-indigo-600/10 to-purple-700/15 blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        {/* Left Column: Editorial Headline & Actions */}
        <div className="lg:col-span-7 space-y-7 text-left">
          {/* Prominent High-Impact Tech Banner: PLAYABLE GAME CHALLENGES */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs sm:text-sm font-mono font-bold tracking-wider uppercase text-cyan-200">
              ⚡ THIS SITE PROVIDES 5 FULLY PLAYABLE GAME CHALLENGES
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] font-tech-title max-w-3xl">
            YOUR MIND IS NOT A STATIC SYSTEM.
          </h1>

          <p className="text-lg sm:text-xl text-cyan-200/90 font-light max-w-2xl leading-relaxed">
            Every choice changes with context. Every distraction competes for attention. Every new perspective reshapes what you see.
          </p>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Enter <strong className="text-white font-semibold">Cogni-Q+</strong>, an interactive journey through the five dimensions of cognition. This is <strong className="text-cyan-400 font-semibold underline underline-offset-4">not a passive reading page</strong>—you will actively play through 5 real-time cognitive challenges: Attention, Memory, Learning, Perception, and Decision-Making.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                sound.playClick();
                onBeginJourney();
              }}
              className="inline-flex items-center gap-2.5 px-7 py-4 text-sm font-bold tracking-wider uppercase text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 rounded-lg hover:from-cyan-300 hover:to-teal-200 shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.55)] transition-all active:scale-95"
            >
              <span>ENTER CHALLENGES</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onExploreScience();
              }}
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-300 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 hover:border-slate-500 rounded-lg hover:text-white transition-all active:scale-95"
            >
              <Atom className="w-4 h-4 text-cyan-400" />
              <span>EXPLORE THE SCIENCE</span>
            </button>
          </div>

          {/* Quiet Scientific Credo */}
          <div className="pt-4 border-t border-slate-800/70 text-xs text-slate-500 flex items-center gap-2">
            <span className="text-cyan-500/70">✦</span>
            <span>Inspired by cognitive probability models of human judgment under uncertainty.</span>
          </div>
        </div>

        {/* Right Column: Visual Artwork & Interactive Superposition Sandbox */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Hero Artwork Card */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-700/70 shadow-[0_0_40px_rgba(0,0,0,0.8)] bg-slate-900/60 group">
            <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
              <img
                src={quantumMindImg}
                alt="Quantum Cognition Visual Representation"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
                <span className="font-mono text-cyan-300">Ψ(Context) ⇄ Thought Interference</span>
                <span className="text-slate-400">Cognitive State Vector</span>
              </div>
            </div>
          </div>

          {/* Miniature Interactive Quantum Metaphor Card */}
          <div className="p-5 rounded-xl bg-slate-900/75 border border-slate-800 backdrop-blur-sm space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Atom className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
                <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Concept Sandbox: State Collapse
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {isSuperposition ? 'Superposition State' : 'Measurement Collapsed'}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              In classical models, your mind has a static predefined answer. In quantum cognition, beliefs exist in a flexible superposition until context or measurement forces a decision.
            </p>

            {/* Interactive State Visualizer */}
            <div className="p-3.5 rounded-lg bg-black/60 border border-slate-800/90 flex flex-col gap-2.5">
              <div className="flex justify-between text-xs font-mono">
                <span className={collapsedState === 'A' ? 'text-cyan-400 font-bold' : 'text-slate-400'}>
                  Option A: Focus (P = {superpositionWeight}%)
                </span>
                <span className={collapsedState === 'B' ? 'text-purple-400 font-bold' : 'text-slate-400'}>
                  Option B: Shift (P = {100 - superpositionWeight}%)
                </span>
              </div>

              {/* Probability bar */}
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  className={`h-full transition-all duration-300 ${
                    collapsedState === 'A'
                      ? 'bg-cyan-400 w-full'
                      : collapsedState === 'B'
                      ? 'w-0'
                      : 'bg-gradient-to-r from-cyan-500 to-indigo-500'
                  }`}
                  style={{ width: collapsedState ? (collapsedState === 'A' ? '100%' : '0%') : `${superpositionWeight}%` }}
                />
                <div
                  className={`h-full transition-all duration-300 ${
                    collapsedState === 'B'
                      ? 'bg-purple-400 w-full'
                      : collapsedState === 'A'
                      ? 'w-0'
                      : 'bg-purple-600/70'
                  }`}
                  style={{ width: collapsedState ? (collapsedState === 'B' ? '100%' : '0%') : `${100 - superpositionWeight}%` }}
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-300 font-mono">
                  {isSuperposition ? (
                    <span className="text-amber-300/90">⚖ Indeterminate: awaiting context</span>
                  ) : (
                    <span className="text-emerald-400">
                      ✓ Collapsed to: Option {collapsedState}
                    </span>
                  )}
                </span>

                <button
                  onClick={handleCollapseState}
                  className="px-3 py-1.5 rounded-md text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3 h-3 text-cyan-400" />
                  <span>{isSuperposition ? 'Introduce Context' : 'Reset Superposition'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
