# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Creating a story asks a signed-out user to log in, then for a SIWE signature authorizing `POST /stories`, sent to the API in the `x-siwe-message` and `x-siwe-signature` headers ([#50](https://github.com/w3hc/avventura-v3-ui/pull/50))
- "Save changes" on `/edit/<slug>` asks for a SIWE signature authorizing `POST /stories/edit`, with translated errors for a refused signature and a non-creator save ([#50](https://github.com/w3hc/avventura-v3-ui/pull/50))
- `signSiwe(method, path)` and `isAuthReady` in the W3PK context ([#50](https://github.com/w3hc/avventura-v3-ui/pull/50))
- Passwordless device sync: Settings → Sync exports a sync file locked to the passkey, shown as a QR code link, and imports it on any device where the passkey synced ([#48](https://github.com/w3hc/avventura-v3-ui/pull/48))
- "Browser too old" and "loading failed" screens instead of an endless spinner, from an inline compat script in the root layout ([#48](https://github.com/w3hc/avventura-v3-ui/pull/48))
- A translated root error screen with Try again and Reload buttons for crashes in the root layout (`global-error.tsx`) ([#48](https://github.com/w3hc/avventura-v3-ui/pull/48))
- On iPhone and iPad, a choice between Add to Home Screen and Back up before registration ([#48](https://github.com/w3hc/avventura-v3-ui/pull/48))
- A per-tier authenticator hint and a PRF warning in the registration dialog, with Create Account disabled when the browser has no WebAuthn ([#48](https://github.com/w3hc/avventura-v3-ui/pull/48))
- Project `.claude/CLAUDE.md` describing the production host (Ubuntu VPS on Infomaniak, https://avventura.fun) and the API used in production (`https://api.avventura.fun/`) and locally (`http://localhost:3000`, from `../avventura-v3`) ([#42](https://github.com/w3hc/avventura-v3-ui/pull/42))
- Safari backup step after registration: when the browser can wipe the wallet, a blocking "Back up your wallet" dialog offers a password-protected backup file ([#40](https://github.com/w3hc/avventura-v3-ui/pull/40))
- HTTP security headers on every route: Content-Security-Policy, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` and `Strict-Transport-Security` ([#40](https://github.com/w3hc/avventura-v3-ui/pull/40))
- `pnpm-workspace.yaml` with a 3-day minimum release age for new dependency versions, and `pnpm.overrides` forcing patched transitive dependencies ([#40](https://github.com/w3hc/avventura-v3-ui/pull/40))
- `templateVersion` in `package.json`, recording that the project is synced with genji 3.2.0 ([#40](https://github.com/w3hc/avventura-v3-ui/pull/40))
- Text length choice (Normal or Short) in the story setup modal, sent to the backend as `textLength`; Short caps each step description at 980 characters ([#38](https://github.com/w3hc/avventura-v3-ui/pull/38))
- Send the difficulty chosen in the story setup modal to the backend ([#36](https://github.com/w3hc/avventura-v3-ui/pull/36))
- End screen for `death` and `victory` steps, with a "Play again" button that reopens the setup modal prefilled with the previous settings ([#36](https://github.com/w3hc/avventura-v3-ui/pull/36))
- Show the end screen instead of failing silently when a move is made on a game that is already over, e.g. from a stale tab ([#36](https://github.com/w3hc/avventura-v3-ui/pull/36))

### Changed

- `/edit/<slug>` reads the story's owner from `ownerAddress`, falling back to `creatorAddress` until the API rename deploys, and the refused-save message says "owner" instead of "creator" in every language ([#54](https://github.com/w3hc/avventura-v3-ui/pull/54))
- The story creation page (`/edit`) shows the header ([#52](https://github.com/w3hc/avventura-v3-ui/pull/52))
- Create, clicked while signed out, runs the header's login flow (passkey prompt, or the registration dialog on a device without one), then continues to story creation with the entered prompt ([#52](https://github.com/w3hc/avventura-v3-ui/pull/52))
- The login flow and registration dialog move from `Header` to a shared `LoginFlowProvider` exposing `startLogin()` ([#52](https://github.com/w3hc/avventura-v3-ui/pull/52))
- `/edit/<slug>` shows the 404 page unless the signed-in address is the story's `creatorAddress`, and also when the story doesn't exist ([#50](https://github.com/w3hc/avventura-v3-ui/pull/50))
- The story create and edit route handlers pass the API's 400, 401, 403 and 404 statuses through instead of returning 500 ([#50](https://github.com/w3hc/avventura-v3-ui/pull/50))
- Bump dependencies to genji 3.4.0, including `next` 16.4.3, which fixes two critical and one high advisory, and `w3pk` 0.12.4, a security release; wallets stored by w3pk 0.10.x must be restored from a backup or a sync file ([#48](https://github.com/w3hc/avventura-v3-ui/pull/48))
- Build on Node.js 24 in CI and require Node.js `>=24.22.1`, for the October 2026 Node.js security releases ([#48](https://github.com/w3hc/avventura-v3-ui/pull/48))
- Allow `https://registry.npmjs.org` instead of `https://unpkg.com` in the CSP, which fixes build verification ([#48](https://github.com/w3hc/avventura-v3-ui/pull/48))
- Follow w3pk's password rules: 15 to 256 characters, not one character repeated, not a common password ([#48](https://github.com/w3hc/avventura-v3-ui/pull/48))
- Show WebAuthn capabilities instead of browser version checks on the Settings page ([#48](https://github.com/w3hc/avventura-v3-ui/pull/48))
- The registration dialog's "already registered" link opens the sync import on the Settings page ([#48](https://github.com/w3hc/avventura-v3-ui/pull/48))
- Set `templateVersion` to `3.4.0` ([#48](https://github.com/w3hc/avventura-v3-ui/pull/48))
- Bump dependencies to genji 3.2.0, including Next.js 16.4.0, which fixes three critical remote code execution advisories, and w3pk 0.10.3 ([#40](https://github.com/w3hc/avventura-v3-ui/pull/40))
- Detect "Remember Me" sessions in localStorage, where w3pk 0.10.3 now keeps them ([#40](https://github.com/w3hc/avventura-v3-ui/pull/40))
- Translate the Settings page in all 10 supported languages, and disable its AI security inspection as in genji ([#40](https://github.com/w3hc/avventura-v3-ui/pull/40))
- Open the registration modal directly when no passkey is registered on this device, instead of the browser's cross-device QR code dialog, and add an "Already registered?" link to it ([#40](https://github.com/w3hc/avventura-v3-ui/pull/40))
- Set the metadata base URL to `https://avventura.fun` ([#40](https://github.com/w3hc/avventura-v3-ui/pull/40))
- Disable the Solo, Multi and Web3 modes and the game duration field in the story setup modal; Family is the only selectable mode and the default duration is still sent ([#34](https://github.com/w3hc/avventura-v3-ui/pull/34))

### Removed

- `react-markdown` and `remark-gfm`, only used by the disabled security report ([#48](https://github.com/w3hc/avventura-v3-ui/pull/48))
- The Settings page's wallet-linking QR code and the security inspection console hints ([#48](https://github.com/w3hc/avventura-v3-ui/pull/48))
- The IndexedDB inspector on the Settings page and the IndexedDB copy of linked wallets ([#40](https://github.com/w3hc/avventura-v3-ui/pull/40))
- `@neondatabase/serverless`, which nothing imported ([#40](https://github.com/w3hc/avventura-v3-ui/pull/40))
