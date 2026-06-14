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
 * @param {number} streak - User's active daily practice streak
 */
export default function Summary({
  score,
  totalQuestions,
  incorrectWords,
  onRestart,
  onReviewIncorrect,
  onGoHome,
  streak
}) {
  const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  
  // Decide feedback message (English first)
  let ratingTitle = 'Keep practicing! / Courage !';
  let ratingDesc = 'Practice makes perfect! / La persévérance est la clé.';
  let ratingEmoji = '💪';

  if (accuracy === 100) {
    ratingTitle = 'Perfect score! / Magnifique !';
    ratingDesc = 'You got a perfect score! / Un sans-faute parfait !';
    ratingEmoji = '🌟';
  } else if (accuracy >= 85) {
    ratingTitle = 'Great job! / Très bien !';
    ratingDesc = 'Excellent score! Great job! / C’est une excellente note !';
    ratingEmoji = '🎉';
  } else if (accuracy >= 60) {
    ratingTitle = 'On the right track! / Pas mal !';
    ratingDesc = 'You are on the right track. / Vous êtes sur la bonne voie.';
    ratingEmoji = '👍';
  } else {
    ratingTitle = 'Keep practicing! / Courage !';
    ratingDesc = 'Practice makes perfect! / La persévérance est la clé.';
    ratingEmoji = '📚';
  }

  // Trigger confetti for scores >= 90%
  const showConfetti = accuracy >= 90;

  return (
    <div className="card" style={{ animationDelay: '0.1s', position: 'relative' }}>
      <Confetti active={showConfetti} />

      <h2 className="summary-title">Quiz Completed! / Quiz Terminé ! 🏁</h2>
      <div className="summary-subtitle">Session Summary / Résumé de la session</div>

      {/* Streak Celebration Badge */}
      {streak > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div className="streak-badge" style={{ fontSize: '1.05rem', padding: '0.5rem 1.25rem' }}>
            <span>🔥</span> Daily Streak: {streak} Day{streak > 1 ? 's' : ''} / Série : {streak} Jour{streak > 1 ? 's' : ''}
          </div>
        </div>
      )}

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
          <div className="stat-label">Accuracy / Précision</div>
        </div>
      </div>

      {/* Review Incorrect Words list */}
      {incorrectWords.length > 0 && (
        <div>
          <h3 className="incorrect-list-title">
            ❌ Words to Review / Mots à réviser ({incorrectWords.length}) :
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
            🔁 Practice Mistakes / Réviser les erreurs
          </button>
        )}
        
        <div className="btn-group" style={{ marginTop: 0 }}>
          <button onClick={onRestart} className="btn btn-primary">
            🔄 Replay Quiz / Recommencer
          </button>
          
          <button onClick={onGoHome} className="btn btn-secondary">
            🏠 Main Menu / Menu Principal
          </button>
        </div>
      </div>
    </div>
  );
}
