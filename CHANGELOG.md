# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

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

- Bump dependencies to genji 3.2.0, including Next.js 16.4.0, which fixes three critical remote code execution advisories, and w3pk 0.10.3 ([#40](https://github.com/w3hc/avventura-v3-ui/pull/40))
- Detect "Remember Me" sessions in localStorage, where w3pk 0.10.3 now keeps them ([#40](https://github.com/w3hc/avventura-v3-ui/pull/40))
- Translate the Settings page in all 10 supported languages, and disable its AI security inspection as in genji ([#40](https://github.com/w3hc/avventura-v3-ui/pull/40))
- Open the registration modal directly when no passkey is registered on this device, instead of the browser's cross-device QR code dialog, and add an "Already registered?" link to it ([#40](https://github.com/w3hc/avventura-v3-ui/pull/40))
- Set the metadata base URL to `https://avventura.fun` ([#40](https://github.com/w3hc/avventura-v3-ui/pull/40))
- Disable the Solo, Multi and Web3 modes and the game duration field in the story setup modal; Family is the only selectable mode and the default duration is still sent ([#34](https://github.com/w3hc/avventura-v3-ui/pull/34))

### Removed

- The IndexedDB inspector on the Settings page and the IndexedDB copy of linked wallets ([#40](https://github.com/w3hc/avventura-v3-ui/pull/40))
- `@neondatabase/serverless`, which nothing imported ([#40](https://github.com/w3hc/avventura-v3-ui/pull/40))
