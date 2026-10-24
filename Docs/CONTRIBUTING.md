# Contributing to RithBot

Thanks for considering a contribution. RithBot is a planned community-friendly OpenCode TUI mascot plugin.

> **Update:** An OpenCode V2 CLI-only alpha now exists. Follow [../README.md](../README.md) for current setup and limitations; older planning documents contain proposed, pre-V2 interfaces.

## Before contributing

Read `README.md`, `PROJECT_PLAN.md`, and `ARCHITECTURE.md`. The first project gate is verifying host compatibility; not all proposed features are implemented yet.

## Contribution areas

- Host API and compatibility research
- Sprite designs (original artwork or documented compatible license)
- TypeScript state machine and frame renderer
- Terminal visual testing across OSes
- Accessibility / static motion support
- Documentation / screenshots / tutorials

## Pull request expectations

1. Open an issue or discussion for substantial behavior changes.
2. Keep PRs focused and add tests for logic changes.
3. For TUI changes, include terminal name, OS, OpenCode version, and a real screenshot or recording.
4. Never include tokens, API keys, credentials, session messages, private paths, or proprietary source code in examples.
5. Explain compatibility consequences and rollback notes if modifying load/install behavior.
6. Ensure license/attribution checks for all contributed sprite packs.

## Code style

Favor small, typed, pure functions; do not mix host event parsing with rendering. All timers/listeners must have lifecycle cleanup. Always display state text, not color or animation alone.

## Issues labels (proposal)

`bug`, `feature`, `docs`, `good first issue`, `help wanted`, `compatibility`, `performance`, `accessibility`, `release`

## Code of conduct

Be constructive and respectful. Add a formal `CODE_OF_CONDUCT.md` before opening community contributions widely.
