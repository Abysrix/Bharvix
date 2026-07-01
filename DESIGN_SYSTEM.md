# BHARVIX DESIGN SYSTEM
### The token layer — the Design Bible made concrete.

> The [Design Bible](DESIGN_BIBLE.md) says *why*. This says *exactly which value*.
> Source of truth in code: **`lib/tokens.ts`** (JS) · **`tailwind.config.ts`** (utilities) · **`app/globals.css`** (base + utilities) · **`lib/motion.ts`** (animation presets).
> **Rule: never hard-code a hex, radius, duration, or ease in a component. Reference a token.**

---

## 1. FONTS

| Voice | Family | Weights | Token | Role |
|---|---|---|---|---|
| **Display** | Syne | 700, 800 | `font.display` / `font-display` | Headlines — the brand's shout |
| **Body** | Plus Jakarta Sans | 300–500 | `font.sans` / `font-sans` | Reading text & UI |
| **Mono** | Space Mono | 400, 700 | `font.mono` / `font-mono` | Labels, numbers, metadata — the engineering fingerprint |

Loaded via `next/font/google` in `app/layout.tsx` → CSS vars `--font-display`, `--font-sans`, `--font-mono`.

**Type scale** (`typeScale`, `[size, line-height, letter-spacing]`):

| Token | Size (clamp) | LH | Tracking | Use |
|---|---|---|---|---|
| `display2xl` | 3.2 → 8.5rem | 0.9 | -0.04em | Hero headline |
| `displayXl` | 3 → 7rem | 0.95 | -0.04em | CTA, big statements |
| `displayLg` | 2.5 → 5.5rem | 1 | -0.035em | Section headlines |
| `displayMd` | 2 → 3.5rem | 1.05 | -0.02em | Sub-headlines |
| `displaySm` | 1.5 → 2.5rem | 1.1 | -0.015em | Card titles |
| `body` | 1rem | 1.6 | 0 | Paragraphs |
| `small` | 0.875rem | 1.55 | 0 | Secondary text |
| `label` | 0.7rem | 1 | 0.15em | Uppercase mono labels |

**Law:** the bigger the type, the tighter the tracking and leading. Body never exceeds ~4 lines.

---

## 2. TAILWIND CONFIG

`tailwind.config.ts` extends (not replaces) defaults with:
- `colors`: `bg.*`, `purple.*`, `violet.*`, `indigo.*` (+ tuned `zinc`)
- `fontFamily`: `sans` / `mono` / `display` → CSS vars
- `fontSize`: the `display-*` fluid scale above
- `animation` + `keyframes`: `fade-up`, `fade-in`, `slide-up`, `marquee-left`, `shimmer`, `pulse`
- `boxShadow`: `glow-sm|md|lg|xl`, `glass`
- `backgroundImage`: `gradient-radial`, `gradient-conic`, `glow-purple`, `glow-indigo`
- `backdropBlur.xs`

Everything in `tailwind.config.ts` has a raw twin in `lib/tokens.ts`. Keep them in sync.

---

## 3. COLORS  (`color` in tokens.ts)

**The void (dark stage):**
`#050508` (bg) · `#0a0a12` · `#0f0f1a` · `#14141f` (elevated)

**Signature spectrum — intelligence → engineering:**
`violet.400 #a78bfa` · **`violet.500 #8b5cf6` ★ THE Bharvix color** · `violet.600 #7c3aed` · `indigo.500 #6366f1` · `indigo.400 #818cf8`

**Accents — semantic, rationed:**
`blue #3b82f6` engineering · `pink #ec4899` energy · `amber #f59e0b` momentum · `cyan #06b6d4` support · `emerald #10b981` live/success

**The text-opacity ladder** (`textLadder`) — the discipline that reads premium:

| Level | Opacity | Use |
|---|---|---|
| headline | 90% | Display headlines only |
| subhead | 50% | Lead sub-copy |
| body | 38% | Paragraphs |
| meta | 28% | Labels, captions |
| faint | 15% | Legal, footers |

Pure `#f8f8ff` is reserved and rare. **No colors outside this system. No rainbow gradients.**

---

