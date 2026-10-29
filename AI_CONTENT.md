# FAMILYVERSE — AI Content Integration & Safety

**Competition**: 6th Annual COE STEM Programming with AI Competition  
**Track**: Cycle 2 — Grades 6–8  
**Team**: 467 | **Team Code**: JFXGN  

---

## 1. AI Integration Strategy

In FAMILYVERSE, AI does not just sit in an external chat window—**AI-created content is the heartbeat of actual gameplay**. Every question, tactical scenario, riddle, and scoring rubric is generated and shaped by AI prompts specifically crafted for multi-generational family engagement, cultural reverence, and pedagogical value.

### Dual-Mode AI Architecture
To guarantee 100% reliability during live competition judging and classroom presentations while preserving real AI generation capabilities, FAMILYVERSE incorporates a dual-mode engine:

```
                  ┌────────────────────────────────────────┐
                  │          AI Challenge Studio           │
                  └──────────────────┬─────────────────────┘
                                     │
                 ┌───────────────────┴───────────────────┐
                 │ Is Live API configured and available? │
                 └─────────┬───────────────────┬─────────┘
                           │                   │
                     YES   ▼                   ▼   NO (Default)
               ┌──────────────────────┐   ┌───────────────────────────┐
               │ Live Google Gemini   │   │ Curated AI Database       │
               │ Generative AI API    │   │ (Verified & Fact-Checked) │
               │ Client-safe fallback │   │ 60+ challenges, 5 games   │
               └──────────┬───────────┘   └─────────────┬─────────────┘
                          │                             │
                          └──────────────┬──────────────┘
                                         ▼
                          ┌─────────────────────────────┐
                          │ Active Gameplay Integration │
                          │ (Cards, Rubrics, Scoring)   │
                          └─────────────────────────────┘
```

1. **Curated High-Quality AI Challenge Dataset (Offline-First)**:
   - Contains over 65 meticulously fact-checked challenges across all 5 games.
   - Pre-generated using frontier AI models with strict system prompts for cultural accuracy, age appropriateness (Grades 6–8 and family-friendly), and rich rubrics.
   - Guaranteed zero runtime failures, zero latency, and zero dependency on external network conditions.
   - Clearly stamped with `verificationStatus: "Verified Curated AI"`.

2. **Live AI Challenge Studio (Runtime AI Engine)**:
   - When a host clicks **Generate Challenge** in Screen 5, they can select categories, themes, and difficulty.
   - If an API key is provided via `VITE_GEMINI_API_KEY`, the application performs a direct, real-time structured prompt query.
   - If an API key is not present, the studio runs an intelligent prompt-matching generator from the curated AI corpus, showing a clear badge: `Source: Curated AI Engine (Verified Offline Fallback)`. The application never falsely claims an external network request occurred when using the fallback.

---

## 2. Content Quality, Safety & Fact-Checking

### Cultural Integrity & UAE Heritage (Heritage Quest & Festival Food Detective)
- Questions concerning UAE traditions (e.g., *Al Sadu* weaving, pearling history, *Al Khous* palm frond craft, falconry, *Majlis* hospitality etiquette, Liwa Date Festival) have been cross-checked against documented cultural heritage resources.
- Food origins celebrate cultural intersections without stereotyping. For example, *Machboos*, *Harees*, *Baklava*, and *Umm Ali* are contextualized with culinary history and festive traditions across the region.

### Age Appropriateness & Fictional Scenario Safety (Desert Decision)
- Scenarios are exciting, creative, and safe for middle-school students.
- Scenarios center around fictional situations (e.g., "The Stargazer's Caravan", "The Lost Bedouin Oasis Map", "The Solar Beacon Glitch").
- Clear disclaimer: Scenarios are fictional game challenges designed to foster critical thinking, teamwork, and planning, not real-world survival directives.

### Fair & Balanced Sports Scenarios (Football Frenzy & Sports Strategy Showdown)
- Scenarios do not replicate or infringe upon copyrighted player likenesses or professional teams.
- Rubrics provide clear tactical rationale for why choices receive high, medium, or low scores based on match time, fatigue, momentum, and risk-reward ratios.

---

## 3. Challenge Schema Specification

Every challenge in FAMILYVERSE adheres to a strict TypeScript schema:

```typescript
export interface GameChallenge {
  id: string;
  gameId: 'football' | 'heritage' | 'desert' | 'food' | 'sports';
  title: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  promptText: string;
  clues?: string[];
  options?: {
    id: string;
    text: string;
    points: number;
    feedback: string;
  }[];
  revealedAnswer: string;
  explanation: string;
  rubric: {
    criteria: string;
    fullPointsCondition: string;
    partialPointsCondition?: string;
  };
  culturalContext?: string;
  tacticalTip?: string;
  verificationStatus: 'Verified Curated AI' | 'Live Generated AI';
  source: string;
}
```

