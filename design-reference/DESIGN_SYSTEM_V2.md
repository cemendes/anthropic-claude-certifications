# Stitch Design System V2 — Slate Theme

## Color Tokens (Updated from V1 Purple → Slate/Steel Blue)
```
background: #131315
surface: #131315
surface-container-lowest: #0D0E10
surface-container-low: #1B1C1D
surface-container: #1F2021
surface-container-high: #292A2B
surface-container-highest: #343536
surface-variant: #343536

primary: #B5C8DF (light steel blue)
primary-container: #2C3E50 (dark slate blue)
on-primary: #203243
on-primary-container: #96A9BE

secondary: #B3C9E2
secondary-container: #34495E
on-secondary-container: #A2B7D0

tertiary: #E3C19B (warm amber/gold)
tertiary-container: #4E381C
on-tertiary-container: #C1A17D

on-surface: #E4E2E3
on-surface-variant: #C4C6CD
on-background: #E4E2E3

outline: #8E9197
outline-variant: #43474C

error: #FFB4AB
error-container: #93000A
on-error-container: #FFDAD6

correct: #10B981 (keep same green)
correct-hover: #059669

domain-1: #2C3E50 (primary-container — slate)
domain-2: #4A6B8C (muted blue)
domain-3: #437563 (muted green)
domain-4: #8C704A (muted amber)
domain-5: use error token
```

## Typography (font sizes changed!)
- Font: Inter (400, 500, 600, 700)
- headline-xl: 32px/1.2, -0.02em, 600
- headline-lg: 24px/1.3, -0.01em, 600
- headline-md: 20px/1.4, 500
- body-lg: 16px/1.6, 400
- body-md: 14px/1.5, 400
- label-md: 12px/1.0, 0.01em, 500
- mono-md: 14px/1.5, monospace, 400

## Spacing (values changed!)
- xs: 4px
- base: 8px
- sm: 12px
- md: 24px
- gutter: 24px
- margin: 32px
- lg: 40px
- xl: 64px

## Layout
- Focus container: max-width 800px, centered
- Card border-radius: xl (0.75rem)
- Card shadows: 0 8px 32px rgba(0,0,0,0.5)

## Key Changes from V1 (Purple) to V2 (Slate)
1. Primary shifted from purple #CEBDFF/#6B4FBB to steel blue #B5C8DF/#2C3E50
2. Background darkened slightly from #0D0D0D to #131315
3. Surface hierarchy uses more nuanced grays
4. Spacing increased: md=24px (was 16px), lg=40px (was 24px)
5. Font sizes slightly smaller: body-md=14px (was 16px)
6. Domain bar colors muted: slate, blue, green, amber tones instead of bright saturated
7. Outline-variant shifted from #494552 to #43474C
8. Tertiary shifted from #F8BC62 to #E3C19B (less saturated amber)
