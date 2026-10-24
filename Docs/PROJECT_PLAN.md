# RithBot — Product Requirements & Complete Delivery Plan

**Project owner:** RithCode / community contributors  
**Product type:** Open-source developer tool / terminal UI extension  
**Target audience:** OpenCode users wanting glanceable activity feedback and visual personalization  
**Planning date:** 2026-10-21  
**Target first release:** v0.1.0 (date TBD)  
**Status:** Proposed; implementation not started

> **Implementation update (2026-10-24):** Source, tests, CI, and local V2 CLI-plugin loading are now in place. Interactive sidebar and route rendering have not been visually verified. See [../README.md](../README.md) for current status and correct V2 install instructions; the milestones below remain a roadmap, not completed release claims.

## 1. Executive summary

Build a reusable, lightweight animated character for the OpenCode terminal UI. A mascot occupies the existing sidebar where supported, responds to session and tool activity, and offers a fallback dedicated view. Publish source openly on GitHub and later publish a tested npm package so non-developers can install it without editing source code.

### Product problem

Terminal interfaces are functional but visually impersonal. Users may find agent activity difficult to parse at a glance. Mascot states should provide supplementary, not authoritative, feedback on current progress.

### Success criteria

- A new contributor can run a local demo following the README.
- The mascot displays in the sidebar on at least one documented OpenCode release.
- If the sidebar fails, the documented fallback opens and renders.
- Session/tool states are mapped deterministically and accompanied by text labels.
- No interference with OpenCode input, model/provider config, or normal workflow.
- Users can disable animations.
- Automated unit tests pass, and CI builds on supported environments.
- Package installation and removal are documented and tested before publishing.

## 2. Users & primary stories

| Persona | User story | Priority |
|---|---|---|
| Regular OpenCode user | I want to know whether the agent is waiting, busy, executing a tool, or finished | P0 |
| Customization enthusiast | I want a charming animated mascot on the right side without forking OpenCode | P0 |
| Accessibility-focused user | I need static or reduced-motion output | P0 |
| Maintainer | I need a clean API adapter to handle host changes | P0 |
| Community user | I want a repeatable installation and removal flow | P0 |
| Designer/contributor | I want to contribute a new sprite skin | P1 |
| Advanced user | I want customizable FPS and skin settings | P1 |

## 3. Scope boundaries

### In MVP v0.1.0

1. Minimal 2D terminal sprite drawn as text/Unicode with ASCII fallback.
2. At least two animation frames per active animation (with configurable disabled motion).
3. Pure state machine: idle, thinking, coding, done, error.
4. Responsive sidebar content slot integration (best effort).
5. Fallback plugin route and command-palette command.
6. Theme-aware coloring, safe layout at narrow widths.
7. Cleanup for interval/subscriptions when components unmount.
8. Small unit-test suite, manual smoke tests, documentation.

### Out of scope

- Arbitrary sprite PNG/GIF support in all terminals.
- Browser-style absolute positioning or overlays across the OpenCode viewport.
- New autonomous agents, finance trading features, external AI calls, backend/database.
- Notifications and sound by default; consider opt-in after MVP.
- Automatic updates or persistent cross-device accounts.

## 4. Functional requirements

| ID | Requirement | Priority | Acceptance test |
|---|---|---|---|
| FR-01 | Render mascot in host sidebar slot | Must | Mascot is visible in a documented supported OpenCode version |
| FR-02 | Show state label even with animation disabled | Must | Text labels change for every state |
| FR-03 | Switch frames while active | Must | Animation advances only when visible and enabled |
| FR-04 | Map AI and tool events to a display state | Must | Event fixtures yield expected state transitions |
| FR-05 | Recover from session failures | Must | State becomes error without a plugin crash |
| FR-06 | Provide fallback route/command | Must | Route renders even if sidebar integration is unavailable |
| FR-07 | Avoid overwriting user's global configs | Must | Docs instruct safe merge + backup; uninstall reverses only plugin config |
| FR-08 | Offer animation-off mode | Must | Static frame + status text visible |
| FR-09 | Offer selected mascot skins | Should | At least 2 skins with tested dimensions (v0.2) |
| FR-10 | Configurable speed | Should | Valid values clamped to a safe range (v0.2) |
| FR-11 | Publish a reusable package | Should | Versioned npm artifact installs cleanly after compatibility testing |

## 5. Nonfunctional requirements

- **Performance:** no heavy graphical runtime or polling network services; benchmark render timing on MacBook Air M4 and a modest Linux machine.
- **Responsiveness:** preserve usability in common terminal sizes; render static compact mode below a documented width.
- **Privacy/security:** read only necessary session status; no contents of prompts/files/messages sent off-device.
- **Reliability:** failure in animation logic must never break the main OpenCode workflow; use error-safe boundaries where available.
- **Maintainability:** separate host adapter, state machine, renderer, assets, settings and CLI/route integration.
- **Licensing:** original or permissively licensed visuals; MIT project license.
- **Accessibility:** labels are never conveyed by animation alone; static / reduced motion option.

