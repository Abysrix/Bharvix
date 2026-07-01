# BHARVIX — SYSTEM ARCHITECTURE
### The engineering blueprint. Written to scale from one landing page to a full product company.

> Companion to [DESIGN_BIBLE.md](DESIGN_BIBLE.md) (*why it looks this way*) and [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) (*exact tokens*). This document owns *how the code is organized and why it will still make sense at 50× the size.*

---

## 0. GUIDING PRINCIPLES (the CTO's non-negotiables)

1. **Feature-first, not file-type-first.** Shared primitives live in `components/ui`; everything domain-specific lives in a self-contained `features/*` module. You should be able to delete a feature by deleting one folder.
2. **One source of truth per concern.** Tokens → `lib/tokens.ts`. Site data → `config/`. Scroll → Lenis. Every value has exactly one home.
3. **Clear ownership of the animation stack.** Four systems touch the DOM and rAF (Lenis, GSAP, Framer, R3F). Overlap is the #1 way this codebase rots. §5 draws hard boundaries.
4. **Server-first rendering, client islands for interactivity.** Default to React Server Components; drop to `"use client"` only where motion/state demand it. This protects LCP and SEO as we add blog/docs.
5. **Performance is a budget, not a vibe.** §10 sets hard numbers enforced in CI.
6. **Everything degrades.** No JS, reduced motion, slow network, tiny screen, screen reader — the site remains usable and on-brand in every one.

---

## 1. ROUTE ARCHITECTURE — the growth map

Next.js **App Router with route groups**. Each group has its own layout (chrome), so the marketing site, the docs, the dashboard, and IR never leak layout into one another.

```
app/
├── layout.tsx                 # ROOT: fonts, <AppProviders>, global metadata, JSON-LD
├── globals.css
├── (marketing)/               # public site — marketing chrome (floating nav + kinetic footer)
│   ├── layout.tsx
│   ├── page.tsx               # ← Landing  [SHIPPED]
│   ├── products/
│   │   ├── page.tsx           # product index
│   │   └── [slug]/page.tsx    # Unipost, Zuppy, Jarvis (data from config/site.ts)
│   ├── about/page.tsx
│   ├── careers/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx    # role detail
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx    # MDX articles
│   └── contact/page.tsx
├── (docs)/                    # documentation — sidebar chrome, no cursor-heavy motion
│   └── docs/[[...slug]]/page.tsx
├── (investors)/               # investor relations — minimal, possibly gated
│   └── investors/page.tsx
├── (app)/                     # authenticated product dashboard — app shell, NO marketing chrome
│   ├── layout.tsx
│   └── dashboard/…
├── api/                       # route handlers (contact form, newsletter, revalidation, auth)
├── sitemap.ts                 # generated from config/site.ts + content
├── robots.ts
└── opengraph-image.tsx        # dynamic OG generation
```

**Why route groups:** the dashboard must not inherit the marketing nav/footer/smooth-scroll; docs need a sidebar; IR may be gated. Groups give each surface an isolated `layout.tsx` while sharing the root providers. Adding "Careers" is: create a folder — nothing else changes.

**Current reality:** the landing sections exist under `components/sections/` and are composed by `app/page.tsx`. Migration path in §12.

---

## 2. FOLDER STRUCTURE (full tree)

