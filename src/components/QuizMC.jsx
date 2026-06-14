import React, { useState, useEffect } from 'react';

/**
 * Multiple Choice Quiz Component.
 * @param {object} currentWord - The current active vocabulary word { french, english }
 * @param {array} rangeWords - The subset of words in the active range
 * @param {array} allWords - The complete vocabulary list (for distractor fallbacks)
 * @param {string} direction - 'fr-en' | 'en-fr'
 * @param {number} currentIndex - Index of current question in session
 * @param {number} totalQuestions - Total questions in this session
 * @param {number} score - Current correct count
 * @param {function} onAnswer - Callback when an answer is evaluated (isCorrect, answeredWord)
 * @param {function} onNext - Callback to load next question
 * @param {function} onExit - Callback to exit the quiz session back to Home
 */
export default function QuizMC({
  currentWord,
  rangeWords,
  allWords,
  direction,
  currentIndex,
  totalQuestions,
  score,
  onAnswer,
  onNext,
  onExit
}) {
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const questionWord = direction === 'fr-en' ? currentWord.french : currentWord.english;
  const correctTranslation = direction === 'fr-en' ? currentWord.english : currentWord.french;
  const frenchWordToPronounce = currentWord.french;

  // Helper to shuffle array (Fisher-Yates)
  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Speak the French word
  const speakFrench = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(frenchWordToPronounce);
      utterance.lang = 'fr-FR';
      
      const voices = window.speechSynthesis.getVoices();
      const frenchVoice = voices.find(voice => voice.lang.startsWith('fr'));
      if (frenchVoice) {
        utterance.voice = frenchVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  };

  // Pronounce word when question loads
  useEffect(() => {
    speakFrench();
  }, [currentWord]);

  // Generate options synchronously using useMemo to prevent state mismatch flickers
  const choices = React.useMemo(() => {
    const correctText = correctTranslation;
    const uniqueOptions = new Set([correctText]);
    
    // 1. Get range distractors
    const rangeDistractors = rangeWords
      .map(w => (direction === 'fr-en' ? w.english : w.french))
      .filter(val => val && val !== correctText);

    // Shuffle using Fisher-Yates
    const shuffledRange = shuffleArray(rangeDistractors);
    for (const option of shuffledRange) {
      if (uniqueOptions.size >= 4) break;
      uniqueOptions.add(option);
    }

    // 2. Fallback to all distractors if needed
    if (uniqueOptions.size < 4) {
      const allDistractors = allWords
        .map(w => (direction === 'fr-en' ? w.english : w.french))
        .filter(val => val && val !== correctText);
      
      const shuffledAll = shuffleArray(allDistractors);
      for (const option of shuffledAll) {
        if (uniqueOptions.size >= 4) break;
        uniqueOptions.add(option);
      }
    }

    // 3. Final shuffle of options
    return shuffleArray(Array.from(uniqueOptions));
  }, [currentWord, direction, rangeWords, allWords, correctTranslation]);

  // Handle choice selection
  const handleSelect = (choice) => {
    if (isAnswered) return;
    
    setSelectedChoice(choice);
    setIsAnswered(true);
    const isCorrect = choice === correctTranslation;
    
    onAnswer(isCorrect, currentWord);
  };

  // Keyboard shortcut listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isAnswered && ['1', '2', '3', '4'].includes(e.key)) {
        const optionIndex = parseInt(e.key, 10) - 1;
        if (choices[optionIndex]) {
          handleSelect(choices[optionIndex]);
        }
      }
      
      if (e.key === ' ') {
        e.preventDefault();
        speakFrench();
      }

      if (isAnswered && e.key === 'Enter') {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [choices, isAnswered, correctTranslation, onNext]);

  const handleExitClick = () => {
    if (window.confirm("Are you sure you want to exit the quiz? Your current progress will be lost. / Êtes-vous sûr de vouloir quitter le quiz ?")) {
      onExit();
    }
  };

  // Calculate Accuracy
  const answeredCount = currentIndex;
  const currentAccuracy = answeredCount > 0 ? Math.round((score / answeredCount) * 100) : 0;
  const progressPercent = Math.round(((currentIndex) / totalQuestions) * 100);

  return (
    <div className="card" style={{ animationDelay: '0.1s' }}>
      {/* Quiz Progress & Stats with Exit Button */}
      <div className="quiz-header" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: '0.75rem', width: '100%', marginBottom: '1.5rem' }}>
        <button 
          onClick={handleExitClick} 
          className="btn btn-secondary" 
          style={{ width: 'auto', padding: '0.45rem 0.85rem', fontSize: '0.8rem', margin: 0, fontWeight: '700' }}
        >
          ⬅ Back / Retour
        </button>
        <div style={{ textAlign: 'center', fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-main)' }}>
          Question {currentIndex + 1} of {totalQuestions}
        </div>
        <div style={{ textAlign: 'right', fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Score: {score} ({currentAccuracy}%)
        </div>
      </div>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
      </div>

      {/* Question Card */}
      <div className="question-panel">
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '1px' }}>
          {direction === 'fr-en' 
            ? 'Translate into English / Traduisez en anglais' 
            : 'Translate into French / Traduisez en français'}
        </div>
        <div className="word-to-translate">{questionWord}</div>
        
        <button 
          onClick={speakFrench} 
          className="pronounce-btn" 
          title="Hear pronunciation / Écouter la prononciation"
          aria-label="Hear pronunciation"
        >
          🔊
        </button>
      </div>

      {/* Multiple Choice Answers */}
      <div className="options-grid">
        {choices.map((choice, idx) => {
          let btnClass = '';
          let statusBadge = '';

          if (isAnswered) {
            if (choice === correctTranslation) {
              btnClass = 'correct';
              statusBadge = '✔️';
            } else if (choice === selectedChoice) {
              btnClass = 'incorrect';
              statusBadge = '❌';
            } else {
              btnClass = 'dimmed';
            }
          }

          return (
            <button
              key={choice}
              onClick={() => handleSelect(choice)}
              className={`option-button ${btnClass}`}
              disabled={isAnswered}
            >
              <div>
                <span className="option-index">{idx + 1}</span>
                {choice}
              </div>
              {statusBadge && <span className="status-badge">{statusBadge}</span>}
            </button>
          );
        })}
      </div>

      {/* Action Buttons / Next */}
      {isAnswered && (
        <button onClick={onNext} className="btn btn-primary" style={{ animation: 'popIn 0.3s forwards' }}>
          {currentIndex + 1 === totalQuestions 
            ? 'Finish Quiz / Terminer le Quiz 🏁' 
            : 'Next Question / Question Suivante ➔'}
        </button>
      )}

      {/* Keyboard Shortcuts Hint */}
      <div className="keyboard-hint">
        Keyboard Shortcuts: Use <span className="keyboard-key">1</span>-<span className="keyboard-key">4</span> to answer. Press <span className="keyboard-key">Space</span> to pronounce. Press <span className="keyboard-key">Enter</span> to continue.
        <div style={{ fontSize: '0.75rem', marginTop: '0.2rem', opacity: 0.8 }}>
          Raccourcis : Utilisez <span className="keyboard-key">1</span>-<span className="keyboard-key">4</span> pour répondre. Appuyez sur <span className="keyboard-key">Espace</span> pour prononcer. Appuyez sur <span className="keyboard-key">Entrée</span> pour continuer.
        </div>
      </div>
    </div>
  );
}
