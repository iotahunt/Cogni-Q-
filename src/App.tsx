import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { DomainSelection } from './components/DomainSelection';
import { ScienceSection } from './components/ScienceSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { LabProgressSummary } from './components/LabProgressSummary';
import { Footer } from './components/Footer';

import { AttentionGame } from './components/games/AttentionGame';
import { MemoryGame } from './components/games/MemoryGame';
import { LearningGame } from './components/games/LearningGame';
import { PerceptionGame } from './components/games/PerceptionGame';
import { DecisionGame } from './components/games/DecisionGame';

import { DomainId, UserSessionProgress } from './types/cognition';
import { sound } from './utils/sound';

const STORAGE_KEY = 'cogniq_session_progress_v1';

const INITIAL_PROGRESS: UserSessionProgress = {
  completedDomains: {
    attention: false,
    memory: false,
    learning: false,
    perception: false,
    decision: false,
  },
  highScores: {},
};

export default function App() {
  const [activeDomain, setActiveDomain] = useState<DomainId | null>(null);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [sessionProgress, setSessionProgress] = useState<UserSessionProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_PROGRESS;
  });

  // Persist session changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionProgress));
    } catch {
      // Ignore
    }
  }, [sessionProgress]);

  const handleSelectDomain = (domainId: DomainId) => {
    setActiveDomain(domainId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReturnToLab = () => {
    setActiveDomain(null);
    setTimeout(() => {
      const el = document.getElementById('domains-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleNavigateHome = () => {
    setActiveDomain(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateDomains = () => {
    setActiveDomain(null);
    setTimeout(() => {
      const el = document.getElementById('domains-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 500, behavior: 'smooth' });
    }, 50);
  };

  const handleNavigateScience = () => {
    setActiveDomain(null);
    setTimeout(() => {
      const el = document.getElementById('science-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleNavigateHowItWorks = () => {
    setActiveDomain(null);
    setTimeout(() => {
      const el = document.getElementById('how-it-works');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleResetSession = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSessionProgress(INITIAL_PROGRESS);
  };

  // Completion handlers for each domain
  const handleCompleteAttention = (score: number, total: number, percentage: number) => {
    setSessionProgress((prev) => ({
      ...prev,
      completedDomains: { ...prev.completedDomains, attention: true },
      highScores: {
        ...prev.highScores,
        attention: { score, total, percentage },
      },
    }));
  };

  const handleCompleteMemory = (score: number, total: number, completed: boolean) => {
    setSessionProgress((prev) => ({
      ...prev,
      completedDomains: { ...prev.completedDomains, memory: true },
      highScores: {
        ...prev.highScores,
        memory: { score, total, completed },
      },
    }));
  };

  const handleCompleteLearning = (score: number, total: number, p1Score: number, p2Score: number) => {
    setSessionProgress((prev) => ({
      ...prev,
      completedDomains: { ...prev.completedDomains, learning: true },
      highScores: {
        ...prev.highScores,
        learning: { score, total, p1Score, p2Score },
      },
    }));
  };

  const handleCompletePerception = (score: number, total: number) => {
    setSessionProgress((prev) => ({
      ...prev,
      completedDomains: { ...prev.completedDomains, perception: true },
      highScores: {
        ...prev.highScores,
        perception: { score, total },
      },
    }));
  };

  const handleCompleteDecision = (profileTitle: string, choices: ('A' | 'B')[]) => {
    setSessionProgress((prev) => ({
      ...prev,
      completedDomains: { ...prev.completedDomains, decision: true },
      highScores: {
        ...prev.highScores,
        decision: { profileTitle, choices },
      },
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090b10] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Global Top Bar Navigation */}
      <Navigation
        onNavigateHome={handleNavigateHome}
        onNavigateDomains={handleNavigateDomains}
        onNavigateScience={handleNavigateScience}
        onNavigateHowItWorks={handleNavigateHowItWorks}
        onOpenProgressModal={() => setIsProgressModalOpen(true)}
        sessionProgress={sessionProgress}
        activeView={activeDomain ? 'game' : 'landing'}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeDomain === null ? (
          /* Landing Page View */
          <div>
            <HeroSection
              onBeginJourney={handleNavigateDomains}
              onExploreScience={handleNavigateScience}
            />

            <DomainSelection
              onSelectDomain={handleSelectDomain}
              sessionProgress={sessionProgress}
            />

            <ScienceSection onEnterChallenges={handleNavigateDomains} />

            <HowItWorksSection onSelectDomain={handleSelectDomain} />
          </div>
        ) : (
          /* Dedicated Game Views */
          <div className="w-full">
            {activeDomain === 'attention' && (
              <AttentionGame
                onReturnToLab={handleReturnToLab}
                onCompleteGame={handleCompleteAttention}
              />
            )}

            {activeDomain === 'memory' && (
              <MemoryGame
                onReturnToLab={handleReturnToLab}
                onCompleteGame={handleCompleteMemory}
              />
            )}

            {activeDomain === 'learning' && (
              <LearningGame
                onReturnToLab={handleReturnToLab}
                onCompleteGame={handleCompleteLearning}
              />
            )}

            {activeDomain === 'perception' && (
              <PerceptionGame
                onReturnToLab={handleReturnToLab}
                onCompleteGame={handleCompletePerception}
              />
            )}

            {activeDomain === 'decision' && (
              <DecisionGame
                onReturnToLab={handleReturnToLab}
                onCompleteGame={handleCompleteDecision}
              />
            )}
          </div>
        )}
      </main>

      {/* Progress Audit Modal */}
      <LabProgressSummary
        isOpen={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
        sessionProgress={sessionProgress}
        onSelectDomain={handleSelectDomain}
        onResetProgress={handleResetSession}
      />

      {/* Footer */}
      <Footer
        onNavigateHome={handleNavigateHome}
        onNavigateDomains={handleNavigateDomains}
        onNavigateScience={handleNavigateScience}
        onResetSession={handleResetSession}
      />
    </div>
  );
}
