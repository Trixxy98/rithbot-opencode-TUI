import { Plugin } from "@opencode/plugin/tui"
import { Mascot } from "./ui/Mascot"
import { settings } from "./config/settings"
import { connect } from "./host/adapter"
import { createSignal } from "solid-js"

export default Plugin.define({
  id: "rithbot",
  setup(context) {
    const [config, setConfig] = createSignal(settings(context.options))
    const adapter = connect(context.data)
    const sidebar = context.ui.slot({
      append: "sidebar.content",
      render: ({ sessionID }) => <Mascot value={adapter.get(sessionID)} settings={config()} compact />,
    })
    const route = context.ui.router.register({
      name: "rithbot",
      render: ({ data }) => (
        <box flexDirection="column" alignItems="center" justifyContent="center" flexGrow={1}>
          <Mascot value={adapter.get(typeof data?.sessionID === "string" ? data.sessionID : undefined)} settings={config()} />
          <text fg={context.theme.text.base}>Open a session to watch RithBot react to activity.</text>
        </box>
      ),
    })
    context.keymap.layer(() => ({
      mode: "global",
      commands: [{
        id: "rithbot.open",
        title: "Open RithBot mascot",
        group: "RithBot",
        palette: true,
        slash: { name: "rithbot" },
        run: () => {
          const current = context.ui.router.current()
          context.ui.router.navigate({
            type: "plugin",
            name: "rithbot",
            data: current.type === "session" ? { sessionID: current.sessionID } : {},
          })
        },
      }, {
        id: "rithbot.motion",
        title: "Toggle RithBot animation",
        group: "RithBot",
        palette: true,
        run: () => { setConfig(previous => ({ ...previous, motion: previous.motion === "full" ? "off" : "full" })) },
      }],
    }))
    return () => {
      sidebar()
      route()
      adapter.dispose()
    }
  },
})
