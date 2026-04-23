import { useEffect, useState } from "react";

/**
 * "Time since ChatGPT" orbital clock.
 *
 * Three rings encode real, live data measured from the launch of ChatGPT
 * (30 November 2022, UTC):
 *   - outer ring marker → progress through the current year since launch
 *   - middle ring marker → progress through the current day (clock)
 *   - inner ring marker → progress through the current hour
 * The glowing core shows the total number of days elapsed.
 */

const LAUNCH = new Date(Date.UTC(2022, 10, 30, 0, 0, 0)); // 2022-11-30T00:00:00Z
const MS_PER_DAY = 1000 * 60 * 60 * 24;

type Snapshot = {
  totalDays: number;
  progressYear: number;
  progressDay: number;
  progressHour: number;
  progressMinute: number;
};

function computeSnapshot(now: Date): Snapshot {
  const elapsedMs = Math.max(0, now.getTime() - LAUNCH.getTime());
  const totalDays = Math.floor(elapsedMs / MS_PER_DAY);

  // Progress through current year-since-launch (anniversary based)
  const launchYear = LAUNCH.getUTCFullYear();
  const launchMonth = LAUNCH.getUTCMonth();
  const launchDay = LAUNCH.getUTCDate();
  let anniversaryYear = now.getUTCFullYear();
  let lastAnniv = Date.UTC(anniversaryYear, launchMonth, launchDay);
  if (lastAnniv > now.getTime()) {
    anniversaryYear -= 1;
    lastAnniv = Date.UTC(anniversaryYear, launchMonth, launchDay);
  }
  const nextAnniv = Date.UTC(anniversaryYear + 1, launchMonth, launchDay);
  const progressYear = (now.getTime() - lastAnniv) / (nextAnniv - lastAnniv);

  // Progress through current day & hour (UTC, deterministic for SSR)
  const msIntoDay =
    now.getUTCHours() * 3600_000 +
    now.getUTCMinutes() * 60_000 +
    now.getUTCSeconds() * 1000 +
    now.getUTCMilliseconds();
  const progressDay = msIntoDay / MS_PER_DAY;

  const msIntoHour =
    now.getUTCMinutes() * 60_000 +
    now.getUTCSeconds() * 1000 +
    now.getUTCMilliseconds();
  const progressHour = msIntoHour / 3600_000;

  const msIntoMinute = now.getUTCSeconds() * 1000 + now.getUTCMilliseconds();
  const progressMinute = msIntoMinute / 60_000;

  // Suppress unused warning — kept for clarity that we read launchYear
  void launchYear;

  return { totalDays, progressYear, progressDay, progressHour, progressMinute };
}

/** Polar marker position on an ellipse, with optional tilt (deg). */
function markerPos(
  rx: number,
  ry: number,
  progress: number,
  tiltDeg = 0,
): { x: number; y: number } {
  const angle = progress * Math.PI * 2 - Math.PI / 2; // start at 12 o'clock
  const ex = rx * Math.cos(angle);
  const ey = ry * Math.sin(angle);
  const t = (tiltDeg * Math.PI) / 180;
  const x = ex * Math.cos(t) - ey * Math.sin(t);
  const y = ex * Math.sin(t) + ey * Math.cos(t);
  return { x: 200 + x, y: 200 + y };
}

export function OrbitVisual() {
  const [snap, setSnap] = useState<Snapshot>(() => computeSnapshot(LAUNCH));

  useEffect(() => {
    const tick = () => setSnap(computeSnapshot(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const outer = markerPos(170, 60, snap.progressYear); // years
  const middle = markerPos(135, 135, snap.progressDay); // days
  const inner = markerPos(95, 38, snap.progressHour, -25); // hours
  const minute = markerPos(70, 70, snap.progressMinute); // minutes

  const days = snap.totalDays.toLocaleString();

  return (
    <svg
      viewBox="0 0 400 400"
      className="h-full w-full"
      role="img"
      aria-label={`${days} days since the launch of ChatGPT`}
    >
      <defs>
        <radialGradient id="core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.95 0.05 90)" stopOpacity="1" />
          <stop offset="60%" stopColor="oklch(0.85 0.08 90)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="oklch(0.85 0.08 90)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ringStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.05" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* glow core */}
      <circle cx="200" cy="200" r="120" fill="url(#core)" />

      {/* ring 1 — years (large tilted ellipse) */}
      <g className="text-foreground">
        <ellipse
          cx="200"
          cy="200"
          rx="170"
          ry="60"
          fill="none"
          stroke="url(#ringStroke)"
          strokeWidth="1"
        />
        <circle cx={outer.x} cy={outer.y} r="3.5" fill="currentColor" />
      </g>

      {/* ring 2 — days (clock) */}
      <g className="text-foreground">
        <ellipse
          cx="200"
          cy="200"
          rx="135"
          ry="135"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.12"
          strokeWidth="1"
          strokeDasharray="2 6"
        />
        <circle cx={middle.x} cy={middle.y} r="2.5" fill="currentColor" />
      </g>

      {/* ring 3 — hours (small tilted) */}
      <g className="text-foreground">
        <ellipse
          cx="200"
          cy="200"
          rx="95"
          ry="38"
          fill="none"
          stroke="url(#ringStroke)"
          strokeWidth="1"
          transform="rotate(-25 200 200)"
        />
        <circle cx={inner.x} cy={inner.y} r="2.5" fill="currentColor" />
      </g>

      {/* ring 4 — minutes (innermost) */}
      <g className="text-foreground">
        <ellipse
          cx="200"
          cy="200"
          rx="70"
          ry="70"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeWidth="1"
          strokeDasharray="1 4"
        />
        <circle cx={minute.x} cy={minute.y} r="2" fill="currentColor" />
      </g>

      {/* center label */}
      <text
        x="200"
        y="188"
        textAnchor="middle"
        className="fill-muted-foreground"
        style={{
          fontSize: "8px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        Days since ChatGPT launched
      </text>
      <text
        x="200"
        y="220"
        textAnchor="middle"
        className="fill-foreground font-display"
        style={{ fontSize: "32px", letterSpacing: "-0.02em" }}
      >
        {days}
      </text>
    </svg>
  );
}
