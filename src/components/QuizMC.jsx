import React, { useState, useEffect, useRef } from 'react';

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
 * @param {string} theme - 'light' | 'dark'
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
  theme
}) {
  const [choices, setChoices] = useState([]);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const audioPlayedRef = useRef(false);

  const questionWord = direction === 'fr-en' ? currentWord.french : currentWord.english;
  const correctTranslation = direction === 'fr-en' ? currentWord.english : currentWord.french;
  const frenchWordToPronounce = currentWord.french;

  // Speak the French word
  const speakFrench = () => {
    if ('speechSynthesis' in window) {
      // Cancel active speaking to avoid overlap
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(frenchWordToPronounce);
      utterance.lang = 'fr-FR';
      
      // Attempt to find a French voice for higher quality pronunciation
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
    // Reset audio play tracker
    audioPlayedRef.current = true;
  }, [currentWord]);

  // Generate options when current word changes
  useEffect(() => {
    setSelectedChoice(null);
    setIsAnswered(false);

    const correctText = correctTranslation;
    const uniqueOptions = new Set([correctText]);
    
    // Attempt to pick distractors from selected range
    const rangeDistractors = rangeWords
      .map(w => (direction === 'fr-en' ? w.english : w.french))
      .filter(val => val !== correctText);

    // Shuffle range distractors
    const shuffledDistractors = [...rangeDistractors].sort(() => 0.5 - Math.random());
    
    for (const option of shuffledDistractors) {
      if (uniqueOptions.size >= 4) break;
      uniqueOptions.add(option);
    }

    // Fallback to all words if range is too small for 3 distractors
    if (uniqueOptions.size < 4) {
      const allDistractors = allWords
        .map(w => (direction === 'fr-en' ? w.english : w.french))
        .filter(val => val !== correctText)
        .sort(() => 0.5 - Math.random());

      for (const option of allDistractors) {
        if (uniqueOptions.size >= 4) break;
        uniqueOptions.add(option);
      }
    }

    // Convert Set back to array and shuffle
    const optionsArray = Array.from(uniqueOptions).sort(() => 0.5 - Math.random());
    setChoices(optionsArray);
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
      // 1-4 key codes to choose options
      if (!isAnswered && ['1', '2', '3', '4'].includes(e.key)) {
        const optionIndex = parseInt(e.key, 10) - 1;
        if (choices[optionIndex]) {
          handleSelect(choices[optionIndex]);
        }
      }
      
      // Spacebar to replay audio
      if (e.key === ' ') {
        e.preventDefault(); // Prevent page scrolling
        speakFrench();
      }

      // Enter to proceed
      if (isAnswered && e.key === 'Enter') {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [choices, isAnswered, correctTranslation, onNext]);

  // Calculate Accuracy
  const answeredCount = currentIndex;
  const currentAccuracy = answeredCount > 0 ? Math.round((score / answeredCount) * 100) : 0;
  const progressPercent = Math.round(((currentIndex) / totalQuestions) * 100);

  return (
    <div className="card" style={{ animationDelay: '0.1s' }}>
      {/* Quiz Progress & Stats */}
      <div className="quiz-header">
        <div>Question {currentIndex + 1} sur {totalQuestions}</div>
        <div>Score: {score} | Précision: {currentAccuracy}%</div>
      </div>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
      </div>

      {/* Question Card */}
      <div className="question-panel">
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '1px' }}>
          {direction === 'fr-en' ? 'Traduisez en anglais' : 'Translate into French'}
        </div>
        <div className="word-to-translate">{questionWord}</div>
        
        <button 
          onClick={speakFrench} 
          className="pronounce-btn" 
          title="Écouter la prononciation / Hear pronunciation"
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
          {currentIndex + 1 === totalQuestions ? 'Terminer le Quiz 🏁' : 'Question Suivante ➔'}
        </button>
      )}

      {/* Keyboard Shortcuts Hint */}
      <div className="keyboard-hint">
        Raccourcis clavier : Utilisez <span className="keyboard-key">1</span>-<span className="keyboard-key">4</span> pour répondre. Appuyez sur <span className="keyboard-key">Espace</span> pour prononcer le mot. Appuyez sur <span className="keyboard-key">Entrée</span> pour continuer.
      </div>
    </div>
  );
}
