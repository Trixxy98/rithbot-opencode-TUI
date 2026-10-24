# RithBot

**An animated AI companion for OpenCode TUI.**

> **Status (2026-10-24):** A local V2 CLI-plugin alpha is implemented. See the [root README](../README.md) for the actual install, implementation status, and limitations. The plan below is historical and some proposed V1 APIs/config paths do **not** apply to V2.

RithBot is an open-source OpenCode TUI extension that displays a lightweight, frame-animated mascot in the right-hand sidebar. It reacts to session activity and offers an optional dedicated mascot screen. The first release prioritizes terminal compatibility, accessibility, and a reliable install/uninstall experience.

## Why RithBot?

Coding agents in terminals offer rich functionality but limited visual personality. RithBot adds glanceable feedback without modifying prompts, replacing the AI model, or interfering with coding tasks.

### Planned MVP (v0.1.0)

- Right-sidebar animated character, where supported by the host version.
- States: **idle**, **thinking**, **coding/tool execution**, **done**, **error**.
- Lightweight, text/Unicode sprite animation with ASCII fallback.
- TUI command to open a dedicated mascot view if the sidebar does not render.
- Respect the active OpenCode theme.
- Disable animations for accessibility, and pause them when not visible.
- Local installation first, followed by community distribution.

### Not in MVP

- PNG/GIF/Lottie/SVG rendering inside arbitrary terminals.
- Agent orchestration or model switching.
- Telemetry, cloud accounts, token collection, or remote services.
- Forking the OpenCode source by default.
- Guarantee of compatibility with every OpenCode release.

## Interface concept

```text
┌────────────────────── OpenCode ──────────────────────┬─────────────────┐
│ Session: My Project                                 │ RithBot         │
│                                                     │                 │
│ ✓ Scanned source files                              │   [^_^]         │
│ ◌ Running tests                                     │  /|___|\        │
│                                                     │   /   \         │
│                                                     │ Coding...       │
│                                                     │                 │
│ Ask anything...                                     │                 │
└─────────────────────────────────────────────────────┴─────────────────┘
```

## Stack

| Concern | Choice |
|---|---|
| Language | TypeScript |
| UI | OpenTUI + SolidJS (host rendering path) |
| Platform | OpenCode TUI plugin contract (`@opencode-ai/plugin/tui`) |
| Animations | Small frame arrays + state machine |
| Unit tests | Vitest (proposed) |
| CI | GitHub Actions |
| Release | npm and GitHub Releases (after compatibility checks) |

**Compatibility caveat:** The exact available plugin API, supported slots, and packaging requirements are version-sensitive. Validate against the host version before implementing/installing. Do not load a TUI-only module as a normal server plugin.

## Project status

| Component | Status |
|---|---|
| Product specification | Planned |
| API compatibility spike | Not started |
| Renderer and animation state engine | Not started |
| Sidebar integration | Not started |
| Command and fallback route | Not started |
| Installation and npm release | Not started |

See [PROJECT_PLAN.md](PROJECT_PLAN.md), [ARCHITECTURE.md](ARCHITECTURE.md), [TESTING_AND_RELEASE.md](TESTING_AND_RELEASE.md), and [CONTRIBUTING.md](CONTRIBUTING.md).

## Planned install experience

After testing and publishing a package, users should be able to install the TUI target through the relevant host TUI plugin configuration (`tui.json`) or a compatible plugin manager. **The actual package name and install snippet will be filled in only after a successful release.**

Until then, clone to a development directory, test in a separate OpenCode configuration, and keep a backup of your existing user configuration.

## Principles

1. **Zero prompt modification:** Only UI feedback; never influence model behavior.
2. **Privacy by default:** No prompt contents, filenames, or secrets transmitted or logged.
3. **Graceful degradation:** Hide or fall back when the desired UI slot is unavailable.
4. **Low overhead:** Avoid constant rendering and background work when hidden.
5. **Accessible:** Offer reduced-motion or static modes and readable plain-text states.

## License

Proposed: MIT. Add a valid `LICENSE` file before public release. Only ship original or appropriately licensed character art and fonts.

## References

- [OpenCode plugin documentation](https://opencode.ai/docs/plugins)
- [OpenCode TUI plugin technical specification](https://github.com/anomalyco/opencode/blob/dev/packages/opencode/specs/tui-plugins.md)
- [Built-in sidebar reference](https://github.com/anomalyco/opencode/blob/dev/packages/tui/src/feature-plugins/sidebar/context.tsx)
- [Reported sidebar slot compatibility issue](https://github.com/anomalyco/opencode/issues/34050)

> Technical references may move or change. Pin tested OpenCode and dependency versions in release documentation.
