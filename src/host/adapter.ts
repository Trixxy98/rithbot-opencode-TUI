import { createSignal } from "solid-js"
import type { Data } from "@opencode/plugin/tui/context"
import { initialState, reduce, type MascotEvent, type SessionState } from "../mascot/states"

export function connect(data: Data) {
  const [sessions, setSessions] = createSignal<ReadonlyMap<string, SessionState>>(new Map())
  const timers = new Map<string, ReturnType<typeof setTimeout>>()

  function clear(id: string) {
    const timer = timers.get(id)
    if (timer) clearTimeout(timer)
    timers.delete(id)
  }

  function dispatch(id: string, event: MascotEvent) {
    clear(id)
    setSessions(previous => {
      const next = new Map(previous)
      next.set(id, reduce(previous.get(id) ?? initialState(), event))
      return next
    })
    if (event.type === "SUCCESS") {
      timers.set(id, setTimeout(() => {
        timers.delete(id)
        setSessions(previous => {
          const next = new Map(previous)
          const value = next.get(id)
          if (value?.state === "done") next.set(id, initialState())
          return next
        })
      }, 3500))
    }
  }

  // V2 events carry sessionID and tool call ID; never inspect tool input, message text or file data.
  const stop = data.listen(({ details }) => {
    switch (details.type) {
      case "session.execution.started":
        dispatch(details.data.sessionID, { type: "START" })
        break
      case "session.tool.called":
        dispatch(details.data.sessionID, { type: "TOOL_START", id: details.data.id })
        break
      case "session.tool.success":
      case "session.tool.failed":
        dispatch(details.data.sessionID, { type: "TOOL_END", id: details.data.id })
        break
      case "session.execution.succeeded":
        dispatch(details.data.sessionID, { type: "SUCCESS" })
        break
      case "session.execution.failed":
        dispatch(details.data.sessionID, { type: "FAILURE" })
        break
      case "session.execution.interrupted":
        dispatch(details.data.sessionID, { type: "INTERRUPT" })
        break
      case "session.deleted": {
        const id = details.data.sessionID
        clear(id)
        setSessions(previous => {
          const next = new Map(previous)
          next.delete(id)
          return next
        })
        break
      }
    }
  })

  function get(id?: string): SessionState {
    if (!id) return initialState()
    const cached = sessions().get(id)
    if (cached) return cached
    // Subscriptions are live-only: a session that was already running when
    // the plugin loaded still gets a truthful (but unspecific) busy state.
    return data.session.status(id) === "running" ? reduce(initialState(), { type: "START" }) : initialState()
  }

  return {
    get,
    dispose() {
      stop()
      for (const id of timers.keys()) clear(id)
    },
  }
}