```
bharvix/
├── app/                       # routing only (see §1) — thin; logic lives in features/
├── components/                # SHARED, cross-feature building blocks
│   ├── ui/                    # design-system primitives (Button, GlassCard, Badge, Tag…)
│   ├── layout/                # Navigation, Footer, shells, SmoothScroll
│   ├── motion/                # reusable animated wrappers (Reveal, SplitText, Parallax, Marquee)
│   ├── three/                 # reusable R3F building blocks + <Scene> registry
│   └── cursor/                # CustomCursor
├── features/                  # DOMAIN modules — self-contained, deletable
│   ├── landing/               #   sections/  hooks/  data.ts   (Hero, About, StudioModel…)
│   ├── products/              #   sections/  data pulled from config
│   ├── blog/                  #   mdx/  components/  lib/
│   ├── careers/
│   ├── dashboard/             #   widgets/  hooks/  api/  store/
│   ├── docs/
│   └── investors/
├── hooks/                     # SHARED hooks (useLenis, useMagnetic, useMediaQuery…)
├── lib/                       # framework-agnostic logic (tokens, motion, seo, gsap, utils)
├── providers/                 # React context providers (AppProviders + future: theme, auth, analytics)
├── config/                    # static config (site.ts, nav, products, breakpoints, env)
├── content/                   # MDX/markdown (blog posts, docs, changelog) — the CMS-lite layer
├── public/                    # static assets (see §8)
│   ├── fonts/  images/  media/  icons/  og/
├── types/                     # shared TS types & module declarations
├── styles/                    # (optional) additional css layers beyond globals
├── DESIGN_BIBLE.md  DESIGN_SYSTEM.md  ARCHITECTURE.md
├── tailwind.config.ts  next.config.ts  tsconfig.json
```

**The rule that keeps it clean:**
`components/` = used by ≥2 features. The moment something is used by two features, it graduates from `features/x/` up to `components/`. Nothing in `components/` may import from `features/`.

---

## 3. COMPONENTS — the taxonomy

| Layer | Location | Knows about | Example |
|---|---|---|---|
| **Primitives** | `components/ui` | tokens only | `Button`, `GlassCard`, `Badge`, `Tag`, `Section` |
| **Motion wrappers** | `components/motion` | motion presets | `Reveal`, `SplitText`, `Parallax`, `Marquee` |
| **3D building blocks** | `components/three` | R3F + tokens | `<ParticleField>`, `<AmbientGlow>`, `<Scene>` |
| **Layout / chrome** | `components/layout` | nav data, route | `Navigation`, `Footer`, `PageShell` |
| **Sections** | `features/*/sections` | a feature's data | `Hero`, `Products`, `Founders` |
| **Pages** | `app/**/page.tsx` | compose sections | landing, product detail |

**Dependency direction (never violated):**
`app → features → components/{ui,motion,three,layout} → hooks/lib/config → tokens`
Arrows point one way. A primitive never imports a section; `lib` never imports React components.

---

## 4. ANIMATIONS — organization & the four-system boundary

The single most important architectural decision. Four systems can each move things; **each owns a disjoint job.**

| System | Owns | Never does | Entry point |
|---|---|---|---|
| **Lenis** | Smooth scroll position | Any visual animation | `hooks/useLenis.ts` |
| **GSAP + ScrollTrigger** | Scroll-*scrubbed* timelines, **pinning**, scroll-linked parallax | Component enter/exit, gestures | `lib/gsap.ts` |
| **Framer Motion** | Component enter/exit, layout animation, **gestures** (hover/tap/drag), `AnimatePresence`, stagger orchestration | Scroll-scrubbing, pinning | `lib/motion.ts` + `components/motion` |
| **R3F / Three** | Everything inside a `<Canvas>` | Anything in the DOM | `components/three` |
| **CSS** | Trivial loops (marquee, float, shimmer, pulse) | Anything needing JS state | `globals.css` keyframes |

**The master-clock rule:** there is ONE scroll owner (Lenis) and Lenis drives the GSAP ticker (`gsap.ticker.add(t => lenis.raf(t*1000))`). ScrollTrigger reads scroll from that synced ticker. R3F runs its own render loop inside its canvas (isolated). Framer uses its own rAF for spring physics (isolated, cheap). **Never** add a second `requestAnimationFrame` scroll loop.

**Decision flow for "how do I animate X?"**
- Inside WebGL? → R3F.
- Tied to scroll progress / needs pinning? → GSAP ScrollTrigger.
- Triggered by mount, hover, tap, presence, or layout change? → Framer (`<Reveal>` / a preset).
- A dumb infinite loop with no state? → CSS keyframe.

This table is the firewall against three libraries animating the same property and fighting.

