import React, { useState, useEffect } from 'react';

/**
 * Start screen dashboard for setting up a quiz session.
 * @param {number} totalVocab - Size of the vocabulary dataset
 * @param {object} lastSession - Saved options from last session to prefill
 * @param {function} onStartQuiz - Callback when quiz is started with selected options
 */
export default function Home({ totalVocab, lastSession, onStartQuiz }) {
  // Load initial states from lastSession values or defaults
  const [direction, setDirection] = useState(lastSession?.direction || 'fr-en');
  const [mode, setMode] = useState(lastSession?.mode || 'mc');
  const [shuffle, setShuffle] = useState(lastSession?.shuffle !== undefined ? lastSession.shuffle : true);
  
  // Range selection states
  const [rangeType, setRangeType] = useState('preset'); // 'preset' | 'custom'
  const [selectedPreset, setSelectedPreset] = useState('1-20');
  const [customStart, setCustomStart] = useState(1);
  const [customEnd, setCustomEnd] = useState(Math.min(totalVocab, 50));
  
  const [errorMsg, setErrorMsg] = useState('');
  const [wordCount, setWordCount] = useState(20);

  // Generate presets dynamically based on the total vocabulary size
  const getPresets = () => {
    const presets = [];
    if (totalVocab >= 20) {
      presets.push({ label: '1 - 20', start: 1, end: 20 });
      if (totalVocab >= 40) presets.push({ label: '21 - 40', start: 21, end: 40 });
      if (totalVocab >= 60) presets.push({ label: '41 - 60', start: 41, end: 60 });
    }
    
    if (totalVocab >= 50) {
      presets.push({ label: '1 - 50', start: 1, end: 50 });
    }
    if (totalVocab >= 100) {
      presets.push({ label: '1 - 100', start: 1, end: 100 });
      presets.push({ label: '101 - 200', start: 101, end: 200 });
    }
    if (totalVocab >= 500) {
      presets.push({ label: '1 - 500', start: 1, end: 500 });
    }
    if (totalVocab >= 1000) {
      presets.push({ label: '1 - 1000', start: 1, end: 1000 });
    }
    
    // Always include a full list preset
    presets.push({ label: `Tout (1 - ${totalVocab})`, start: 1, end: totalVocab });
    return presets;
  };

  const presets = getPresets();

  // Recalculate word count and validate range
  useEffect(() => {
    if (rangeType === 'preset') {
      const preset = presets.find(p => p.label === selectedPreset);
      if (preset) {
        setWordCount(preset.end - preset.start + 1);
        setErrorMsg('');
      }
    } else {
      const start = parseInt(customStart, 10);
      const end = parseInt(customEnd, 10);

      if (isNaN(start) || isNaN(end)) {
        setErrorMsg('Veuillez entrer des nombres valides / Please enter valid numbers.');
        setWordCount(0);
      } else if (start < 1) {
        setErrorMsg('Le début doit être supérieur à 0 / Start must be greater than 0.');
        setWordCount(0);
      } else if (end > totalVocab) {
        setErrorMsg(`La fin ne peut pas dépasser ${totalVocab} / End cannot exceed ${totalVocab}.`);
        setWordCount(0);
      } else if (start > end) {
        setErrorMsg('Le début doit être inférieur à la fin / Start must be less than end.');
        setWordCount(0);
      } else {
        setWordCount(end - start + 1);
        setErrorMsg('');
      }
    }
  }, [rangeType, selectedPreset, customStart, customEnd, totalVocab, selectedPreset]);

  // Handle start action
  const handleStart = () => {
    if (errorMsg) return;

    let start = 1;
    let end = totalVocab;

    if (rangeType === 'preset') {
      const preset = presets.find(p => p.label === selectedPreset);
      if (preset) {
        start = preset.start;
        end = preset.end;
      }
    } else {
      start = parseInt(customStart, 10);
      end = parseInt(customEnd, 10);
    }

    onStartQuiz({
      direction,
      mode,
      shuffle,
      range: { start, end }
    });
  };

  return (
    <div className="card" style={{ animationDelay: '0.05s' }}>
      {/* Language Direction */}
      <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem', fontWeight: '700' }}>
        🔄 Direction d'apprentissage / Learning Direction
      </h3>
      <div className="direction-tabs">
        <button
          type="button"
          className={`direction-tab ${direction === 'fr-en' ? 'active' : ''}`}
          onClick={() => setDirection('fr-en')}
        >
          Français ➔ Anglais
        </button>
        <button
          type="button"
          className={`direction-tab ${direction === 'en-fr' ? 'active' : ''}`}
          onClick={() => setDirection('en-fr')}
        >
          English ➔ French
        </button>
      </div>

      {/* Range Selection Type Tabs */}
      <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem', fontWeight: '700' }}>
        🎯 Sélection de l'intervalle / Word Range
      </h3>
      <div className="direction-tabs" style={{ marginBottom: '1rem' }}>
        <button
          type="button"
          className={`direction-tab ${rangeType === 'preset' ? 'active' : ''}`}
          onClick={() => setRangeType('preset')}
        >
          Prédéterminé / Presets
        </button>
        <button
          type="button"
          className={`direction-tab ${rangeType === 'custom' ? 'active' : ''}`}
          onClick={() => setRangeType('custom')}
        >
          Personnalisé / Custom
        </button>
      </div>

      {/* Range Options */}
      {rangeType === 'preset' ? (
        <div className="range-grid">
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              className={`range-chip ${selectedPreset === preset.label ? 'active' : ''}`}
              onClick={() => setSelectedPreset(preset.label)}
            >
              {preset.label}
            </button>
          ))}
        </div>
      ) : (
        <div className="custom-range-inputs">
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', display: 'block', marginBottom: '0.25rem' }}>
              Début / Start (Min: 1)
            </label>
            <input
              type="number"
              className="input-field"
              value={customStart}
              min="1"
              max={totalVocab}
              onChange={(e) => setCustomStart(e.target.value)}
            />
          </div>
          <div style={{ paddingSelf: 'flex-end', paddingTop: '1rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>
            ➔
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', display: 'block', marginBottom: '0.25rem' }}>
              Fin / End (Max: {totalVocab})
            </label>
            <input
              type="number"
              className="input-field"
              value={customEnd}
              min="1"
              max={totalVocab}
              onChange={(e) => setCustomEnd(e.target.value)}
            />
          </div>
        </div>
      )}

      {errorMsg && (
        <div style={{ color: 'var(--error)', fontSize: '0.9rem', marginBottom: '1.25rem', fontWeight: '500' }}>
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Quiz Mode Selection */}
      <h3 style={{ marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '700' }}>
        🧠 Mode de Quiz / Quiz Mode
      </h3>
      <div className="mode-card-grid">
        <div
          className={`mode-selection-card ${mode === 'mc' ? 'active' : ''}`}
          onClick={() => setMode('mc')}
        >
          <span className="mode-icon">🔘</span>
          <span className="mode-title">Choix Multiple</span>
          <span className="mode-desc">Multiple Choice (1 of 4)</span>
        </div>
        <div
          className={`mode-selection-card ${mode === 'typing' ? 'active' : ''}`}
          onClick={() => setMode('typing')}
        >
          <span className="mode-icon">⌨️</span>
          <span className="mode-title">Traduction Écrite</span>
          <span className="mode-desc">Type the translation</span>
        </div>
      </div>

      {/* Settings (Shuffle Option) */}
      <div className="switch-container">
        <span className="switch-label">🔀 Mélanger les mots / Shuffle words</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={shuffle}
            onChange={(e) => setShuffle(e.target.checked)}
          />
          <span className="slider"></span>
        </label>
      </div>

      {/* Selection Stats */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: '600' }}>
        📝 Words Selected: <span style={{ color: 'var(--primary)', fontSize: '1.1rem', fontWeight: '800' }}>{wordCount}</span>
      </div>

      {/* Start Button */}
      <button
        onClick={handleStart}
        className="btn btn-primary"
        disabled={!!errorMsg || wordCount === 0}
      >
        🎓 Commencer le Quiz / Start Quiz
      </button>
    </div>
  );
}
