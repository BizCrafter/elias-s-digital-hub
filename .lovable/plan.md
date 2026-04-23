

## Replace decorative orbit with a purposeful live visual

You like the rotating-rings aesthetic but want it to actually mean something. Here are three options that preserve the visual language (concentric rings, rotating markers, glowing core) while encoding real, live data.

### Option A — "Time since ChatGPT" orbital clock (recommended)

A live counter visualized as orbits. ChatGPT launched **30 November 2022**. Each ring represents a unit of elapsed time, and a marker on each ring rotates to show current progress within that unit.

```text
    outer ring  →  YEARS since launch (marker = progress through current year)
    middle ring →  DAYS    (marker = progress through current day, i.e. clock)
    inner ring  →  HOURS   (marker = progress through current hour)
    glowing core →  total days elapsed, shown as a number
```

Why it fits your positioning: AI + research + "the shift is happening now." The visual literally measures the age of the modern AI era while you talk about researching it. It's quietly meaningful, not gimmicky.

### Option B — Vienna local time as an orbital clock

Three rings = hours / minutes / seconds, each with a marker rotating at the correct real-world speed. Center shows `HH:MM` in Vienna. Pure, calm, "I'm based in Vienna" signal.

### Option C — Current moon phase

Outer ring = lunar cycle progress, inner disc = accurate moon illumination (computed from date). Beautiful but thematically unrelated to AI/PE.

### Recommendation

**Option A.** It's on-theme (AI), always changing, and rewards a second look (visitor realizes the numbers are real). B is a clean fallback if you'd prefer something more neutral.

---

### What will change (Option A)

1. **`src/components/OrbitVisual.tsx`** — replace internals:
   - Compute `launch = 2022-11-30T00:00:00Z` and `now` (updated every second via `setInterval`).
   - Derive: `yearsElapsed`, `progressThroughYear`, `progressThroughDay`, `progressThroughHour`, `totalDays`.
   - Keep the three SVG rings and gradient core exactly as they look today.
   - Replace the constant rotation animation with marker positions driven by the four progress values (each marker sits at angle `progress * 360°` on its ring). The outer ring's marker creeps (years), middle ticks once a day, inner sweeps once an hour — so motion is still visible but meaningful.
   - Add a subtle center label inside the core: small uppercase caption `DAYS SINCE CHATGPT` and a large number (`totalDays.toLocaleString()`). Styled with existing `font-display` and `text-foreground` / `text-muted-foreground` tokens — no new colors.
   - Add `aria-label` describing the figure for screen readers (replacing `aria-hidden`).

2. **No other files change.** Hero layout, sizing, and the surrounding glow stay identical, so the visual still anchors the right column the same way.

### Technical notes

- Pure client-side computation, no deps, no network. Safe for SSR (initial render uses a deterministic snapshot, then `useEffect` starts the interval).
- Interval at 1000 ms is enough — sub-second precision adds nothing visually.
- Markers are positioned with `transform: rotate(angle) translate(rx,0)` around the ring center, matching the existing ellipse radii (`rx=170/60`, `135`, `95/38` with -25° tilt). Tilted-ellipse markers use the same rotation group trick already in the file.
- All colors use existing tokens (`text-foreground`, `text-muted-foreground`, `bg-accent`, the `core` and `ringStroke` gradients) — no design-token changes.