---

## 5. THREE.JS ORGANIZATION

```
components/three/
├── Canvas/
│   └── SceneCanvas.tsx        # wrapped <Canvas>: dpr caps, perf defaults, lazy mount, reduced-motion off-switch
├── objects/
│   ├── ParticleField.tsx      # the hero particle system (shader-based)
│   ├── AmbientGlow.tsx
│   └── …                      # reusable meshes/instances
├── materials/                 # shared ShaderMaterials (vertex/fragment as .ts template strings or .glsl)
├── hooks/
│   ├── useMouseUniform.ts     # feed cursor into shader uniforms
│   └── useReducedFrameloop.ts # pause/limit frameloop when reduced-motion or offscreen
└── registry.ts               # maps scene name → dynamic import (code-split per scene)
```

**Rules:**
- **Every scene is `dynamic(() => …, { ssr: false })`** and mounted only when in/near viewport. WebGL never blocks first paint (Bible §IX).
- **DPR capped** (`dpr={[1, 1.5]}`), `antialias: false` on particle passes, `powerPreference: "high-performance"`, additive blending for glows.
- **Reduced motion / offscreen / low-power → frameloop pauses** (`frameloop="demand"` or throttled). A static gradient fallback replaces the canvas.
- Shaders live in `materials/`, not inline in components, once reused.
- One `<Canvas>` per visual zone; do not try to share a global canvas across unrelated sections (isolation > cleverness).

---

## 6. GSAP ORGANIZATION

```
lib/gsap.ts                    # registerGsap() (idempotent), defaults, reduced-motion, exports { gsap, ScrollTrigger }
features/*/hooks/useXTimeline.ts  # feature-scoped timelines (e.g. Unipost pinned reveal)
```

**Rules:**
- Import `{ gsap, ScrollTrigger }` **only** from `lib/gsap.ts`. Never `from "gsap"` in a component.
- Registration is idempotent and happens once in `AppProviders`.
- Each timeline is created in a `useLayoutEffect` inside a `gsap.context(() => {…}, scopeRef)` and **reverted on cleanup** — this auto-kills that scope's ScrollTriggers, preventing leaks across route changes.
- `ScrollTrigger.refresh()` after route transitions and image/font loads.
- Reduced motion collapses timelines to instant (handled centrally in `registerGsap`).

---

## 7. FRAMER MOTION ORGANIZATION

```
lib/motion.ts                  # variants + eases + durations + reveal() helper (the source of truth)
components/motion/Reveal.tsx    # the everyday scroll-reveal wrapper
components/motion/SplitText.tsx # (planned) word/char stagger via SplitType
components/motion/Parallax.tsx  # (planned) transform-on-scroll wrapper
components/motion/PageTransition.tsx # (planned) AnimatePresence route curtain
```

**Rules:**
- **No inline `variants={{…}}` in feature components.** Import a preset (`fadeUp`, `curtainLine`) or wrap in `<Reveal>`. This is the "reusable animations, no duplication" mandate made structural.
- `viewport={{ once: true }}` is the default — reveal once.
- All eases/durations come from tokens; never a raw cubic-bezier in a component.
- Route transitions use a single `<PageTransition>` in each group layout, not per-page.

---

## 8. HOOKS — the shared catalog

| Hook | Purpose |
|---|---|
| `useLenis` | Boot Lenis, expose `getLenis()` for programmatic scroll |
| `useMounted` | Client-only guard (cursor, WebGL, portals) |
| `useMediaQuery` / `useBreakpoint` / `useIsMobile` | SSR-safe responsive checks (tokens-driven) |
| `usePrefersReducedMotion` | The accessibility off-switch every animation consults |
| `useMagnetic` | Cursor-attraction for buttons/nav (MotionValues) |
| `useTilt` | 3D tilt + glow for cards |
| `useScrollProgress` | Smoothed page/element scroll progress (progress bars, parallax) |

Feature-specific hooks (e.g. `useUnipostPin`) live in `features/<x>/hooks/`, not here. A hook graduates to `/hooks` when a second feature needs it.

