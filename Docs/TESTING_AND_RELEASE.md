# RithBot — Testing, Compatibility & Release Plan

**Status:** Partial local verification; remaining compatibility and release tests are planned.

> **Update (2026-10-24):** `npm run check` passes locally (8 unit tests, typecheck, build). OpenCode CLI v2.1.1 discovered `.opencode/plugins/rithbot/tui.ts` and rendered the palette commands and fallback sprite in a macOS pseudo-terminal. A 190-column session displayed the sidebar sprite with “Thinking...” during a harmless “Reply with OK.” request and later “Ready”; tool and failure transitions were not tested. External `cli.json` directory loading did **not** discover the package. V2 stores CLI preferences in `cli.json`, **not** `tui.json`. See [../README.md](../README.md).

## 1. Compatibility matrix

Fill exact versions, dates, and terminal observations from real executions. Do not infer compatibility from a successful TypeScript build.

| Platform | Terminal | OpenCode version | Sidebar | Route | Unicode | Notes |
|---|---|---|---|---|---|---|
| macOS Apple Silicon | macOS Terminal | TBD | Untested | Untested | Untested | Primary developer machine |
| macOS (local) | 190-column pseudo-terminal (`xterm-256color`) | 2.1.1 | Sprite + Thinking/Ready observed | Palette and fallback sprite + Ready observed | ASCII sprite observed; other Unicode untested | OpenCode standalone; one harmless model request; no tool/error test |
| macOS Apple Silicon | Ghostty | TBD | Untested | Untested | Untested | Optional terminal |
| Linux x64 | Common terminal | TBD | Untested | Untested | Untested | Community beta target |
| Windows | Windows Terminal | TBD | Untested | Untested | Untested | Add after MVP |

Historical issue: https://github.com/anomalyco/opencode/issues/34050 reports an external-plugin sidebar rendering failure on OpenCode 1.17.11. An issue report isn't proof every newer release fails; run a version-specific smoke test.

## 2. Unit tests

- Reducer transitions cover every state and recovery path.
- Events from inactive sessions cannot override active-session status.
- Tool overlap counter never underflows.
- Frame index wraps without exception.
- Sprite frames have consistent terminal-cell width and height.
- Static mode does not start a repeating animation timer.
- Scheduler disposes all timers/event subscriptions when hidden/unmounted.
- Invalid settings are rejected or safely clamped.

## 3. Integration/smoke tests

1. Start host OpenCode with a separate test config folder.
2. Verify plugin initializes without impacting existing provider/model selections.
3. Verify mascot appears in sidebar (if supported) with readable status labels.
4. Open the command palette and activate the fallback route.
5. Submit a harmless test prompt; observe thinking -> tool -> done transitions.
6. Simulate an error; check error display and recovery.
7. Resize terminal from wide to narrow; no crashes or text overflow.
8. Disable animation; confirm label still updates without frame ticking.
9. Switch OpenCode theme; confirm readable colors.
10. Deactivate plugin; verify it stops all work and OpenCode remains usable.
11. Uninstall; verify no orphaned config entries or assets remain.

## 4. Performance tests

Collect a baseline with and without RithBot under identical OpenCode activity. Measure idle CPU, active CPU, memory, frame cadence, terminal redraw artifacts and input lag. Set budgets after collecting baseline rather than promising arbitrary percentages in advance.

## 5. CI proposal

- `lint` (ESLint)
- `typecheck` (TypeScript)
- `test` (Vitest)
- `build` (host-compatible bundler)
- `package-smoke` (verify export paths and installable tarball)

CI passes do **not** replace manual visual verification in supported OpenCode releases.

## 6. Release process

### Alpha

- Document one verified host version and known limitations.
- Produce a GitHub tag `v0.1.0-alpha.1` after first functional smoke test.
- Record screenshots/GIF of real terminal behavior (not a conceptual mockup).

### Beta

- Gather install and uninstall reports from macOS and Linux volunteers.
- Triage layout and frame-width differences.
- Check npm scope and package name availability.

### v0.1.0 stable

- Create `LICENSE`, `CHANGELOG.md`, contribution and security policy.
- Confirm built package exports and install instructions work in clean environment.
- Publish to npm, then tag matching GitHub release and attach verified demo.
- List known compatible OpenCode versions (not vague 'latest').

## 7. Safe local development guidance

Backup, do not overwrite, existing config. Example commands:

```bash
mkdir -p "$HOME/.config/opencode"
for name in cli.json opencode.json; do
  if [ -f "$HOME/.config/opencode/$name" ]; then
    cp "$HOME/.config/opencode/$name" "$HOME/.config/opencode/$name.bak"
  fi
done
opencode --version
node --version
bun --version
```

`bun --version` can fail if Bun is not installed; that's diagnostic, not a reason to reinstall OpenCode. Use Cursor to edit configuration safely. Never paste a new JSON object over a populated config without merging keys.

## 8. Rollback and uninstall requirements

Before public release, validate and document how to remove the RithBot CLI plugin entry from `cli.json` (or remove the project-local `.opencode/plugins/rithbot/tui.ts` discovery file), restart the CLI, and verify no plugin UI remains. Do not remove other user plugins or delete the entire `~/.config/opencode` directory.

## 9. Versioning and communication

Use SemVer. For every release publish: tested OpenCode versions, platforms, known issues, upgrade steps, screenshots and changelog. Breaking TUI API changes require a compatibility audit and may warrant a major/minor bump depending on public API effect.
