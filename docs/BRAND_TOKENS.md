# Bitmern Solo — Brand Tokens

Extracted from `app/globals.css` and `app/layout.tsx` (Tailwind v4 `@theme inline`; no separate `tailwind.config`).

Source of truth for CSS variables remains `app/globals.css`. Hex values below are approximate sRGB conversions of the OKLCH tokens for design handoff.

## Logos

| Asset | Path | Notes |
| --- | --- | --- |
| Logo (light / on dark UI) | `/logo-light.svg` | Used in navbar, footer, hero (`public/logo-light.svg`) |
| Logo (dark / on light UI) | `/logo-dark.svg` | `public/logo-dark.svg` |

## Fonts

Loaded via `next/font/google` in `app/layout.tsx`:

| Role | Family | CSS variable | Tailwind token |
| --- | --- | --- | --- |
| Body / UI | Manrope | `--font-manrope` | `--font-sans` |
| Headings | Space Grotesk | `--font-space-grotesk` | `--font-heading` |
| Mono | JetBrains Mono | `--font-jetbrains-mono` | `--font-mono` |

Fallbacks: `ui-sans-serif, system-ui, sans-serif` (body/headings); `ui-monospace, monospace` (code).

## Radius

| Token | Value |
| --- | --- |
| `--radius` | `0.5rem` |
| `--radius-sm` | `calc(var(--radius) - 4px)` |
| `--radius-md` | `calc(var(--radius) - 2px)` |
| `--radius-lg` | `var(--radius)` |
| `--radius-xl` | `calc(var(--radius) + 4px)` |

## Color tokens (`:root`)

Site ships dark-first (`class="dark"` on `<html>`).

| CSS variable | OKLCH (source) | Approx hex | Tailwind mapping |
| --- | --- | --- | --- |
| `--background` | `oklch(0.145 0 0)` | `#0A0A0A` | `--color-background` |
| `--foreground` | `oklch(0.925 0 0)` | `#E6E6E6` | `--color-foreground` |
| `--card` | `oklch(0.17 0 0)` | `#0F0F0F` | `--color-card` |
| `--card-foreground` | `oklch(0.925 0 0)` | `#E6E6E6` | `--color-card-foreground` |
| `--popover` | `oklch(0.17 0 0)` | `#0F0F0F` | `--color-popover` |
| `--popover-foreground` | `oklch(0.925 0 0)` | `#E6E6E6` | `--color-popover-foreground` |
| `--primary` | `oklch(0.795 0.153 78)` | `#F1AE2E` | `--color-primary` |
| `--primary-foreground` | `oklch(0.145 0 0)` | `#0A0A0A` | `--color-primary-foreground` |
| `--secondary` | `oklch(0.22 0 0)` | `#1B1B1B` | `--color-secondary` |
| `--secondary-foreground` | `oklch(0.925 0 0)` | `#E6E6E6` | `--color-secondary-foreground` |
| `--muted` | `oklch(0.22 0 0)` | `#1B1B1B` | `--color-muted` |
| `--muted-foreground` | `oklch(0.6 0 0)` | `#808080` | `--color-muted-foreground` |
| `--accent` | `oklch(0.22 0 0)` | `#1B1B1B` | `--color-accent` |
| `--accent-foreground` | `oklch(0.925 0 0)` | `#E6E6E6` | `--color-accent-foreground` |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `#E7000B` | `--color-destructive` |
| `--destructive-foreground` | `oklch(0.925 0 0)` | `#E6E6E6` | `--color-destructive-foreground` |
| `--border` | `oklch(0.28 0 0)` | `#292929` | `--color-border` |
| `--input` | `oklch(0.28 0 0)` | `#292929` | `--color-input` |
| `--ring` | `oklch(0.795 0.153 78)` | `#F1AE2E` | `--color-ring` |

## Extended / utility OKLCH (used in CSS classes, not `:root` vars)

| Use | OKLCH | Approx hex |
| --- | --- | --- |
| Primary brand gold | `oklch(0.795 0.153 78)` | `#F1AE2E` |
| Shimmer highlight mid | `oklch(0.95 0.08 78)` | `#FFE9B2` |
| Section elevated bg (`.section-elevated`) | `oklch(0.155 0 0)` | `#0C0C0C` |
| Browser frame bar | `oklch(0.12 0 0)` | `#060606` |
| Dot-grid dots | `oklch(0.4 0 0)` | `#484848` |
| Scrollbar thumb | `oklch(0.3 0 0)` | `#2E2E2E` |
| Blog body paragraph | `oklch(0.88 0 0)` | `#D6D6D6` |
| Gradient text start (white) | `oklch(0.95 0 0)` | `#EDEDED` |

## Signature effects

- **`.text-shimmer` / `.text-gradient`** — primary gold brand treatments
- **`.glow` / `.glow-lg`** — CTA gold glow (`oklch(0.795 0.153 78)` at 30–40% alpha)
- **`.dot-grid`** — subtle radial dot background
- **`.gradient-border`** — animated conic gold/border ring

## Coin icons

Under `public/coins/` — e.g. `/coins/btc.svg`, `/coins/ltc.svg`, `/coins/doge.svg`, …
