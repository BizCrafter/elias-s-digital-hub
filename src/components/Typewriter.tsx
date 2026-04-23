import { useEffect, useState } from "react";

interface TypewriterProps {
  segments: { text: string; className?: string }[];
  speed?: number;
  startDelay?: number;
  onDone?: () => void;
}

/**
 * Sequentially "types" out a series of styled segments, with a blinking caret.
 */
export function Typewriter({
  segments,
  speed = 28,
  startDelay = 250,
  onDone,
}: TypewriterProps) {
  const full = segments.map((s) => s.text).join("");
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setStarted(true), startDelay);
    return () => window.clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    if (count >= full.length) {
      onDone?.();
      return;
    }
    const next = full.charAt(count);
    // Slight pause on punctuation for a more natural rhythm
    const delay = next === "." || next === "!" || next === "?" ? speed * 8 : next === "," ? speed * 4 : speed;
    const t = window.setTimeout(() => setCount((c) => c + 1), delay);
    return () => window.clearTimeout(t);
  }, [started, count, full, speed, onDone]);

  // Render only the typed-so-far portion across segments while preserving styling
  let remaining = count;
  const done = count >= full.length;

  return (
    <>
      {segments.map((seg, idx) => {
        if (remaining <= 0) return null;
        const slice = seg.text.slice(0, remaining);
        remaining -= seg.text.length;
        return (
          <span key={idx} className={seg.className}>
            {slice}
          </span>
        );
      })}
      <span
        aria-hidden="true"
        className={`ml-1 inline-block h-[0.85em] w-[2px] translate-y-[0.1em] bg-current align-baseline ${
          done ? "animate-pulse" : ""
        }`}
        style={{
          animation: done ? "blink 1.1s steps(1) infinite" : undefined,
        }}
      />
      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </>
  );
}
