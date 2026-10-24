import { createEffect, createSignal, onCleanup } from "solid-js"
import { usePlugin } from "@opencode/plugin/tui"
import type { SessionState } from "../mascot/states"
import { frame } from "../mascot/frames"
import { schedule } from "../mascot/scheduler"
import type { Settings } from "../config/settings"
import { status } from "./presentation"

export function Mascot(props: { value: SessionState; settings: Settings; compact?: boolean }) {
  const context = usePlugin()
  const [index, setIndex] = createSignal(0)

  createEffect(() => {
    const state = props.value.state
    const animated = props.settings.motion === "full" && (state === "thinking" || state === "coding")
    const stop = schedule(animated, props.settings.fps, () => setIndex(value => value + 1))
    onCleanup(() => {
      stop()
      setIndex(0)
    })
  })

  const tone = () => {
    switch (status[props.value.state].tone) {
      case "accent": return context.theme.text.action.primary.base
      case "success": return context.theme.hue.green[300]
      case "error": return context.theme.hue.red[300]
      default: return context.theme.text.base
    }
  }

  return (
    <box flexDirection="column" alignItems="center" width="100%" maxWidth={props.compact ? 19 : 32} padding={1} backgroundColor={context.theme.background.raised.base}>
      <text fg={context.theme.text.muted}>-- RITHBOT --</text>
      <text fg={tone()}>{frame(props.value.state, index()).join("\n")}</text>
      <text fg={tone()}>{`* ${status[props.value.state].short}`}</text>
      {!props.compact && <text fg={context.theme.text.muted}>{status[props.value.state].detail}</text>}
      <text fg={context.theme.text.muted}>-------------</text>
    </box>
  )
}
