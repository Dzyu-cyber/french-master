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
    
    speakFrench();

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
      speakFrench();
    } else {
      speakFrench();
    }

    onAnswer(isAnswerCorrect, currentWord);
  };

  // Keyboard shortcut listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        if (!isAnswered) {
          checkAnswer();
        } else {
          onNext();
        }
      }

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
        <div>Question {currentIndex + 1} of {totalQuestions} / Question {currentIndex + 1} sur {totalQuestions}</div>
        <div>Score: {score} | Accuracy: {currentAccuracy}% / Précision: {currentAccuracy}%</div>
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

      {/* Answer Input */}
      <div style={{ marginBottom: '1.5rem' }}>
        <input
          ref={inputRef}
          type="text"
          className="input-field"
          placeholder={direction === 'fr-en' ? "Type the English translation... / Saisissez la traduction anglaise..." : "Type the French translation... / Saisissez la traduction française..."}
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
              <div className="feedback-title">✔️ Correct! / Correct !</div>
              <div className="feedback-solution">The translation is: / La traduction est : <strong>{correctTranslation}</strong></div>
            </div>
          ) : (
            <div>
              <div className="feedback-title">❌ Incorrect</div>
              <div className="feedback-solution">The correct answer was: / La réponse correcte était : <strong>{correctTranslation}</strong></div>
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
          Check Answer / Valider
        </button>
      ) : (
        <button onClick={onNext} className="btn btn-primary">
          {currentIndex + 1 === totalQuestions 
            ? 'Finish Quiz / Terminer le Quiz 🏁' 
            : 'Next Question / Question Suivante ➔'}
        </button>
      )}

      {/* Keyboard Shortcuts Hint */}
      <div className="keyboard-hint">
        Keyboard Shortcuts: Press <span className="keyboard-key">Enter</span> to check or continue. Press <span className="keyboard-key">Space</span> (when input is unfocused) to pronounce.
        <div style={{ fontSize: '0.75rem', marginTop: '0.2rem', opacity: 0.8 }}>
          Raccourcis : Appuyez sur <span className="keyboard-key">Entrée</span> pour valider ou continuer. Appuyez sur <span className="keyboard-key">Espace</span> (quand le champ est désélectionné) pour prononcer.
        </div>
      </div>
    </div>
  );
}
