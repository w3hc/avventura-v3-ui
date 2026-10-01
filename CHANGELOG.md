# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Text length choice (Normal or Short) in the story setup modal, sent to the backend as `textLength`; Short caps each step description at 980 characters ([#38](https://github.com/w3hc/avventura-v3-ui/pull/38))
- Send the difficulty chosen in the story setup modal to the backend ([#36](https://github.com/w3hc/avventura-v3-ui/pull/36))
- End screen for `death` and `victory` steps, with a "Play again" button that reopens the setup modal prefilled with the previous settings ([#36](https://github.com/w3hc/avventura-v3-ui/pull/36))
- Show the end screen instead of failing silently when a move is made on a game that is already over, e.g. from a stale tab ([#36](https://github.com/w3hc/avventura-v3-ui/pull/36))

### Changed

- Disable the Solo, Multi and Web3 modes and the game duration field in the story setup modal; Family is the only selectable mode and the default duration is still sent ([#34](https://github.com/w3hc/avventura-v3-ui/pull/34))
