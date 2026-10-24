# RithBot

An original ASCII mascot for the **OpenCode V2 terminal UI**. It follows live session and tool events without reading prompts or changing the agent. The right sidebar shows a compact companion when the host displays a sidebar; a palette command opens a dedicated mascot page.

**Status: local-development alpha.** On macOS with OpenCode CLI v2.1.1, the project-local plugin was discovered in a pseudo-terminal. Both palette commands and the ASCII fallback page rendered; in a 190-column session, the sidebar rendered the sprite with “Thinking...” during a harmless model request and later “Ready.” Tool-call and error transitions remain unverified. Not published to npm. Do not treat the image or concept in `Docs/` as a verified screenshot.

## Try locally

Requires OpenCode V2 and Node.js >=26.4 for the pinned OpenTUI dependencies (or compatible Bun >=1.3.14). Development commands used `npm` with Node 20 and completed with engine warnings; use a supported runtime for production development.

```sh
npm ci
npm run check
```

For a local demo, start the CLI **from this directory**:

```sh
opencode --standalone
```

OpenCode discovers `.opencode/plugins/rithbot/tui.ts`, which imports the source plugin; it does not edit your user configuration. `--standalone` starts a private server. To isolate other user configuration for an experiment, use a separate `XDG_CONFIG_HOME`; do not move or delete existing files. The package `./tui` export is provided for future distribution, **but loading this directory as an external `cli.json` package did not work in our v2.1.1 smoke test**.

Open a session, widen the terminal enough to show the host sidebar (`session.sidebar` must not be `hide`). Choose **Open RithBot mascot** from the command palette (Ctrl+P), or use `/rithbot`, for the fallback page. Choose **Toggle RithBot animation** from the palette for a static, always-labeled mascot (until restart). The page shows session activity when opened from a session; from home it displays Ready. The plugin does not submit prompts or call a model. To exit the fallback page, use the host's back navigation.

The verified local-discovery route currently uses default options: `motion: "full"`, `fps: 3`. The plugin accepts `motion: "off"` and clamps `fps` to 1–4 when a supported CLI package loader supplies options, but **options through external installation remain unverified**. State text is always visible. The project is **CLI-only**: do not add it to `opencode.json` or server plugin directories. To uninstall this development copy from a project, remove only the RithBot TUI discovery file and restart the CLI; do not remove anyone else's plugins or configuration. No persistent RithBot storage is created.

## Limitations

- Sidebar visibility depends on OpenCode's layout and host slot behavior; a 190-column pseudo-terminal session displayed the sprite, but narrow terminals or a hidden sidebar may not. Use the palette page instead.
- Events are live-only; already-running sessions show generic Thinking until their next event. RithBot does not infer precise progress. A successful execution shows Done for 3.5 seconds, then Ready; errors persist until a new request.
- Sidebar visibility has been observed only in a wide macOS pseudo-terminal session; other terminal sizes and external-package loading need verification/fixes before publishing. This alpha does not claim release-ready compatibility or npm distribution.

The product specification and manual smoke checklist are in `Docs/`. Current V2 sources: [CLI plugin API](https://opencode.ai/v2/docs/build/plugins/cli), [CLI plugin configuration](https://opencode.ai/v2/docs/cli/plugins), [CLI settings](https://opencode.ai/v2/docs/cli/config).

## Development

`npm run typecheck`, `npm test`, and `npm run build` are included in `npm run check`. The build emits `dist/tui.js` for inspection, but local OpenCode discovery uses `.opencode/plugins/rithbot/tui.ts`; the compiled artifact is not a published package. See `Docs/TESTING_AND_RELEASE.md` for the manual verification still required.

MIT licensed; see `LICENSE`.
