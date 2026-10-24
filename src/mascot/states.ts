export type MascotState = "idle" | "thinking" | "coding" | "done" | "error"

export interface SessionState {
  state: MascotState
  busy: boolean
  tools: ReadonlySet<string>
}

export type MascotEvent =
  | { type: "START" }
  | { type: "TOOL_START"; id: string }
  | { type: "TOOL_END"; id: string }
  | { type: "SUCCESS" }
  | { type: "FAILURE" }
  | { type: "INTERRUPT" }
  | { type: "RESET" }

export const initialState = (): SessionState => ({ state: "idle", busy: false, tools: new Set() })

export function reduce(current: SessionState, event: MascotEvent): SessionState {
  switch (event.type) {
    case "START":
      return { state: current.tools.size ? "coding" : "thinking", busy: true, tools: current.tools }
    case "TOOL_START": {
      const tools = new Set(current.tools)
      tools.add(event.id)
      return { state: "coding", busy: true, tools }
    }
    case "TOOL_END": {
      const tools = new Set(current.tools)
      tools.delete(event.id)
      return { state: current.busy ? (tools.size ? "coding" : "thinking") : current.state, busy: current.busy, tools }
    }
    case "SUCCESS":
      return { state: "done", busy: false, tools: new Set() }
    case "FAILURE":
      return { state: "error", busy: false, tools: new Set() }
    case "INTERRUPT":
    case "RESET":
      return initialState()
  }
}