## 4. SPACING  (`space`, 8px base)

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 160`

- **Section rhythm:** `clamp(5rem, 12vw, 10rem)` top & bottom → `.section-padding`
- **Container:** max `1400px`, gutter `clamp(1.5rem, 5vw, 4rem)` → `.container-custom`
- **Whitespace is aggressive by mandate.** When unsure, add space, not content.

---

## 5. RADIUS  (`radius`)

`sm 8` · `md 12` · `lg 16` · `xl 20` · `2xl 24` · `3xl 32` · `full 9999`

Cards use `2xl`/`3xl`. Buttons & pills use `full`. Tags use `md`. **One family — never mix arbitrary values.**

---

## 6. BUTTONS  (`components/ui/Button.tsx`)

Two tiers only — **never more than one primary per eyeful.**

| Variant | Recipe |
|---|---|
| **primary** | Solid white on black, `font-semibold`; hover → white glow `0 0 40px rgba(255,255,255,0.18)` |
| **secondary** | Glass: `bg-white/[0.04]`, `border-white/[0.12]`; hover → border + fill brighten |
| **ghost** | Text only + underline sweep (`.link-underline`) |

Sizes `sm | md | lg`. Props: `arrow` (slides out-and-up on hover), `magnetic` (cursor attraction, spring 300/30), `cursorLabel`, `external`. Always `rounded-full`.

---

## 7. CARDS  (`components/ui/GlassCard.tsx`)

Base: `bg-white/[0.03]` · `border-white/[0.07]` · `backdrop-blur-xl` · `rounded-2xl` · `p-7`.

On hover: border → `white/[0.14]`, mouse-tracked radial glow (accent), 3D tilt **≤ 8°**, top light line. Props: `accent` (hex), `tilt`, `glow`, `cursorLabel`. **Cards acknowledge the cursor.**

---

## 8. SHADOWS & GLOWS  (`shadow`)

| Token | Value |
|---|---|
| `glowSm/Md/Lg/Xl` | `0 0 {20/40/80/120}px rgba(139,92,246,0.20–0.35)` |
| `glass` | `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)` |
| `elevation` | `0 20px 60px rgba(0,0,0,0.5)` |
| `whiteGlow` | `0 0 40px rgba(255,255,255,0.15)` (primary button hover) |

Glow = purple by default. Shadows imply light from a source, never flat drop-shadows.

---

## 9. GRADIENTS  (`gradient`) — color is radial light, never linear banners

**Light sources (backgrounds):** `glowViolet` · `glowIndigo` · `glowPink` · `glowBlue` · `heroCore` — all `radial-gradient(circle, …, transparent 70%)`, applied to blurred spots.

**Text gradients (clip to text):** `.text-gradient-purple` · `.text-gradient-aurora` · `.text-gradient-warm`.

**`ctaWash`** — the one intentional multi-accent blend (violet→indigo→pink), CTA section only.

**Forbidden:** hard linear gradient banners/bars.

---

## 10. ANIMATIONS  (keyframes in `globals.css` + `tailwind.config.ts`)

`fadeUp` · `fadeIn` · `slideUp` · `marqueeLeft` · `float` (6s) · `floatSlow` (8s) · `borderGlow` (3s) · `shimmerMove` · `pulse` · `ping`.

**Contract:** only `transform` & `opacity` animate · GPU-composited · 60fps required · reveal once.

---

## 11. MOTION PRESETS  (`lib/motion.ts`)

**Eases** (`ease`): `expo [0.16,1,0.3,1]` (house default) · `quart` (scrubbed) · `back` (magnetic only) · `soft`.
**Durations** (`duration`): `fast .4` · `base .6` · `slow .9` · `cinematic 1.2`.
**Stagger** (`stagger`): `tight .06` · `base .08` · `loose .12`.

**Variants (import, don't rewrite inline):**
`fadeUp` · `fadeUpSmall` · `fadeIn` · **`curtainLine`** (signature ↑ mask) · `curtainClip` · `blurIn` · `scaleIn` · `slideInLeft/Right` · `staggerContainer`.

**Helpers:** `makeStagger()` · `withDelay(v, d)` · **`reveal(variant, delay)`** → spread bundle: `<motion.div {...reveal(fadeUp, 0.2)} />`. Viewport default `{ once: true, margin: "-80px" }`.

---

## 12. ICONS  (`icon`)

Library **Lucide** (`lucide-react`). Stroke `1.75` default (`1.5` large / `2` tiny). Sizes: `xs 10 · sm 13 · base 14 · md 16 · lg 20`. Line icons only — no filled/duotone, no emoji in UI chrome.

---

## 13. TOKENS  (`lib/tokens.ts`)

One default export `tokens` bundles everything: `color · textLadder · space · radius · font · typeScale · stroke · shadow · gradient · ease · duration · stagger · spring · glass · noise · background · icon · z`. Use in Three.js, canvas, and inline styles where Tailwind can't reach.

---

## 14. GLASS EFFECTS  (`glass` / `.glass-card`)

Recipe: `background rgba(255,255,255,0.03)` · `border 1px rgba(255,255,255,0.07)` · `backdrop-blur 20px`. Hover → fill `0.06`, border `0.14`. Used for nav pill, cards, stat panels, tags.

---

## 15. NOISE TEXTURES  (`noise` / `body::before` / `.noise-overlay`)

Inline SVG `feTurbulence` (fractalNoise, baseFrequency 0.75, 4 octaves) — **no network request.** Global grain at **~3.5%** over everything (the film stock). Denser variant (`.noise-overlay`, ~40%) for preloader & focal moments. Kills flat-vector cheapness; unifies every surface.

---

## 16. BACKGROUNDS  (`background`)

**Grid:** faint 80px lines (`rgba(255,255,255,0.025)`), masked to fade at edges → `.grid-bg`. Whispers engineering structure.
**Glow spots:** `.spot-purple` · `.spot-indigo` · `.spot-pink` — blurred radial light placed absolutely behind content.
**Section washes:** subtle `radial-gradient(ellipse … at …, accent 0%, transparent 70%)` per section.

---

## 17. CURSOR  (`components/cursor/CustomCursor.tsx`)

Two elements (browser cursor hidden globally via `* { cursor: none }`):

| Element | Behaviour | Spring |
|---|---|---|
| **Dot** | 2px, `mix-blend-difference`, near-instant | `cursorDot` 3000/80 |
| **Ring** | 36px, trails, grows on interactive (×1.8) / label (×2.5) | `cursorRing` 200/30 |

Ring reveals a contextual label (`View` / `Open` / `Profile`) via `data-cursor-label` on any element. Ring border → violet on interactive. Hidden on window leave. `z`: dot `9999`, ring `9998`.

---

## Z-INDEX SCALE  (`z`)

`base 0 · grid 2 · content 10 · nav 100 · noise 9997 · cursorRing 9998 · cursorDot 9999 · preloader 9999`. Keep layering intentional — no random `z-[9999]`.

---

### CONSISTENCY CONTRACT
`tokens.ts` ⟷ `tailwind.config.ts` ⟷ `globals.css` must never drift. Change a value in one → update the other two in the same commit.
