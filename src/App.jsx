import React, { useState, useEffect } from 'react';
import vocabularyData from './data/vocabulary.json';
import { useLocalStorage } from './hooks/useLocalStorage';

// Import UI Components
import Header from './components/Header';
import Home from './components/Home';
import QuizMC from './components/QuizMC';
import QuizTyping from './components/QuizTyping';
import Summary from './components/Summary';
import Manual from './components/Manual';

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
  const [lastSessionConfig, setLastSessionConfig] = useLocalStorage('french-master-last-session', {
    direction: 'fr-en', // Default French ➔ English
    mode: 'mc',
    shuffle: false,
  });
  const [streak, setStreak] = useLocalStorage('french-master-streak', 0);
  const [lastActiveDate, setLastActiveDate] = useLocalStorage('french-master-last-active-date', '');

  // --- Transient State (Memory) ---
  const [view, setView] = useState('home'); // 'home' | 'quiz' | 'summary' | 'manual'
  const [sessionConfig, setSessionConfig] = useState(null);
  const [sessionWords, setSessionWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [sessionScore, setSessionScore] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState([]);
  const [isMistakesReviewMode, setIsMistakesReviewMode] = useState(false);

  // --- Scroll to Top on Load/Refresh ---
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- Streak Verification Effect (on startup) ---
  useEffect(() => {
    const todayStr = getTodayDateString();
    const yesterdayStr = getYesterdayDateString();

    if (lastActiveDate !== '' && lastActiveDate !== todayStr && lastActiveDate !== yesterdayStr) {
      setStreak(0);
    }
  }, [lastActiveDate, setStreak]);

  // --- Actions & Handlers ---

  /**
   * Initializes a new quiz session.
   * Shuffle is false: questions appear in order of range.
   */
  const handleStartQuiz = (config) => {
    setLastSessionConfig(config);
    setSessionConfig(config);
    setIsMistakesReviewMode(false);

    // Select words based on range. Clamp end to vocabulary size.
    const startIdx = Math.max(0, config.range.start - 1);
    const endIdx = Math.min(vocabularyData.length, config.range.end);
    let words = vocabularyData.slice(startIdx, endIdx);
    
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
   * Starts a review session testing ONLY mistakes.
   */
  const handleReviewIncorrect = () => {
    setIsMistakesReviewMode(true);
    const words = [...incorrectWords];

    setSessionWords(words);
    setCurrentWordIndex(0);
    setSessionScore(0);
    setIncorrectWords([]);
    setView('quiz');
  };

  /**
   * Restart current session.
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
   * Evaluates correctness and updates streak.
   */
  const handleAnswerEvaluated = (isCorrectAnswer, word) => {
    // Update Streak Logic
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

    // Update Session States
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

  /**
   * Handles returning home from header click, with quiz confirmation.
   */
  const handleHeaderGoHome = () => {
    if (view === 'quiz') {
      if (window.confirm("Are you sure you want to exit the quiz? Your current progress will be lost. / Êtes-vous sûr de vouloir quitter le quiz ?")) {
        setView('home');
      }
    } else {
      setView('home');
    }
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
            onViewManual={() => setView('manual')}
          />
        );
      
      case 'quiz':
        const currentWord = sessionWords[currentWordIndex];
        if (!currentWord) return <div className="card">Loading vocabulary...</div>;
        
        const rangeWords = sessionConfig 
          ? vocabularyData.slice(sessionConfig.range.start - 1, sessionConfig.range.end)
          : vocabularyData;

        if (sessionConfig?.mode === 'typing') {
          return (
            <QuizTyping
              key={currentWord.french}
              currentWord={currentWord}
              direction={sessionConfig.direction}
              currentIndex={currentWordIndex}
              totalQuestions={sessionWords.length}
              score={sessionScore}
              onAnswer={handleAnswerEvaluated}
              onNext={handleNextQuestion}
              onExit={() => setView('home')}
            />
          );
        } else {
          return (
            <QuizMC
              key={currentWord.french}
              currentWord={currentWord}
              rangeWords={rangeWords}
              allWords={vocabularyData}
              direction={sessionConfig?.direction || 'fr-en'}
              currentIndex={currentWordIndex}
              totalQuestions={sessionWords.length}
              score={sessionScore}
              onAnswer={handleAnswerEvaluated}
              onNext={handleNextQuestion}
              onExit={() => setView('home')}
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

      case 'manual':
        return <Manual onBack={() => setView('home')} />;

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

      <Header onGoHome={handleHeaderGoHome} />

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