---

## 9. UTILITIES, CONTEXTS, PROVIDERS

**`lib/` (framework-agnostic logic):**
`utils.ts` (cn, lerp, clamp, mapRange, easing) · `tokens.ts` · `motion.ts` · `gsap.ts` · `seo.ts` (metadata factory + JSON-LD) · future: `fetcher.ts`, `mdx.ts`, `analytics.ts`, `format.ts`.

**`config/`:** `site.ts` (name, nav, socials, products, breakpoints) · future: `env.ts` (validated env vars via zod), `flags.ts` (feature flags).

**`providers/`:** `AppProviders.tsx` composes the global client boundary (Lenis + GSAP registration + CustomCursor). Future providers slot in here in order: `ThemeProvider` → `AuthProvider` (dashboard) → `AnalyticsProvider` → `QueryProvider` (React Query for dashboard data). Pages never manage provider order.

**Contexts:** we deliberately avoid context for things a hook + media query already solve (reduced motion, breakpoints). Context is reserved for genuinely shared *state*: auth session, theme, feature flags, cursor-label bus. Each lives beside its provider.

---

## 10. PERFORMANCE STRATEGY (hard budgets, CI-enforced)

**Budgets (pass/fail):** Lighthouse ≥ 95 · **LCP < 2.5s** · CLS < 0.05 · TBT < 200ms · 60fps scroll · initial JS (marketing route) < ~180KB gzip.

