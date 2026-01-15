# Limitless.exchange - Market Detail Page Design

## Design Goals
- **Primary:** Increase trade conversions from new users
- **Focus:** Frictionless, prominent trading interface
- **Target:** New traders who need simplicity over advanced features

---

## Page Structure

### Above the Fold (Hero Section)
The first screen should contain everything needed to make a trade decision.

```
┌─────────────────────────────────────────────────────────────┐
│  ← Back                                    [Share] [Watch]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🏈 Sports · NFL                              Closes: 2h 34m│
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                                                         ││
│  │   Will the Chiefs win Super Bowl 2026?                  ││
│  │                                                         ││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│         YES  68%  ████████████████░░░░░░  NO  32%          │
│                                                             │
│  ┌───────────────────────┐  ┌───────────────────────────┐  │
│  │                       │  │                           │  │
│  │    BUY YES            │  │      BUY NO               │  │
│  │    0.68 per share     │  │      0.32 per share       │  │
│  │                       │  │                           │  │
│  │  [ $10 ][ $50 ][$100] │  │  [ $10 ][ $50 ][ $100 ]   │  │
│  │                       │  │                           │  │
│  │  ┌─────────────────┐  │  │  ┌─────────────────────┐  │  │
│  │  │  Trade YES →    │  │  │  │    Trade NO →       │  │  │
│  │  └─────────────────┘  │  │  └─────────────────────┘  │  │
│  │                       │  │                           │  │
│  │  Win $14.70 if Yes    │  │  Win $31.25 if No         │  │
│  │                       │  │                           │  │
│  └───────────────────────┘  └───────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Trading Interface (The Conversion Driver)

**Key Principles:**
1. **One-tap amounts** - Pre-set $10, $50, $100 buttons (no typing required)
2. **Instant feedback** - Show potential winnings immediately
3. **Clear CTAs** - Large, high-contrast "Trade YES/NO" buttons
4. **Minimal steps** - 2 taps to complete a trade (amount → confirm)

**Color Coding:**
- YES button: `#22C55E` (green) with subtle glow
- NO button: `#EF4444` (red) with subtle glow
- Background: `#0A0A0A` (near black)
- Cards: `#141414` with 1px `#262626` border

---

## Component Breakdown

### 1. Market Header
```
Location: Top of page
Height: ~80px
```
- Back arrow (left)
- Category tag + subcategory (e.g., "Sports · NFL")
- Countdown timer showing time until close
- Share & Watch icons (right)

### 2. Market Question
```
Location: Below header
Style: Large, bold, centered
```
- Font: Inter Bold, 28px (mobile) / 36px (desktop)
- Color: `#FFFFFF`
- Max 2 lines, truncate with "..." if longer

### 3. Probability Bar
```
Location: Below question
Height: 48px
```
- Visual bar showing YES/NO split
- YES percentage on left (green tinted)
- NO percentage on right (red tinted)
- Animated on load

### 4. Trading Cards (PRIMARY CONVERSION ELEMENT)
```
Location: Center of viewport
Layout: Side by side (desktop) / Stacked (mobile)
```

**YES Card:**
- Background: `#141414` with `#22C55E10` tint
- Border: 1px `#22C55E40`
- Header: "BUY YES" in `#22C55E`
- Current price per share
- Quick amount buttons: $10, $50, $100
- Primary CTA: "Trade YES →"
- Potential winnings preview

**NO Card:**
- Background: `#141414` with `#EF444410` tint
- Border: 1px `#EF444440`
- Header: "BUY NO" in `#EF4444`
- Same structure as YES card

---

## Below the Fold

### 5. Social Proof Strip
```
┌─────────────────────────────────────────────────────────────┐
│  👥 1,247 traders   📊 $45.2K volume   🔥 Trending #3       │
└─────────────────────────────────────────────────────────────┘
```

### 6. Price Chart (Collapsed by default)
- Simple line chart showing probability over time
- Expandable for more detail
- Time filters: 1H, 24H, 7D, All

### 7. Market Details (Accordion)
- **Resolution criteria** - How the market will be resolved
- **Market creator** - Who created it, their track record
- **Related markets** - Cross-sell opportunity

### 8. Activity Feed
- Recent trades (anonymized)
- Comments/discussion

---

## Mobile-First Considerations

