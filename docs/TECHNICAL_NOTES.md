# FAMILYVERSE — Technical Notes & Architecture

## System Architecture

FAMILYVERSE is engineered with a modular, highly maintainable frontend architecture utilizing **React 18 + TypeScript + Vite + Tailwind CSS + Lucide Icons**.

```
FamilyVerse/
├── public/                     # Static assets, favicon, brand graphics, audio cues
│   └── sounds/                 # Accessible audio feedback (timer, bell, victory)
├── docs/                       # Project documentation & competition guides
│   ├── GAME_RULES.md           # In-depth game rules and gameplay flows
│   ├── SCORING.md              # Detailed scoring rubrics and event stream
│   └── TECHNICAL_NOTES.md      # Engineering architecture and design decisions
├── src/
│   ├── assets/                 # Custom SVG illustrations & covers
│   ├── components/             # Reusable atomic UI elements
│   │   ├── common/             # Button, Card, Modal, Badge, Timer, ProgressBar
│   │   ├── navigation/         # Header, Footer, Breadcrumbs, ExitModal
│   │   ├── scoreboard/         # LiveRankings, ScoreDeltaPill, ConfettiCannon
│   │   └── host/               # HostControlBar, QuickScorer, HistoryDrawer
│   ├── context/                # Global GameSessionContext & SoundContext
│   ├── data/                   # Curated challenge databases (5 complete game decks)
│   │   ├── footballChallenges.ts
│   │   ├── heritageChallenges.ts
│   │   ├── desertChallenges.ts
│   │   ├── foodChallenges.ts
│   │   └── sportsChallenges.ts
│   ├── engine/                 # Core game loops, turn rotation, timer, scoring
│   │   ├── sessionManager.ts
│   │   ├── timerEngine.ts
│   │   ├── scoringEngine.ts
│   │   └── tieBreaker.ts
│   ├── screens/                # The 8 PRD Screen Views
│   │   ├── 1_LandingPage.tsx
│   │   ├── 2_PlayerSetup.tsx
│   │   ├── 3_GameSelection.tsx
│   │   ├── 4_GameConfig.tsx
│   │   ├── 5_ChallengeStudio.tsx
│   │   ├── 6_Gameplay.tsx
│   │   ├── 7_ScoreboardModal.tsx
│   │   └── 8_FinalResults.tsx
│   ├── services/               # AI generation client & offline deterministic engine
│   │   ├── aiService.ts
│   │   └── geminiClient.ts
│   ├── types/                  # TypeScript interfaces for games, players, events
│   │   └── index.ts
│   ├── utils/                  # Color palettes, string helpers, sound synth
│   │   ├── soundSynth.ts       # Web Audio API synthesizers (zero external deps)
│   │   └── storage.ts          # LocalStorage hydration & recovery
│   ├── App.tsx                 # Screen router & state orchestration
│   ├── index.css               # Design tokens, Tailwind directives, dark theme
│   └── main.tsx                # React root mount
├── AI_CONTENT.md               # AI generation methodology, validation, rubrics
├── TESTING.md                  # Comprehensive acceptance test checklist
├── package.json                # Project dependencies and npm scripts
├── vite.config.ts              # Vite bundling configuration
├── tailwind.config.js          # Color palette design system
└── README.md                   # Quickstart, overview, student explanation guide
```

---

## State Architecture & Session Recovery
1. **Centralized Game State (`GameSessionContext`)**:
   - `session`: Contains `sessionId`, `selectedGameId`, `players`, `teams`, `currentRound`, `currentTurnIndex`, `scores`, `eventLog`, `status`.
   - `timer`: Accurate state machine (`idle`, `running`, `paused`, `expired`) driven by delta-time timestamps rather than naive `setInterval`, preventing drift when tabs are backgrounded.
2. **Local Storage Session Persistence**:
   - Every state transition serializes to `localStorage.getItem('familyverse_session')`.
   - If a browser tab is accidentally refreshed or closed during game night, the session is restored instantly with an optional "Resume Session" banner.

---

## Visual Design System Implementation
All colors match the PRD specification:
- **Midnight Navy**: `#10152B` (Main background)
- **Deep Indigo**: `#20265B` (Card surface and elevated panels)
- **Electric Violet**: `#7957FF` (Primary actions, AI badges, key highlights)
- **Vibrant Cyan**: `#39D5FF` (Secondary accents, timer indicators, cyan glows)
- **Warm Gold**: `#FFC857` (Trophies, winner badges, star ratings)
- **Coral**: `#FF786E` (Alerts, penalties, high-stakes decisions)
- **Soft Lavender**: `#EEEAFE` (Subtle text, muted borders)
- **White**: `#FFFFFF` (High-contrast typography)
- **Muted Text**: `#AAB3D0` (Secondary labels, metadata)

---

## Zero External Sound Asset Dependency
Audio feedback (countdown warnings, correct cheer, button clicks, victory fanfares) is powered by the browser's built-in **Web Audio API** (`soundSynth.ts`). This ensures:
- Instant playback with 0ms network latency.
- Completely offline functionality.
- Volume control and instant mute toggle for sensory-friendly play.

