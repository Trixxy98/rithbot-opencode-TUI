import { describe, expect, it } from "vitest"
import { initialState, reduce } from "../src/mascot/states"

describe("session reducer", () => {
  it("tracks overlapping tools, ignores unmatched endings and finishes", () => {
    let state = reduce(initialState(), { type: "START" })
    expect(state.state).toBe("thinking")
    state = reduce(state, { type: "TOOL_START", id: "a" })
    state = reduce(state, { type: "TOOL_START", id: "b" })
    state = reduce(state, { type: "TOOL_START", id: "a" })
    expect(state.tools.size).toBe(2)
    state = reduce(state, { type: "TOOL_END", id: "unknown" })
    expect(state.tools.size).toBe(2)
    state = reduce(state, { type: "TOOL_END", id: "a" })
    expect(state.state).toBe("coding")
    state = reduce(state, { type: "TOOL_END", id: "b" })
    expect(state.state).toBe("thinking")
    state = reduce(state, { type: "SUCCESS" })
    expect(state.state).toBe("done")
    expect(reduce(state, { type: "START" }).state).toBe("thinking")
  })

  it("shows failure until recovery and handles interruption", () => {
    const failed = reduce(initialState(), { type: "FAILURE" })
    expect(failed.state).toBe("error")
    expect(reduce(failed, { type: "TOOL_END", id: "late" }).state).toBe("error")
    expect(reduce(failed, { type: "START" }).state).toBe("thinking")
    expect(reduce(failed, { type: "INTERRUPT" })).toEqual(initialState())
  })
})
