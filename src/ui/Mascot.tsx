import { createEffect, createSignal, onCleanup } from "solid-js"
import { usePlugin } from "@opencode/plugin/tui"
import type { SessionState } from "../mascot/states"
import { frame, labels } from "../mascot/frames"
import { schedule } from "../mascot/scheduler"
import type { Settings } from "../config/settings"

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

  return (
    <box flexDirection="column" alignItems="center" width={props.compact ? 13 : 22}>
      <text fg={context.theme.text.base}>RithBot</text>
      <text fg={context.theme.text.base}>{frame(props.value.state, index()).join("\n")}</text>
      <text fg={context.theme.text.base}>{labels[props.value.state]}</text>
    </box>
  )
}
