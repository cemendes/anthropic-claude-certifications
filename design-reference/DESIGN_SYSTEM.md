# Stitch Design System Reference

## Color Tokens (from Stitch mockups)
```
background: #0D0D0D (page bg — darker than #141219)
card-level-1: #1A1A1A (primary cards)
card-level-2: #262626 (nested cards, scenario boxes)
border: #262626 (card borders)
border-hover: rgba(107, 79, 187, 0.3) (purple glow on hover)

primary: #CEBDFF (light purple — text accent)
primary-container: #6B4FBB (purple — buttons, badges)
on-surface: #E6E0EA (primary text)
on-surface-variant: #CAC4D4 (secondary/muted text)
outline-variant: #494552 (subtle borders)

correct: #10B981 (green — correct answers, check button)
correct-hover: #059669
error: #FFBDAB / #EF4444 (red — incorrect, danger)
tertiary: #F8BC62 (amber — flag, warning)

domain-1: #6B4FBB (purple)
domain-2: #3B82F6 (blue)  
domain-3: #10B981 (green)
domain-4: #F59E0B (amber)
domain-5: #EF4444 (red)
```

## Typography
- Font: Inter (400, 500, 600, 700)
- display-lg: 48px/1.2, -0.02em, 700
- headline-lg: 32px/1.3, -0.01em, 600
- headline-md: 24px/1.4, 600
- body-lg: 18px/1.6, 400
- body-md: 16px/1.6, 400
- label-md: 14px/1.2, 500
- code-inline: 14px/1.4, monospace, 400

## Layout
- Focus container: max-width 800px, centered
- Card border-radius: 0.75rem (xl)
- Spacing: xs=4px, sm=8px, md=16px, lg=24px, xl=32px, 2xl=48px
- Card shadows: 0 8px 32px rgba(0,0,0,0.5)
- Top border accent on quiz card: border-t with primary-container/30

## Key Component Patterns

### TopAppBar
- Sticky, bg-background, border-b border-outline-variant
- Terminal icon (material-symbols) + "CCAR-F Practice Quiz" title
- Avatar on right

### Mode Select (Landing)
- Stats section at top (welcome + accuracy circle)
- Study Mode card: FULL WIDTH (col-span-2), larger
- Exam + Review: side by side (each col-span-1)
- Cards have ::before gradient line on hover
- Subtle bg glow (bg-primary/5 blur-3xl)

### Question Card
- Progress bar at top (thin, 4px)
- Domain badge: pill with icon + "D1: Agentic Architecture"
- Scenario box: bg-[#0D0D0D], rounded-lg, bordered
- Options: label wrapping radio + "Option A" label + text
- Selected option: border-primary-container, border-2px
- Bottom: Back + Flag buttons left, Check Answer (green) right

### Explanation (Post-Check)
- Correct option: green border + green check dot on left
- Wrong options: opacity-70
- Explanation card: card-level-2, green top border (4px)
- Lightbulb icon + "Explanation" header
- "Key Concept" section with bold header
- "Distractor Analysis" section with red header, bullet list
- "References" section with link icons, border-t separator
- "Next Question" button: primary-container bg, arrow icon

### Results Dashboard
- Two-column top: Score card (42/60, scaled) + Status card (PASS/FAIL + weakest domain)
- Domain bars section: card with "Performance by Domain" header + analytics icon
- 5 progress bars with domain colors
- Action buttons: Retry (outlined) + Review Wrong Answers (primary)

### Mobile Bottom Nav
- 4 items: Home, Study, History, Profile
- Active item: bg-primary-container pill
- Material icons
