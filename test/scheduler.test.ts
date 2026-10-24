import { afterEach, describe, expect, it, vi } from "vitest"
import { schedule } from "../src/mascot/scheduler"

afterEach(() => vi.useRealTimers())
describe("animation timer", () => {
  it("does not schedule when hidden or static", () => {
    vi.useFakeTimers()
    const tick = vi.fn()
    schedule(false, 3, tick)()
    vi.advanceTimersByTime(3000)
    expect(tick).not.toHaveBeenCalled()
    expect(vi.getTimerCount()).toBe(0)
  })

  it("ticks at clamped cadence and disposes", () => {
    vi.useFakeTimers()
    const tick = vi.fn()
    const stop = schedule(true, 100, tick)
    vi.advanceTimersByTime(500)
    expect(tick).toHaveBeenCalledTimes(2)
    stop()
    vi.advanceTimersByTime(1000)
    expect(tick).toHaveBeenCalledTimes(2)
    expect(vi.getTimerCount()).toBe(0)
  })
})
