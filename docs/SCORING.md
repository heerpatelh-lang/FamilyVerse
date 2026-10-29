# FAMILYVERSE — Scoring Engine & State Management

## Scoring Rules & Integrity Architecture

FAMILYVERSE implements a fully traceable, host-confirmed, tamper-resilient scoring engine. Every point mutation is logged into an immutable event stream to guarantee fairness, auditability, and instant reversal if the host makes an input mistake.

### 1. Scoring Principles
1. **Explicit Host Confirmation**: Scores are never awarded automatically without human host verification.
2. **Double-Submission Prevention**: Action buttons (Correct, Incorrect, Skip, Goal, Bonus) transition to a disabled state immediately upon activation, blocking double clicks and rapid-fire input glitches.
3. **Traceable Event Log**: Each score action creates an event:
   ```typescript
   interface ScoreEvent {
     id: string;
     timestamp: number;
     gameId: string;
     roundNumber: number;
     targetId: string; // playerId or teamId
     targetName: string;
     pointsDelta: number;
     actionType: 'correct' | 'incorrect' | 'skip' | 'goal' | 'bonus' | 'penalty' | 'decision_points';
     reason: string;
   }
   ```
4. **Correction and Reversal**: The host can undo the most recent scoring action or adjust team/player scores manually with transparent justification.

---

## Game-by-Game Rubrics

### Football Frenzy
| Event | Points | Description |
| :--- | :---: | :--- |
| Goal Scored | +100 pts | Host confirms successful team play or goal conversion |
| Trivia Answer Correct | +50 pts | Host confirms correct tactical answer |
| Bonus Mission Accomplished | +75 pts | High-difficulty bonus trivia or teamwork challenge |
| Time Expired / Incorrect | 0 pts | No points awarded |
| Optional Foul Penalty | -25 pts | Optional rules penalty for unsportsmanlike delay |

### Heritage Quest
| Difficulty | Correct | Incorrect | Skip |
| :--- | :---: | :---: | :---: |
| Easy | +50 pts | 0 pts | 0 pts |
| Medium | +100 pts | 0 pts | 0 pts |
| Hard | +150 pts | 0 pts | 0 pts |
| Rapid-Fire Bonus | +25 pts | 0 pts | 0 pts |

### Desert Decision
| Choice Quality | Score | Host Rubric Standard |
| :--- | :---: | :--- |
| **Optimal** | +100 pts | Balances conservation of water, team safety, and navigation landmarks |
| **Good Alternative** | +70 pts | Safe choice with minor efficiency loss or slight resource depletion |
| **Risky Choice** | +35 pts | Excessive risk or unneeded fatigue; suboptimal strategy |
| **Poor Choice** | +10 pts | Severe strategic error, ignores desert survival wisdom |

### Festival Food Detective
| Stage of Deduction | Points | Rationale |
| :--- | :---: | :--- |
| Guess after Clue 1 (Aroma & Mystery) | +120 pts | Exceptional culinary and cultural deduction |
| Guess after Clue 2 (Key Ingredients) | +80 pts | Strong knowledge of regional dishes |
| Guess after Clue 3 (Cultural Festival Lore) | +50 pts | Good recognition of the celebration context |
| Final Reveal Unassisted | 0 pts | Missed challenge |

### Sports Strategy Showdown
| Strategy Rank | Points | Rubric Criteria |
| :--- | :---: | :--- |
| Tactical Masterclass | +100 pts | High-percentage play taking advantage of match context and defense |
| Solid Play | +70 pts | Standard reliable tactic with manageable counter-attack risk |
| Low Percentage Gamble | +35 pts | Overly reliant on luck or individual heroics under pressure |
| Blunder | +10 pts | Tactically flawed given clock situation and team stamina |

---

## Tie-Breaking Logic
1. If top scores are tied at the conclusion of all configured rounds:
   - Team games: Launches a single Golden Round with a decisive tactical scenario.
   - Individual games: Evaluates tie-breaker sprint scores or declares honorable Joint Champions.
2. The final results screen transparently indicates whether the victory was won in regular rounds or via tie-break resolution.

