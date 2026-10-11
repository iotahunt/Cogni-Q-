import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, Sparkles, Award, Brain } from 'lucide-react';
import { sound } from '../utils/sound';
import { UserSessionProgress } from '../types/cognition';

interface NavigationProps {
  onNavigateHome: () => void;
  onNavigateDomains: () => void;
  onNavigateScience: () => void;
  onNavigateHowItWorks: () => void;
  onOpenProgressModal: () => void;
  sessionProgress: UserSessionProgress;
  activeView: 'landing' | 'game' | 'progress';
}

export const Navigation: React.FC<NavigationProps> = ({
  onNavigateHome,
  onNavigateDomains,
  onNavigateScience,
  onNavigateHowItWorks,
  onOpenProgressModal,
  sessionProgress,
  activeView,
}) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const nextState = sound.toggleMute();
    setIsMuted(nextState);
    if (!nextState) sound.playClick();
  };

  const completedCount = Object.values(sessionProgress.completedDomains).filter(Boolean).length;

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#090b10]/85 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => {
            sound.playClick();
            onNavigateHome();
          }}
          className="group flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
        >
          <div className="h-8 px-2.5 rounded-lg bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-400/50 flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.35)] group-hover:shadow-[0_0_22px_rgba(6,182,212,0.6)] group-hover:border-cyan-300 transition-all">
            <Brain className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="text-white font-mono font-bold text-xs tracking-tight">CQ+</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-white font-tech-title whitespace-nowrap shrink-0 group-hover:text-cyan-300 transition-colors">
            Cogni-Q+
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => {
              sound.playClick();
              onNavigateHome();
            }}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Home
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigateDomains();
            }}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Explore Cognition
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigateScience();
            }}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            About Quantum Cognition
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigateHowItWorks();
            }}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            How It Works
          </button>
        </nav>

        {/* Zone 3: Primary Action and Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label={isMuted ? 'Unmute audio effects' : 'Mute audio effects'}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition-colors border border-transparent hover:border-slate-700"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Session Progress Indicator */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenProgressModal();
            }}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all"
            title="View Lab Session Progress"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="tabular-nums font-mono text-cyan-300">{completedCount}/5</span>
            <span className="text-slate-400">Completed</span>
          </button>

          {/* Primary CTA Button */}
          <button
            onClick={() => {
              sound.playClick();
              onNavigateDomains();
            }}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 to-teal-300 rounded-lg hover:from-cyan-300 hover:to-teal-200 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all whitespace-nowrap shrink-0 active:scale-95"
          >
            ENTER THE LAB
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 border-b border-slate-800 bg-[#090b10]/98 backdrop-blur-xl space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-300">
            <button
              onClick={() => {
                sound.playClick();
                onNavigateHome();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-md hover:bg-slate-800/80 hover:text-cyan-400 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onNavigateDomains();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-md hover:bg-slate-800/80 hover:text-cyan-400 transition-colors"
            >
              Explore Cognition
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onNavigateScience();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-md hover:bg-slate-800/80 hover:text-cyan-400 transition-colors"
            >
              About Quantum Cognition
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onNavigateHowItWorks();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-md hover:bg-slate-800/80 hover:text-cyan-400 transition-colors"
            >
              How It Works
            </button>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
            <button
              onClick={() => {
                sound.playClick();
                onOpenProgressModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs text-slate-300 py-1.5 px-3 rounded bg-slate-900 border border-slate-800"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Lab Progress: {completedCount}/5</span>
            </button>
            <button
              onClick={toggleSound}
              className="flex items-center gap-1.5 text-xs text-slate-400 py-1.5 px-3"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              <span>{isMuted ? 'Muted' : 'Sound On'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
