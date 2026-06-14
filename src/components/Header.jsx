import React from 'react';

/**
 * Top Navigation Header.
 * Displays the centered main app title branding.
 * @param {function} onGoHome - Callback to return to home view
 */
export default function Header({ onGoHome }) {
  return (
    <header>
      <h1 onClick={onGoHome} title="Back to Home / Retour à l'accueil">
        <span className="flag-badge" style={{ marginRight: '0.65rem' }}></span>French Master
      </h1>
    </header>
  );
}
