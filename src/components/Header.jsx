import React from 'react';

/**
 * Top Navigation Header.
 * @param {string} theme - 'light' | 'dark'
 * @param {function} toggleTheme - Callback to switch theme
 * @param {function} onViewStats - Callback to navigate to statistics screen
 * @param {number} streak - Daily streak count
 * @param {function} onGoHome - Callback to return to home view
 */
export default function Header({ theme, toggleTheme, onViewStats, streak, onGoHome }) {
  return (
    <header>
      <h1 onClick={onGoHome} title="Retour à l'accueil / Back to Home">
        <span>🇨🇵</span> French Trainer
      </h1>
      
      <div className="header-controls">
        {streak > 0 && (
          <div className="streak-badge" title={`${streak} jours d'affilée / ${streak} day streak`}>
            <span>🔥</span> {streak}
          </div>
        )}
        
        <button 
          onClick={onViewStats} 
          className="icon-btn" 
          title="Statistiques / Stats"
          aria-label="View Statistics"
        >
          📊
        </button>
        
        <button 
          onClick={toggleTheme} 
          className="icon-btn" 
          title={theme === 'dark' ? 'Mode clair / Light Mode' : 'Mode sombre / Dark Mode'}
          aria-label="Toggle Dark Mode"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
