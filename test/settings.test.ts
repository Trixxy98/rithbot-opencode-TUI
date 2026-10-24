import { expect, it } from "vitest"
import { settings } from "../src/config/settings"

it("validates options and always shows accessible state text", () => {
  expect(settings({})).toEqual({ motion: "full", fps: 3 })
  expect(settings({ motion: "off", fps: 50, showStatusText: false }).fps).toBe(4)
  expect(settings({ fps: -1 }).fps).toBe(1)
  expect(settings({ fps: Number.NaN }).fps).toBe(3)
})