**Tactics:**
- **RSC by default.** Sections that are static (copy, layout) render on the server; only interactive islands ship JS.
- **Hero text is server-rendered and paints first.** WebGL is `dynamic({ ssr:false })` and mounts after — never the LCP element.
- **Code-split aggressively:** every Three scene, the preloader, heavy sections, and route transitions are dynamic imports. Route groups give natural split points.
- **Fonts:** `next/font` self-hosts + preloads Syne/Jakarta/Space Mono, `display: swap`, subset to latin. No layout shift.
- **Images:** `next/image` only, AVIF/WebP, explicit dimensions, `priority` on hero, lazy elsewhere. Product mockups as optimized assets or pure CSS/SVG (as Unipost's dashboard is).
- **Third-party:** none in the critical path. Analytics deferred/`afterInteractive`.
- **WebGL budget:** capped particle counts, DPR ≤ 1.5, paused offscreen/reduced-motion.
- **Caching:** static generation + ISR for blog/docs/products; `revalidate` tags on content.
- Measure in CI with Lighthouse-CI on every PR; regressions block merge.

---

## 11. RESPONSIVE STRATEGY

- **Mobile-first, 320px → 4K.** Base styles target small screens; enhancements layer up at `sm/md/lg/xl/2xl` (tokens in `config/site.ts`, mirrored in Tailwind).
- **Fluid by default.** Type uses `clamp()` (the `display-*` scale); spacing uses `clamp()` for section rhythm and gutters. Fewer breakpoints, less brittleness.
- **JS reads the same breakpoints** via `useBreakpoint` — CSS and JS never disagree.
- **Motion scales down on mobile:** parallax depth reduced, particle counts lowered (or the canvas swapped for a static gradient), magnetic/tilt disabled on touch (no hover).
- **Touch targets ≥ 44px.** The custom cursor is disabled on touch devices (falls back to native).
- **Layouts reflow, never shrink-to-fit:** two-column editorial layouts stack to single-column with preserved hierarchy; the kinetic footer clamps its type so BHARVIX never overflows.
- Container queries for feature widgets (dashboard cards) where component-level responsiveness beats viewport breakpoints.

---

## 12. ACCESSIBILITY STRATEGY

- **`prefers-reduced-motion` is honored everywhere**, centrally: `usePrefersReducedMotion` (Framer), `registerGsap` (GSAP), frameloop pause (R3F). Reduced = near-instant reveals, no parallax, no autoplaying particles — still beautiful.
- **Semantic HTML + landmarks:** one `<h1>` per page, correct heading order, `<nav> <main> <footer>`, `<section aria-labelledby>`.
- **Keyboard:** every interactive element focusable and operable; visible focus rings (not `outline:none` without replacement); logical tab order; skip-to-content link; focus trap in any modal.
- **The custom cursor is cosmetic only** — real focus states exist underneath; keyboard users get full visible focus treatment.
- **ARIA where semantics fall short:** `aria-label` on icon buttons, `aria-hidden` on decorative WebGL/noise, `aria-live` for async status.
- **Contrast:** muted text still clears WCAG AA against its actual background (the opacity ladder was tuned for this; verify per surface).
- **Screen readers:** decorative motion/canvas hidden; content order in DOM matches visual order; images have alt text; marquee/kinetic text has a static accessible label.
- **Testing gate:** axe + Lighthouse a11y ≥ 95 in CI; manual keyboard + VoiceOver/NVDA pass before ship.

---

## 13. SEO & METADATA

- **`createMetadata()`** (`lib/seo.ts`) is the only way pages define metadata — consistent titles, canonicals, OG, Twitter cards. Root sets defaults; pages override.
- **Structured data (JSON-LD):** `organizationSchema`, `websiteSchema`, `productSchema`, `breadcrumbSchema` — injected in the relevant layouts/pages.
- **`app/sitemap.ts` + `robots.ts`** generated from `config/site.ts` and content; regenerated on content change.
- **Dynamic OG images** via `opengraph-image.tsx` (per product/post) using the brand system.
- **RSC = crawlable HTML.** Because marketing/blog/docs render on the server, content is in the initial HTML — critical for SEO as we add the blog.
- **Semantic URLs:** `/products/unipost`, `/blog/<slug>`, `/careers/<role>` — driven by `config` and `content/`.

---

## 14. STATE & DATA (as it grows to a dashboard)

- **Marketing/blog/docs:** no client state store. Server Components + static data from `config/` and `content/` (MDX). Forms post to `app/api/*` route handlers.
- **Dashboard `(app)/`:** introduce **React Query** (server cache/mutations) + **Zustand** (ephemeral UI state) — both mounted via providers in the `(app)` layout only, so marketing bundles stay lean.
- **Auth:** session provider in `(app)` and `(investors)` layouts; marketing stays public and static.
- **Content pipeline:** MDX in `content/` compiled at build (`lib/mdx.ts`); can swap to a headless CMS later without touching components (data stays behind a typed loader).

---

## 15. THE GROWTH ROADMAP → architecture mapping

| Stage | What ships | Architectural moves (all additive) |
|---|---|---|
| **Landing** ✅ | Home | `features/landing`, `components/*`, providers, tokens — done |
| **Product Pages** | `/products`, `/products/[slug]` | `features/products`, data already in `config/site.ts`, `productSchema`, dynamic OG |
| **Dashboard** | `(app)/dashboard` | new route group + app-shell layout, `QueryProvider`+`AuthProvider`, `features/dashboard` (widgets/store/api) |
| **Blog** | `/blog`, `/blog/[slug]` | `content/blog/*.mdx`, `features/blog`, `lib/mdx.ts`, ISR, RSS |
| **Careers** | `/careers`, `/careers/[slug]` | `features/careers`, roles in `config` or CMS, application form → `api/` |
| **Documentation** | `(docs)/docs` | `(docs)` group + sidebar layout, `content/docs/*.mdx`, versioning-ready routing |
| **Investor Relations** | `(investors)` | gated group, minimal chrome, `AuthProvider`, secure downloads |

**Every stage is a new folder, not a refactor.** That is the whole point of the route-group + feature-module design: the landing page's architecture already anticipates the company Bharvix intends to become.

---

### THE ARCHITECTURE TEST
Before adding anything, ask: **"When we have 7 route groups and 40 features, will this decision still make sense — or will it be the thing someone has to untangle?"** If the latter, it belongs in a feature module, behind a token, or under one of the ownership boundaries above.
