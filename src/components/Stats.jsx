import React from 'react';

/**
 * Stats dashboard showing cumulative learning statistics.
 * @param {object} stats - { attempts, correct, incorrect }
 * @param {function} onReset - Callback to reset stats
 * @param {function} onBack - Callback to return home
 * @param {number} totalVocab - Size of the vocabulary dataset
 */
export default function Stats({ stats, onReset, onBack, totalVocab }) {
  const { attempts, correct, incorrect } = stats;
  const accuracy = attempts > 0 ? Math.round((correct / attempts) * 100) : 0;

  const handleResetClick = () => {
    if (window.confirm("Êtes-vous sûr ? Are you sure you want to reset all your statistics? This cannot be undone.")) {
      onReset();
    }
  };

  return (
    <div className="card" style={{ animationDelay: '0.1s' }}>
      <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>📊</span> Statistiques
      </h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Suivez vos progrès au fil du temps. Track your progress over time.
      </p>

      <div className="stats-header-info">
        <div className="stats-total-badge">
          <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>{totalVocab}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>
            Mots disponibles / Words Available
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-value">{attempts}</div>
          <div className="stat-label">Tentatives / Attempts</div>
        </div>
        <div className="stat-item">
          <div className="stat-value" style={{ color: 'var(--success)' }}>{correct}</div>
          <div className="stat-label">Correct</div>
        </div>
        <div className="stat-item">
          <div className="stat-value" style={{ color: 'var(--error)' }}>{incorrect}</div>
          <div className="stat-label">Incorrect</div>
        </div>
        <div className="stat-item">
          <div className="stat-value" style={{ color: accuracy >= 70 ? 'var(--success)' : accuracy >= 40 ? 'var(--warning)' : 'var(--error)' }}>
            {accuracy}%
          </div>
          <div className="stat-label">Précision / Accuracy</div>
        </div>
      </div>

      <div className="btn-group">
        <button onClick={onBack} className="btn btn-secondary">
          🏠 Retour / Home
        </button>
        <button onClick={handleResetClick} className="btn btn-secondary" style={{ color: 'var(--error)', borderColor: 'rgba(244, 63, 94, 0.2)' }}>
          🗑️ Réinitialiser / Reset
        </button>
      </div>
    </div>
  );
}
