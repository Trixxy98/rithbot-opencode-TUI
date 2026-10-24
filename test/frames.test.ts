import { describe, expect, it } from "vitest"
import { frame, frames, labels } from "../src/mascot/frames"

describe("frames", () => {
  it("has identical dimensions in every ASCII frame", () => {
    for (const [state, pack] of Object.entries(frames)) {
      expect(labels[state as keyof typeof labels]).toBeTruthy()
      for (const image of pack) {
        expect(image).toHaveLength(3)
        for (const line of image) {
          expect(line).toHaveLength(9)
          expect(line).toMatch(/^[\x20-\x7e]+$/)
        }
      }
    }
  })

  it("wraps frame indices", () => {
    expect(frame("thinking", 2)).toEqual(frame("thinking", 0))
    expect(frame("thinking", -1)).toEqual(frame("thinking", 1))
  })
})
