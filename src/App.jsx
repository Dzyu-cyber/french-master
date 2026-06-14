import React, { useState, useEffect } from 'react';
import vocabularyData from './data/vocabulary.json';
import { useLocalStorage } from './hooks/useLocalStorage';

// Import UI Components
import Header from './components/Header';
import Home from './components/Home';
import QuizMC from './components/QuizMC';
import QuizTyping from './components/QuizTyping';
import Summary from './components/Summary';
import Stats from './components/Stats';

/**
 * Helper to get yesterday's date string in YYYY-MM-DD format.
 */
function getYesterdayDateString() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
}

/**
 * Helper to get today's date string in YYYY-MM-DD format.
 */
function getTodayDateString() {
  return new Date().toISOString().split('T')[0];
}

export default function App() {
  // --- Persistent State (LocalStorage) ---
  const [theme, setTheme] = useLocalStorage('french-master-theme', 'dark');
  const [stats, setStats] = useLocalStorage('french-master-stats', { attempts: 0, correct: 0, incorrect: 0 });
  const [lastSessionConfig, setLastSessionConfig] = useLocalStorage('french-master-last-session', {
    direction: 'en-fr', // Default English ➔ French
    mode: 'mc',
    shuffle: false,
  });
  const [streak, setStreak] = useLocalStorage('french-master-streak', 0);
  const [lastActiveDate, setLastActiveDate] = useLocalStorage('french-master-last-active-date', '');

  // --- Transient State (Memory) ---
  const [view, setView] = useState('home'); // 'home' | 'quiz' | 'summary' | 'stats'
  const [sessionConfig, setSessionConfig] = useState(null);
  const [sessionWords, setSessionWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [sessionScore, setSessionScore] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState([]);
  const [isMistakesReviewMode, setIsMistakesReviewMode] = useState(false);

  // --- Theme Sync Effect ---
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // --- Streak Verification Effect (on startup) ---
  useEffect(() => {
    const todayStr = getTodayDateString();
    const yesterdayStr = getYesterdayDateString();

    if (lastActiveDate !== '' && lastActiveDate !== todayStr && lastActiveDate !== yesterdayStr) {
      // Practice streak was broken
      setStreak(0);
    }
  }, [lastActiveDate, setStreak]);

  // --- Actions & Handlers ---
  
  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  /**
   * Initializes a new quiz session with custom range, mode, and direction.
   * Shuffle is removed per user request: questions are sequential.
   */
  const handleStartQuiz = (config) => {
    setLastSessionConfig(config);
    setSessionConfig(config);
    setIsMistakesReviewMode(false);

    // Select words based on 1-indexed range (no shuffle)
    let words = vocabularyData.slice(config.range.start - 1, config.range.end);
    
    if (words.length === 0) {
      words = vocabularyData.slice(0, 40);
    }

    setSessionWords(words);
    setCurrentWordIndex(0);
    setSessionScore(0);
    setIncorrectWords([]);
    setView('quiz');
  };

  /**
   * Starts a review session testing ONLY the mistakes in the current session.
   */
  const handleReviewIncorrect = () => {
    setIsMistakesReviewMode(true);
    const words = [...incorrectWords]; // Retain order of errors

    setSessionWords(words);
    setCurrentWordIndex(0);
    setSessionScore(0);
    setIncorrectWords([]);
    setView('quiz');
  };

  /**
   * Restart current session settings.
   */
  const handleRestartSession = () => {
    if (isMistakesReviewMode) {
      handleReviewIncorrect();
    } else if (sessionConfig) {
      handleStartQuiz(sessionConfig);
    } else {
      setView('home');
    }
  };

  /**
   * Records cumulative lifetime performance and updates user active streaks.
   */
  const handleAnswerEvaluated = (isCorrectAnswer, word) => {
    // 1. Update Lifetime Stats
    setStats(prev => ({
      attempts: prev.attempts + 1,
      correct: prev.correct + (isCorrectAnswer ? 1 : 0),
      incorrect: prev.incorrect + (isCorrectAnswer ? 0 : 1),
    }));

    // 2. Update Streak Logic
    const todayStr = getTodayDateString();
    if (lastActiveDate !== todayStr) {
      const yesterdayStr = getYesterdayDateString();
      if (lastActiveDate === yesterdayStr || lastActiveDate === '') {
        setStreak(prev => prev + 1);
      } else {
        setStreak(1);
      }
      setLastActiveDate(todayStr);
    }

    // 3. Update Session States
    if (isCorrectAnswer) {
      setSessionScore(prev => prev + 1);
    } else {
      setIncorrectWords(prev => {
        if (prev.some(w => w.french === word.french)) return prev;
        return [...prev, word];
      });
    }
  };

  /**
   * Moves to next question or routes to summary view when finished.
   */
  const handleNextQuestion = () => {
    if (currentWordIndex + 1 < sessionWords.length) {
      setCurrentWordIndex(prev => prev + 1);
    } else {
      setView('summary');
    }
  };

  const handleResetStats = () => {
    setStats({ attempts: 0, correct: 0, incorrect: 0 });
    setStreak(0);
    setLastActiveDate('');
  };

  // --- Router Render Setup ---
  const renderView = () => {
    switch (view) {
      case 'home':
        return (
          <Home
            totalVocab={vocabularyData.length}
            lastSession={lastSessionConfig}
            onStartQuiz={handleStartQuiz}
            onViewStats={() => setView('stats')}
          />
        );
      
      case 'quiz':
        const currentWord = sessionWords[currentWordIndex];
        if (!currentWord) return <div className="card">Loading vocabulary...</div>;
        
        // Slice range words or default to whole vocab for MC distractors
        const rangeWords = sessionConfig 
          ? vocabularyData.slice(sessionConfig.range.start - 1, sessionConfig.range.end)
          : vocabularyData;

        if (sessionConfig?.mode === 'typing') {
          return (
            <QuizTyping
              currentWord={currentWord}
              direction={sessionConfig.direction}
              currentIndex={currentWordIndex}
              totalQuestions={sessionWords.length}
              score={sessionScore}
              onAnswer={handleAnswerEvaluated}
              onNext={handleNextQuestion}
            />
          );
        } else {
          return (
            <QuizMC
              currentWord={currentWord}
              rangeWords={rangeWords}
              allWords={vocabularyData}
              direction={sessionConfig?.direction || 'en-fr'}
              currentIndex={currentWordIndex}
              totalQuestions={sessionWords.length}
              score={sessionScore}
              onAnswer={handleAnswerEvaluated}
              onNext={handleNextQuestion}
            />
          );
        }

      case 'summary':
        return (
          <Summary
            score={sessionScore}
            totalQuestions={sessionWords.length}
            incorrectWords={incorrectWords}
            onRestart={handleRestartSession}
            onReviewIncorrect={handleReviewIncorrect}
            onGoHome={() => setView('home')}
            streak={streak}
          />
        );

      case 'stats':
        return (
          <Stats
            stats={stats}
            onReset={handleResetStats}
            onBack={() => setView('home')}
            totalVocab={vocabularyData.length}
          />
        );

      default:
        return <div className="card">Error: View not found.</div>;
    }
  };

  return (
    <>
      {/* Moving background glow blobs */}
      <div className="glow-blob-container">
        <div className="glow-blob glow-blob-1"></div>
        <div className="glow-blob glow-blob-2"></div>
        <div className="glow-blob glow-blob-3"></div>
      </div>

      <Header
        theme={theme}
        toggleTheme={handleToggleTheme}
        onGoHome={() => setView('home')}
      />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {renderView()}
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '1.5rem 0',
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
        fontWeight: '600',
        letterSpacing: '0.5px'
      }}>
        © {new Date().getFullYear()} French Master. Made with ❤️ for language learners.
      </footer>
    </>
  );
}
