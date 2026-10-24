export interface Settings {
  motion: "full" | "off"
  fps: number
}

export function settings(options: Record<string, unknown>): Settings {
  return {
    motion: options.motion === "off" ? "off" : "full",
    fps: typeof options.fps === "number" && Number.isFinite(options.fps)
      ? Math.max(1, Math.min(4, options.fps)) : 3,
  }
}
