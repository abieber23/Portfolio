# Portfolio – Adrian Bieber

Personal portfolio site (Angular 22, standalone components, signals, zoneless, SCSS, no SSR) used for
job applications as a frontend developer. The user communicates in **German** – reply in German.

## Commands

- `npm start` – dev server
- `npx ng build` – production build (watch the component-style budget: warning 6 kB, error 8 kB)
- `npx ng test --watch=false` – Vitest unit tests

## Structure

- `src/app/core/` – `profile.ts` (name, email, address, social URLs, page title),
  `translations.ts` (all UI texts, EN + DE; `Translations` type is derived from `en`, so `de` must
  have the same keys), `legal-texts.ts` (Impressum + Datenschutz, EN + DE), `language.service.ts`
- `src/app/layout/` – header (language toggle, nav, burger menu) and footer
- `src/app/pages/` – `home` (all sections), `legal` (one component for both legal pages, picks the
  text via route data `doc` → input binding)
- `src/app/sections/` – hero, about, skills, avatar, projects (+ `project-dialog`), testimonials, contact
- `src/app/shared/` – logo, social links, language toggle
- Routes: `/`, `/legal-notice`, `/privacy-policy`, `**` → `/`. Nav links use
  `routerLink="/" fragment="…"` (anchor scrolling is enabled in `app.config.ts`).

## Conventions

- Every visible text goes into `translations.ts` (EN **and** DE) – no hard-coded strings.
- Design tokens live in `src/styles.scss` (`--color-*`, `--font-*`, `--page-gutter`); global helper
  `.visually-hidden`.
- Minimum font size on the whole site is **16px**.
- Section look: accent label (23px) → mono heading `clamp(40px, 4.5vw, 64px)` → 18px intro; cards
  with 1px accent border, 30px radius, `--color-card` background; pill buttons with white border.
- Mobile layout is postponed until the user asks for it.

## Open TODOs (placeholders)

- `profile.ts`: real LinkedIn URL
- `projects.ts`: Firebase icon missing
- `legal-texts.ts`: log retention days `[X]` (from the all-inkl AVV), D-ID address
- Contact form posts JSON to `public/sendMail.php` (PHP `mail()`, sender `noreply@adrian-bieber-portfolio.de`,
  honeypot field `website`). PHP doesn't run on `ng serve` – test on the live server (all-inkl / kasserver).

## AI avatar (D-ID) – planned

Section `src/app/sections/avatar/` (between Skills and Projects). **Layout and styling are final;**
only the D-ID connection is missing.

Requirements from the user:

- Avatar fed with Adrian's info (knowledge base is configured in D-ID Studio, not in this repo).
- Visitors communicate **only via the text field – no microphone**.
- Answers come **spoken (video + voice) and written** (shown as chat bubbles).

Current placeholder behaviour:

- Consent gate: `started` signal. Before "Start avatar" is clicked, nothing from D-ID may be loaded;
  chat input and suggestions are disabled. The privacy policy (section 8 "KI-Avatar (D-ID)") relies
  on this – **keep the gate when integrating**.
- `send()` answers locally with `avatar.placeholderReply`.
- Video area is `.stage__video--placeholder` in `avatar.html`.

Integration plan (verify the API against the current D-ID docs first):

1. Create an agent in D-ID Studio, add the knowledge base, get the agent ID and a client key;
   restrict the client key to the site's domain(s) (+ localhost for dev). Never commit a secret API key.
2. `npm i @d-id/client-sdk`; in `start()` load it via dynamic `import()` so nothing is fetched before
   consent, then `createAgentManager(agentId, { auth: { type: 'key', clientKey }, callbacks })` and `connect()`.
3. Replace the placeholder div with a `<video autoplay playsinline>`; set `srcObject` in the
   `onSrcObjectReady` callback (keep the 4:5 frame, border and radius of `.stage__video`).
4. `send()` → `agentManager.chat(text)`; render answers from `onNewMessage` into `messages`
   (written answer), the spoken answer plays in the video. Show a typing/loading state while waiting.
5. Handle connection states/errors (`onConnectionStateChange`, `onError`) with a translated message;
   disconnect on component destroy (`DestroyRef`).
6. Do not request microphone access anywhere.
7. Afterwards: fill in D-ID's address in `legal-texts.ts` and re-check section 8 against D-ID's
   current privacy policy / DPA; remove the "Coming soon" badge.
