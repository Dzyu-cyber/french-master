import React from 'react';
import Confetti from './Confetti';

/**
 * Session Summary Screen.
 * @param {number} score - Correct answers count in this session
 * @param {number} totalQuestions - Total questions in this session
 * @param {array} incorrectWords - Array of words that were missed
 * @param {function} onRestart - Callback to restart quiz with same settings
 * @param {function} onReviewIncorrect - Callback to start quiz with only incorrect words
 * @param {function} onGoHome - Callback to return to setup screen
 */
export default function Summary({
  score,
  totalQuestions,
  incorrectWords,
  onRestart,
  onReviewIncorrect,
  onGoHome
}) {
  const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  
  // Decide feedback message
  let ratingTitle = 'Bon effort !';
  let ratingDesc = 'Continuez à vous entraîner pour vous améliorer. Keep practicing to improve!';
  let ratingEmoji = '💪';

  if (accuracy === 100) {
    ratingTitle = 'Magnifique !';
    ratingDesc = 'Un sans-faute parfait ! You got a perfect score!';
    ratingEmoji = '🌟';
  } else if (accuracy >= 85) {
    ratingTitle = 'Très bien !';
    ratingDesc = 'C’est une excellente note ! Great job!';
    ratingEmoji = '🎉';
  } else if (accuracy >= 60) {
    ratingTitle = 'Pas mal !';
    ratingDesc = 'Vous êtes sur la bonne voie. You are on the right track.';
    ratingEmoji = '👍';
  } else {
    ratingTitle = 'Courage !';
    ratingDesc = 'La persévérance est la clé. Practice makes perfect!';
    ratingEmoji = '📚';
  }

  // Trigger confetti for scores >= 90%
  const showConfetti = accuracy >= 90;

  return (
    <div className="card" style={{ animationDelay: '0.1s', position: 'relative' }}>
      <Confetti active={showConfetti} />

      <h2 className="summary-title">Quiz Terminé ! 🏁</h2>
      <div className="summary-subtitle">Session Summary</div>

      {/* Encouragement Badge */}
      <div className="rating-badge">
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{ratingEmoji}</div>
        <div className="rating-title">{ratingTitle}</div>
        <div className="rating-desc">{ratingDesc}</div>
      </div>

      {/* Score Grid */}
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-value">{score} / {totalQuestions}</div>
          <div className="stat-label">Score</div>
        </div>
        <div className="stat-item">
          <div className="stat-value" style={{ color: accuracy >= 70 ? 'var(--success)' : 'var(--primary)' }}>
            {accuracy}%
          </div>
          <div className="stat-label">Précision / Accuracy</div>
        </div>
      </div>

      {/* Review Incorrect Words list */}
      {incorrectWords.length > 0 && (
        <div>
          <h3 className="incorrect-list-title">
            ❌ Mots à réviser ({incorrectWords.length}) :
          </h3>
          <div className="incorrect-items">
            {incorrectWords.map((word, index) => (
              <div key={index} className="incorrect-row">
                <span style={{ fontWeight: '600', color: 'var(--primary)' }}>{word.french}</span>
                <span style={{ color: 'var(--text-muted)' }}>➔</span>
                <span style={{ fontWeight: '500' }}>{word.english}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {incorrectWords.length > 0 && (
          <button onClick={onReviewIncorrect} className="btn btn-primary" style={{ background: 'var(--warning)', color: '#000000' }}>
            🔁 Réviser les erreurs / Practice Mistakes
          </button>
        )}
        
        <div className="btn-group" style={{ marginTop: 0 }}>
          <button onClick={onRestart} className="btn btn-primary">
            🔄 Recommencer / Replay Quiz
          </button>
          
          <button onClick={onGoHome} className="btn btn-secondary">
            🏠 Menu Principal / Main Menu
          </button>
        </div>
      </div>
    </div>
  );
}
