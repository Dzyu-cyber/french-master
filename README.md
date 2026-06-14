# French Master 🇫🇷

**French Master** is a premium, interactive, and high-performance React web application designed to help language learners master frequency-based French vocabulary. Built on a modern Dark Theme with a custom HSL design system, it supports bi-directional learning, multiple game modes, speech audio synthesis, and persistent local stats.

---

## 🚀 Key Features

*   **Frosted Glass UI (Glassmorphism)**: Beautiful dark tech-grid aesthetic featuring glowing floating background blobs, sleek borders, and custom indigo/blue scrollbars.
*   **Complete 638-Word Database**: Loaded with the core top 600 frequency-based French words alongside essential structural pillars, pronouns, connectors, and quantifiers.
*   **Dual Learning Modes**:
    1.  **Multiple Choice**: Select 1 out of 4 options (optimized with Fisher-Yates shuffling to prevent bias). Supports hotkeys `1`-`4`.
    2.  **Type Translation**: Type the exact French or English translations with support for multiple accepted solutions (divided by slashes, e.g., "to do / to make").
*   **Native Speech Engine**: Pronounces words automatically using the browser's native **Web Speech API** (`speechSynthesis`) configured for a native `fr-FR` accent. Supports keyboard `Space` key to repeat.
*   **Dynamic Viewport Tracking**:
    *   Saves and calculates your daily active streak inside the browser.
    *   Automatically scrolls page viewport back to the top on reloads and view transitions.
*   **Zero-Flicker Transitions**: Employs React component key resets (`key={currentWord.french}`) to synchronize state transitions instantly without frame lag.
*   **Incorrect Review Session**: Allows learners to review and re-test only the words they answered incorrectly.
*   **Comprehensive Study Guide**: A complete, scrollable manual listing all 638 words, examples, and grammatical overviews, featuring smooth relative container scrolling.

---

## 🛠️ Technology Stack

*   **Frontend Library**: React (Vite template for rapid Hot Module Replacement).
*   **Styling**: Custom CSS (Vanilla variables, grid systems, keyframe animations, and custom scrollbar thumb tracks).
*   **Audio Synthesis**: Web Speech API (`SpeechSynthesisUtterance`).
*   **Storage**: LocalStorage API for persisting daily streaks and last session settings.

---

## 📂 Project Structure

```
├── public/                # Favicon and static assets
├── src/
│   ├── components/
│   │   ├── Header.jsx     # Navigation header with French Flag badge
│   │   ├── Home.jsx       # Setup dashboard with dynamic range chips
│   │   ├── QuizMC.jsx     # Multiple choice quiz engine
│   │   ├── QuizTyping.jsx # Typing translation quiz engine
│   │   ├── Summary.jsx    # Stats, accuracy score, and mistake review list
│   │   ├── Manual.jsx     # Top-638 scrollable grammar and vocab guide
│   │   └── Confetti.jsx   # Victory confetti canvas triggers
│   ├── data/
│   │   └── vocabulary.json # Cleaned 638-word JSON dictionary
│   ├── hooks/
│   │   └── useLocalStorage.js # Settings & streak persistence hook
│   ├── App.jsx            # Routing, viewport scrolling, and state handlers
│   ├── index.css          # Dark design system CSS (HSL variables)
│   └── main.jsx           # App mounting entry point
├── index.html             # High-resolution vector flag favicon
├── vite.config.js         # Vite configuration file
└── package.json           # Scripts and dependencies
```

---

## ⌨️ Keyboard Shortcuts

During active quiz sessions, you can use the following hotkeys to speed up your study:

| Key | Action | Available In |
|---|---|---|
| **`1` - `4`** | Choose corresponding answer choice | Multiple Choice |
| **`Space`** | Repeat French audio pronunciation | Both (when typing input is unfocused) |
| **`Enter`** | Validate answer / Continue to next question | Both |

---

## ⚙️ Local Development Setup

To run French Master on your machine:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Dzyu-cyber/french-master.git
   cd french-master
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Dev Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build Production Bundle**:
   ```bash
   npm run build
   ```

---

## ☁️ Deployment (Vercel)

The easiest way to deploy this project is via Vercel:

1. Sign in to [Vercel](https://vercel.com/) with GitHub.
2. Click **Add New Project** and select `french-master` from your repositories.
3. Click **Deploy**. Vercel will automatically configure Vite and serve your static files over a secure, globally distributed CDN.
