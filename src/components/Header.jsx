import React from 'react';

/**
 * Top Navigation Header.
 * Displays the main app heading centered and a floating theme toggle.
 * @param {string} theme - 'light' | 'dark'
 * @param {function} toggleTheme - Callback to switch theme
 * @param {function} onGoHome - Callback to return to home view
 */
export default function Header({ theme, toggleTheme, onGoHome }) {
  return (
    <header>
      <h1 onClick={onGoHome} title="Back to Home / Retour à l'accueil">
        <span className="flag-badge" style={{ marginRight: '0.65rem' }}></span>French Master
      </h1>
      
      <div className="header-controls">
        <button 
          onClick={toggleTheme} 
          className="icon-btn" 
          title={theme === 'dark' ? 'Light Mode / Mode clair' : 'Dark Mode / Mode sombre'}
          aria-label="Toggle Dark Mode"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
