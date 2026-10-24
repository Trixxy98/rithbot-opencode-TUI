import { describe, expect, it } from "vitest"
import { status } from "../src/ui/presentation"
import { frames } from "../src/mascot/frames"

describe("mascot card copy", () => {
  it("keeps every compact state readable within the sidebar card", () => {
    for (const state of Object.keys(frames) as (keyof typeof frames)[]) {
      expect(status[state].short.length + 2).toBeLessThanOrEqual(13)
      expect(status[state].detail.length).toBeLessThanOrEqual(30)
      expect(status[state].tone).toBeTruthy()
    }
  })
})
