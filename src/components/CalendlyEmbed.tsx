import { useEffect, useState } from "react";
import { InlineWidget } from "react-calendly";

/**
 * Calendly inline widget. Replace `url` with your real Calendly link.
 * Defers mount until the section enters viewport (perf + LCP friendly).
 */
export function CalendlyEmbed({ url }: { url: string }) {
  const [show, setShow] = useState(false);

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
