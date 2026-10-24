import { afterEach, describe, expect, it, vi } from "vitest"
import type { Data } from "@opencode/plugin/tui/context"
import { connect } from "../src/host/adapter"

afterEach(() => vi.useRealTimers())

describe("V2 event adapter", () => {
  it("isolates sessions, handles failures and removes its listener and completion timer", () => {
    vi.useFakeTimers()
    let receive: (input: { details: unknown }) => void = () => {}
    const stop = vi.fn()
    const data = {
      listen(fn: typeof receive) { receive = fn; return stop },
      session: { status: (id: string) => id === "running" ? "running" : "idle" },
    } as unknown as Data
    const adapter = connect(data)
    const emit = (type: string, sessionID: string, id?: string) => receive({ details: { type, data: { sessionID, id } } })

    expect(adapter.get("running").state).toBe("thinking")
    emit("session.execution.started", "one")
    emit("session.tool.called", "one", "tool-1")
    expect(adapter.get("one").state).toBe("coding")
    expect(adapter.get("two").state).toBe("idle")
    emit("session.execution.failed", "two")
    expect(adapter.get("two").state).toBe("error")
    emit("session.execution.succeeded", "one")
    expect(adapter.get("one").state).toBe("done")
    vi.advanceTimersByTime(3500)
    expect(adapter.get("one").state).toBe("idle")
    emit("session.execution.succeeded", "two")
    adapter.dispose()
    expect(stop).toHaveBeenCalledOnce()
    expect(vi.getTimerCount()).toBe(0)
  })
})
