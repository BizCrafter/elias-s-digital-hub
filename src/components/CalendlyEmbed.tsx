import { useEffect, useState } from "react";
import { InlineWidget } from "react-calendly";

/**
 * Calendly inline widget. Replace `url` with your real Calendly link.
 * Defers mount until the section enters viewport (perf + LCP friendly).
 */
export function CalendlyEmbed({
  url,
  onInWidgetChange,
}: {
  url: string;
  /** Fires when the pointer enters or leaves the embed card (incl. iframe). Cross-origin iframes do not get parent pointermove, so the parent page uses this for cursor routing. */
  onInWidgetChange?: (pointerInside: boolean) => void;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    return () => {
      onInWidgetChange?.(false);
    };
  }, [onInWidgetChange]);

  useEffect(() => {
    const el = document.getElementById("calendly-anchor");
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      id="calendly-anchor"
      className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
      onPointerEnter={() => onInWidgetChange?.(true)}
      onPointerLeave={() => onInWidgetChange?.(false)}
    >
      {show ? (
        <InlineWidget
          url={url}
          styles={{ height: "720px" }}
          pageSettings={{
            backgroundColor: "ffffff",
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
            primaryColor: "111111",
            textColor: "111111",
          }}
        />
      ) : (
        <div className="flex h-[720px] items-center justify-center text-sm text-muted-foreground">
          Loading calendar…
        </div>
      )}
    </div>
  );
}
