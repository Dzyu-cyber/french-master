import React, { useState, useEffect, useRef } from 'react';

/**
 * Typing Quiz Component.
 * @param {object} currentWord - The current active vocabulary word { french, english }
 * @param {string} direction - 'fr-en' | 'en-fr'
 * @param {number} currentIndex - Index of current question in session
 * @param {number} totalQuestions - Total questions in this session
 * @param {number} score - Current correct count
 * @param {function} onAnswer - Callback when an answer is evaluated (isCorrect, answeredWord)
 * @param {function} onNext - Callback to load next question
 */
export default function QuizTyping({
  currentWord,
  direction,
  currentIndex,
  totalQuestions,
  score,
  onAnswer,
  onNext
}) {
  const [userInput, setUserInput] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasShaker, setHasShaker] = useState(false);
  
  const inputRef = useRef(null);

  const questionWord = direction === 'fr-en' ? currentWord.french : currentWord.english;
  const correctTranslation = direction === 'fr-en' ? currentWord.english : currentWord.french;
  const frenchWordToPronounce = currentWord.french;

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

  // Focus input and pronounce word when question loads
  useEffect(() => {
    setUserInput('');
    setIsAnswered(false);
    setIsCorrect(false);
    setHasShaker(false);
    
    // Speak French word
    speakFrench();

    // Auto-focus input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentWord]);

  // Answer validation logic
  const checkAnswer = () => {
    if (isAnswered) return;
    if (!userInput.trim()) return;

    const typed = userInput.trim().toLowerCase();
    const solution = correctTranslation.trim().toLowerCase();

    // Support multiple translations separated by slashes (e.g. "to do / to make")
    const possibleSolutions = solution.split('/').map(s => s.trim());
    const isAnswerCorrect = possibleSolutions.some(s => s === typed);

    setIsCorrect(isAnswerCorrect);
    setIsAnswered(true);

    if (!isAnswerCorrect) {
      setHasShaker(true);
      // Trigger speak on incorrect answer so they hear the word again
      speakFrench();
    } else {
      speakFrench();
    }

    onAnswer(isAnswerCorrect, currentWord);
  };

  // Keyboard shortcut listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Enter key submits or moves next
      if (e.key === 'Enter') {
        if (!isAnswered) {
          checkAnswer();
        } else {
          onNext();
        }
      }

      // Spacebar plays audio, but only if input is not focused
      if (e.key === ' ' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        speakFrench();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [userInput, isAnswered, correctTranslation, onNext]);

  // Calculate Accuracy
  const answeredCount = currentIndex;
  const currentAccuracy = answeredCount > 0 ? Math.round((score / answeredCount) * 100) : 0;
  const progressPercent = Math.round(((currentIndex) / totalQuestions) * 100);

  return (
    <div className={`card ${hasShaker ? 'shake' : ''}`} style={{ animationDelay: '0.1s' }}>
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

      {/* Answer Input */}
      <div style={{ marginBottom: '1.5rem' }}>
        <input
          ref={inputRef}
          type="text"
          className="input-field"
          placeholder={direction === 'fr-en' ? "Saisissez la traduction anglaise..." : "Saisissez la traduction française..."}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isAnswered}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>

      {/* Feedback Banner */}
      {isAnswered && (
        <div className={`feedback-box ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? (
            <div>
              <div className="feedback-title">✔️ Correct !</div>
              <div className="feedback-solution">La traduction est : <strong>{correctTranslation}</strong></div>
            </div>
          ) : (
            <div>
              <div className="feedback-title">❌ Incorrect</div>
              <div className="feedback-solution">La réponse correcte était : <strong>{correctTranslation}</strong></div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      {!isAnswered ? (
        <button
          onClick={checkAnswer}
          className="btn btn-primary"
          disabled={!userInput.trim()}
        >
          Valider / Check Answer
        </button>
      ) : (
        <button onClick={onNext} className="btn btn-primary">
          {currentIndex + 1 === totalQuestions ? 'Terminer le Quiz 🏁' : 'Question Suivante ➔'}
        </button>
      )}

      {/* Keyboard Shortcuts Hint */}
      <div className="keyboard-hint">
        Raccourcis : Appuyez sur <span className="keyboard-key">Entrée</span> pour valider ou continuer. Appuyez sur <span className="keyboard-key">Espace</span> (quand le champ est désélectionné) pour prononcer.
      </div>
    </div>
  );
}
