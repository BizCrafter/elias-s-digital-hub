import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Mail } from "lucide-react";
import { OrbitVisual } from "@/components/OrbitVisual";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { Typewriter } from "@/components/Typewriter";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z"/>
    </svg>
  );
}

// TODO: Replace with your real Calendly URL once created (e.g. https://calendly.com/eliasrapp/intro)
const CALENDLY_URL = "https://calendly.com/eliasrapp/30min";
const LINKEDIN_URL = "https://www.linkedin.com/in/eliasrapp/";
const EMAIL = "hello@eliasrapp.com";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elias Rapp — AI · Private Equity · Venture" },
      {
        name: "description",
        content:
          "Elias Rapp — building Alven. Researching AI in Private Equity. Operating at the intersection of AI, PE and Venture.",
      },
      { property: "og:title", content: "Elias Rapp — AI · Private Equity · Venture" },
      {
        property: "og:description",
        content: "Building Alven. Researching AI in Private Equity.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Hero />
      <Booking />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#top" className="group flex items-center gap-2 text-sm font-medium">
          <span className="inline-block h-2 w-2 rounded-full bg-foreground transition-transform group-hover:scale-150" />
          Elias Rapp
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground sm:flex">
          <a href="#focus" className="transition-colors hover:text-foreground">Focus</a>
          <a href="#about" className="transition-colors hover:text-foreground">About</a>
          <a href="#alven" className="transition-colors hover:text-foreground">Alven</a>
          <a
            href="#book"
            className="rounded-full bg-foreground px-4 py-1.5 text-primary-foreground transition-opacity hover:opacity-90"
          >
            Book a call
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative bg-hero">
      <div className="grain absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pb-24 pt-36 md:grid-cols-[1.2fr_1fr] md:pt-44 md:pb-32">
        <div className="flex flex-col justify-center">

          <h1
            className="mt-6 whitespace-pre-line font-display text-5xl leading-[1.25] tracking-tight md:text-7xl md:leading-[1.2] min-h-[6em] md:min-h-[5em]"
          >
            <Typewriter
              startDelay={400}
              speed={32}
              segments={[
                { text: "Hi! I'm ", className: "text-foreground" },
                { text: "Elias Rapp", className: "text-gradient" },
                { text: ".\n", className: "text-foreground" },
                {
                  text: "Researching at the intersection of ",
                  className: "italic text-muted-foreground",
                },
                { text: "AI", className: "font-display not-italic text-foreground" },
                { text: " and ", className: "italic text-muted-foreground" },
                {
                  text: "private equity",
                  className: "font-display not-italic text-foreground",
                },
                { text: ".", className: "text-foreground" },
              ]}
            />
          </h1>


          <div
            className="mt-10 flex flex-wrap items-center gap-3 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <a
              href="#book"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-primary-foreground transition-all hover:gap-3 hover:shadow-glow"
            >
              Book an intro call
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-5 py-3 text-sm font-medium backdrop-blur transition-colors hover:bg-secondary"
            >
              <LinkedinIcon className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </div>

        <div
          className="relative aspect-square w-full max-w-[480px] justify-self-center animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="absolute inset-0 animate-float">
            <OrbitVisual />
          </div>
        </div>
      </div>

    </section>
  );
}

function Booking() {
  return (
    <section id="book" className="relative border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Let&apos;s talk
            </span>
            <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
              Book a 30-minute intro.
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Founders, investors, operators — happy to swap notes on AI, PE and venture.
            </p>
          </div>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-background px-5 py-3 text-sm font-medium transition-colors hover:bg-card md:self-auto"
          >
            <Mail className="h-4 w-4" />
            Or email me
          </a>
        </div>
        <CalendlyEmbed url={CALENDLY_URL} />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center">
        <div>© {new Date().getFullYear()} Elias Rapp</div>
        <div className="flex items-center gap-6">
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="hover:text-foreground">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
