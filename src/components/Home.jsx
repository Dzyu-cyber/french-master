import React, { useState, useEffect } from 'react';

/**
 * Start screen dashboard for setting up a quiz session.
 * @param {number} totalVocab - Size of the vocabulary dataset
 * @param {object} lastSession - Saved options from last session to prefill
 * @param {function} onStartQuiz - Callback when quiz is started with selected options
 * @param {function} onViewManual - Callback to open the learning manual / study guide
 */
export default function Home({ totalVocab, lastSession, onStartQuiz, onViewManual }) {
  // Load initial states, default to French ➔ English first
  const [direction, setDirection] = useState(lastSession?.direction || 'fr-en');
  const [mode, setMode] = useState('mc');
  
  // Range selection states
  const [rangeType, setRangeType] = useState('preset'); // 'preset' | 'custom'
  const [selectedPreset, setSelectedPreset] = useState('1 - 40');
  const [customStart, setCustomStart] = useState(1);
  const [customEnd, setCustomEnd] = useState(Math.min(totalVocab, 40));
  
  const [errorMsg, setErrorMsg] = useState('');
  const [wordCount, setWordCount] = useState(0);

  // Generate 40-word presets up to 600 words, and extra ranges dynamically
  const getPresets = () => {
    const presets = [];
    const chunkSize = 40;
    const coreWords = 600;
    
    for (let i = 1; i <= coreWords; i += chunkSize) {
      const start = i;
      const end = i + chunkSize - 1;
      presets.push({
        label: `${start} - ${end}`,
        start,
        end
      });
    }
    
    // Add extra words range if totalVocab exceeds core 600 words
    if (totalVocab > coreWords) {
      presets.push({
        label: `${coreWords + 1} - ${totalVocab} (Extra)`,
        start: coreWords + 1,
        end: totalVocab
      });
    }
    
    // All preset shows 1 - totalVocab
    presets.push({
      label: `All / Tout (1 - ${totalVocab})`,
      start: 1,
      end: totalVocab
    });
    
    return presets;
  };

  const presets = getPresets();

  // Recalculate word count and validate range
  useEffect(() => {
    if (rangeType === 'preset') {
      const preset = presets.find(p => p.label === selectedPreset);
      if (preset) {
        if (preset.start > totalVocab) {
          setErrorMsg(`Selected range (${preset.label}) exceeds current vocabulary size (${totalVocab} words). Please add more words to vocabulary.json.`);
          setWordCount(0);
        } else {
          const actualEnd = Math.min(preset.end, totalVocab);
          setWordCount(actualEnd - preset.start + 1);
          setErrorMsg('');
        }
      }
    } else {
      const start = parseInt(customStart, 10);
      const end = parseInt(customEnd, 10);

      if (isNaN(start) || isNaN(end)) {
        setErrorMsg('Please enter valid numbers / Veuillez entrer des nombres valides.');
        setWordCount(0);
      } else if (start < 1) {
        setErrorMsg('Start must be greater than 0 / Le début doit être supérieur à 0.');
        setWordCount(0);
      } else if (end > totalVocab) {
        setErrorMsg(`End cannot exceed ${totalVocab} / La fin ne peut pas dépasser ${totalVocab}.`);
        setWordCount(0);
      } else if (start > end) {
        setErrorMsg('Start must be less than end / Le début doit être inférieur à la fin.');
        setWordCount(0);
      } else {
        setWordCount(end - start + 1);
        setErrorMsg('');
      }
    }
  }, [rangeType, selectedPreset, customStart, customEnd, totalVocab]);

  // Handle start action
  const handleStart = () => {
    if (errorMsg) return;

    let start = 1;
    let end = totalVocab;

    if (rangeType === 'preset') {
      const preset = presets.find(p => p.label === selectedPreset);
      if (preset) {
        start = preset.start;
        end = Math.min(preset.end, totalVocab);
      }
    } else {
      start = parseInt(customStart, 10);
      end = parseInt(customEnd, 10);
    }

    onStartQuiz({
      direction,
      mode,
      shuffle: false,
      range: { start, end }
    });
  };

  return (
    <div className="card" style={{ animationDelay: '0.05s' }}>
      {/* Learning Direction (French ➔ English first) */}
      <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem', fontWeight: '800' }}>
        🔄 Learning Direction / Direction d'apprentissage
      </h3>
      <div className="direction-tabs">
        <button
          type="button"
          className={`direction-tab ${direction === 'fr-en' ? 'active' : ''}`}
          onClick={() => setDirection('fr-en')}
        >
          French ➔ English
        </button>
        <button
          type="button"
          className={`direction-tab ${direction === 'en-fr' ? 'active' : ''}`}
          onClick={() => setDirection('en-fr')}
        >
          English ➔ French
        </button>
      </div>

      {/* Word Range Selection */}
      <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem', fontWeight: '800' }}>
        🎯 Word Range / Sélection de l'intervalle
      </h3>
      <div className="direction-tabs" style={{ marginBottom: '1rem' }}>
        <button
          type="button"
          className={`direction-tab ${rangeType === 'preset' ? 'active' : ''}`}
          onClick={() => setRangeType('preset')}
        >
          Presets / Prédéterminé
        </button>
        <button
          type="button"
          className={`direction-tab ${rangeType === 'custom' ? 'active' : ''}`}
          onClick={() => setRangeType('custom')}
        >
          Custom / Personnalisé
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
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', display: 'block', marginBottom: '0.25rem' }}>
              Start / Début (Min: 1)
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
          <div style={{ alignSelf: 'flex-end', paddingBottom: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>
            ➔
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', display: 'block', marginBottom: '0.25rem' }}>
              End / Fin (Max: {totalVocab})
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
        <div style={{ color: 'var(--error)', fontSize: '0.9rem', marginBottom: '1.25rem', fontWeight: '600', lineHeight: '1.4' }}>
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Quiz Mode Selection */}
      <h3 style={{ marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '800' }}>
        🧠 Quiz Mode / Mode de Quiz
      </h3>
      <div className="mode-card-grid">
        <div
          className={`mode-selection-card ${mode === 'mc' ? 'active' : ''}`}
          onClick={() => setMode('mc')}
        >
          <span className="mode-icon">🔘</span>
          <span className="mode-title">Multiple Choice</span>
          <span className="mode-desc">1 of 4 / 1 sur 4</span>
        </div>
        <div
          className={`mode-selection-card ${mode === 'typing' ? 'active' : ''}`}
          onClick={() => setMode('typing')}
        >
          <span className="mode-icon">⌨️</span>
          <span className="mode-title">Type Translation</span>
          <span className="mode-desc">Write the answer / Écrire la réponse</span>
        </div>
      </div>

      {/* Selection Stats */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '1rem', fontWeight: '700' }}>
        📝 Words Selected / Mots sélectionnés: <span style={{ color: 'var(--primary)', fontSize: '1.2rem', fontWeight: '900' }}>{wordCount}</span>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <button
          onClick={handleStart}
          className="btn btn-primary"
          disabled={!!errorMsg || wordCount === 0}
        >
          🎓 Start Quiz / Commencer le Quiz
        </button>

        <button
          type="button"
          onClick={onViewManual}
          className="btn btn-secondary"
        >
          📖 Open Study Guide / Ouvrir le guide d'étude
        </button>
      </div>
    </div>
  );
}