## 6. Milestone delivery plan

Estimates assume part-time solo development with familiarity in TypeScript; **all estimates are indicative, not promises**.

| Stage | Estimate | Deliverables | Exit gate |
|---|---|---|---|
| M0. Validate host API | 1–2 days | Version report, minimal TUI plugin, slot spike | Route and at least one UI surface demonstrably render |
| M1. Core mascot engine | 2–3 days | Pure state machine, ASCII sprite frames, tests | State tests pass; animation loops clean up correctly |
| M2. Sidebar experience | 2–4 days | Slot UI, responsiveness, status text | No broken OpenCode input or layout in tests |
| M3. Accessibility & fallback | 1–2 days | Static mode, fallback route, shortcut | Works with motion off and when sidebar unavailable |
| M4. Package & polish | 2–3 days | README, CI, install/remove guide, demo capture | Clean install/test/remove on supported host |
| M5. Beta launch | 1–3 days | GitHub prerelease, issue templates, feedback triage | MVP bugs documented, published supported versions |

**Rough MVP range:** 9–17 part-time development days; expand if the OpenCode host API changes or sidebar behavior is incompatible.

### Recommended GitHub issue breakdown

- `chore: create TypeScript workspace and CI skeleton`
- `research: confirm OpenCode version and TUI API surface`
- `feat: define mascot state types and transition reducer`
- `feat: implement ASCII/Unicode sprite pack`
- `feat: add efficient frame scheduler with cleanup`
- `feat: add TUI sidebar slot component`
- `feat: add fallback mascot route and palette command`
- `feat: integrate session status and tool events`
- `feat: support static/reduced-motion rendering`
- `test: state, renderer, scheduler and regression tests`
- `docs: install, uninstall, compatibility and demo`
- `release: test npm packaging and publish beta`

## 7. Roadmap

### v0.1.0 — functional MVP

- One character skin; 5 states; sidebar and fallback route; static mode.
- Snapshot and state tests; manual supported-host smoke testing.

### v0.2.0 — personalization

- 2–3 custom sprite skins, theme palettes, configurable animation speed.
- Persist user preferences using approved TUI config / KV APIs as appropriate.
- Strict sprite dimension validation.

### v0.3.0 — UX, ecosystem support

- More adaptable compact view; better resizing and frame pacing.
- Matrix for macOS, Linux, Windows terminals; compatibility badges.
- Better diagnostics and plugin-manager integration if supported.

### v1.0.0 — stable public version

- Public compatibility contract and release policy.
- Reliable install/remove, tested npm distribution, CHANGELOG, contribution workflow.
- Maintainer triage and security disclosure process.

## 8. Definition of Done

A task is complete only when it has: source code, tests where relevant, documentation, no new lint/type errors, demonstrated host behavior where UI is involved, cleanup/uninstall consideration, and review of sensitive data/logging impact.

## 9. Risks and mitigations

| Risk | Impact | Response |
|---|---|---|
| TUI API changes between releases | High | Compatibility spike; isolate adapter; record tested versions |
| `sidebar_content` not invoked for external plugins | High | Dedicated route fallback; do not claim sidebar compatibility until verified |
| Terminal Unicode alignment differs | Medium | ASCII fallback, fixed measured cell dimensions |
| Refresh loop causes CPU usage | Medium | Low FPS; tick only when visible; benchmark |
| Keyboard shortcut conflicts | Medium | Remappable shortcut and command palette fallback |
| User configuration overwritten | High | Merge instead of replace, backup steps and uninstall instructions |
| Sprite art copyright | Medium | Original assets + asset license checklist |
| npm package name taken | Low | Check availability before publication, choose alternate name |

## 10. Work sequence for first development session

1. Create `RithBot` local Git repository in Cursor.
2. Record `opencode --version`, `bun --version`, `node --version`, and `uname -a` in development notes (do not commit private paths/secrets).
3. Back up `~/.config/opencode/tui.json` and `opencode.json` if present.
4. Build a minimal TUI plugin returning a static text label in a supported slot and route.
5. Verify actual mounting and execution on the installed host.
6. Only then add a reactive component and animation logic.
7. Commit the spike and document which host revision was tested.

## 11. Portfolio outcomes

A strong finished portfolio entry should demonstrate: TypeScript, terminal UI design, state machines, event-driven programming, plugin architecture, test automation, packaging and cross-platform software maintenance. Avoid claiming adoption, npm publication, or tested support before it happens.
