// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

function githubPagesBase(): string {
  const full = process.env.GITHUB_REPOSITORY;
  if (!full) return "/";
  const repo = full.split("/")[1];
  if (!repo) return "/";
  // username.github.io repo is served at the domain root, not /repo/
  if (repo.endsWith(".github.io")) return "/";
  return `/${repo}/`;
}

const base =
  process.env.VITE_BASE_PATH ?? (process.env.GITHUB_PAGES === "true" ? githubPagesBase() : "/");

export default defineConfig({
  // Static hosting (GitHub Pages) — no Cloudflare Worker bundle.
  cloudflare: process.env.GITHUB_PAGES === "true" ? false : undefined,
  tanstackStart:
    process.env.GITHUB_PAGES === "true"
      ? {
          router: { basepath: base },
          spa: { enabled: true },
        }
      : undefined,
  vite: {
    base,
  },
});
