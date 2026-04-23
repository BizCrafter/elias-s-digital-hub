import { useEffect, useRef } from "react";

/**
 * Animated orbital visualization — three rings (AI, Private Equity, Venture)
 * intersecting at a luminous core. Pure SVG + requestAnimationFrame, no deps.
 */
export function OrbitVisual() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let raf = 0;
    let t = 0;
    const animate = () => {
      t += 0.0035;
      const svg = ref.current;
      if (svg) {
        const r1 = svg.querySelector<SVGGElement>("[data-ring='1']");
        const r2 = svg.querySelector<SVGGElement>("[data-ring='2']");
        const r3 = svg.querySelector<SVGGElement>("[data-ring='3']");
        if (r1) r1.setAttribute("transform", `rotate(${(t * 40).toFixed(2)} 200 200)`);
        if (r2) r2.setAttribute("transform", `rotate(${(-t * 28).toFixed(2)} 200 200)`);
        if (r3) r3.setAttribute("transform", `rotate(${(t * 18).toFixed(2)} 200 200)`);
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 400"
      className="h-full w-full"
      aria-hidden="true"
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

      {/* ring 1 — large tilted ellipse */}
      <g data-ring="1" className="text-foreground">
        <ellipse
          cx="200"
          cy="200"
          rx="170"
          ry="60"
          fill="none"
          stroke="url(#ringStroke)"
          strokeWidth="1"
        />
        <circle cx="370" cy="200" r="3.5" fill="currentColor" />
      </g>

      {/* ring 2 — medium */}
      <g data-ring="2" className="text-foreground">
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
        <circle cx="335" cy="200" r="2.5" fill="currentColor" />
      </g>

      {/* ring 3 — small tilted */}
      <g data-ring="3" className="text-foreground">
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
        <circle cx="295" cy="200" r="2.5" fill="currentColor" />
      </g>

      {/* center dot */}
      <circle cx="200" cy="200" r="5" fill="currentColor" className="text-foreground" />
    </svg>
  );
}