### Mobile Layout (< 768px)
```
┌─────────────────────────┐
│  ← Back        ⋮ Menu   │
├─────────────────────────┤
│  🏈 Sports              │
│                         │
│  Will the Chiefs win    │
│  Super Bowl 2026?       │
│                         │
│  YES 68% ████░░ NO 32%  │
│                         │
├─────────────────────────┤
│  ┌─────────────────────┐│
│  │    BUY YES          ││
│  │    0.68/share       ││
│  │ [$10][$50][$100]    ││
│  │ ┌─────────────────┐ ││
│  │ │   Trade YES     │ ││
│  │ └─────────────────┘ ││
│  │ Win $14.70 if Yes   ││
│  └─────────────────────┘│
│                         │
│  ┌─────────────────────┐│
│  │    BUY NO           ││
│  │    0.32/share       ││
│  │ [$10][$50][$100]    ││
│  │ ┌─────────────────┐ ││
│  │ │    Trade NO     │ ││
│  │ └─────────────────┘ ││
│  │ Win $31.25 if No    ││
│  └─────────────────────┘│
└─────────────────────────┘
```

### Sticky Mobile CTA (Alternative)
For even faster conversion, consider a sticky bottom bar:
```
┌─────────────────────────┐
│  [BUY YES]   [BUY NO]   │  ← Always visible
└─────────────────────────┘
```

---

## Conversion Optimization Tactics

### 1. Reduce Friction
- [ ] Pre-select $10 amount by default
- [ ] Show potential winnings before clicking
- [ ] One-tap trade for logged-in users with balance
- [ ] Guest mode: Allow viewing, prompt signup only at trade

### 2. Create Urgency
- [ ] Countdown timer prominent when < 24h remaining
- [ ] "X people trading now" live indicator
- [ ] Price movement alerts ("Odds shifted 5% in last hour")

### 3. Build Confidence
- [ ] "How it works" tooltip for new users
- [ ] Show resolution source (e.g., "Resolved by AP News")
- [ ] Display market creator reputation

### 4. Encourage Action
- [ ] Animated CTA buttons (subtle pulse)
- [ ] Success state celebration after trade
- [ ] "Share your prediction" prompt after trading

---

## Color Palette

| Element         | Color Code  | Usage                    |
|-----------------|-------------|--------------------------|
| Background      | `#0A0A0A`   | Page background          |
| Card BG         | `#141414`   | Card backgrounds         |
| Border          | `#262626`   | Subtle borders           |
| Text Primary    | `#FFFFFF`   | Headlines, important     |
| Text Secondary  | `#A3A3A3`   | Descriptions, labels     |
| YES/Green       | `#22C55E`   | Buy YES elements         |
| NO/Red          | `#EF4444`   | Buy NO elements          |
| Accent          | `#3B82F6`   | Links, highlights        |

---

## Typography

| Element       | Font             | Size (Mobile/Desktop) |
|---------------|------------------|-----------------------|
| Market Title  | Inter Bold       | 28px / 36px           |
| Card Headers  | Inter SemiBold   | 18px / 20px           |
| Body Text     | Inter Regular    | 14px / 16px           |
| Labels        | Inter Medium     | 12px / 14px           |
| CTAs          | Inter SemiBold   | 16px / 18px           |

---

## Interaction States

### Trade Button States
1. **Default:** Solid color, ready to click
2. **Hover:** Slight lift (translateY -2px), brighter glow
3. **Active/Pressed:** Scale down slightly (0.98)
4. **Loading:** Show spinner, disable button
5. **Success:** Green checkmark, brief celebration animation

### Card Hover (Desktop)
- Subtle border glow
- Slight scale up (1.01)
- Transition: 200ms ease

---

## A/B Test Ideas

1. **Amount presets:** Test $5/$25/$50 vs $10/$50/$100
2. **CTA text:** "Trade YES" vs "Buy YES" vs "Predict YES"
3. **Layout:** Side-by-side cards vs tabbed interface
4. **Urgency:** With/without countdown timer
5. **Social proof:** Above vs below trading cards

---

## Next Steps

1. Create high-fidelity mockups in Figma
2. Build React component prototype
3. Implement analytics tracking for conversion funnel
4. Set up A/B testing framework
5. Launch with 10% traffic, measure, iterate
