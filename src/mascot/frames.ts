import type { MascotState } from "./states"

// All artwork is original, ASCII-only and exactly 9 cells wide by 3 lines high.
export const frames: Record<MascotState, readonly (readonly string[])[]> = {
  idle: [["  [^_^]  ", " /|___|\\ ", "  /   \\  "]],
  thinking: [
    ["  [o_o]  ", " /|___|\\ ", "  /   \\  "],
    ["  [o_O]  ", " /|___|\\ ", "  /   \\  "],
  ],
  coding: [
    ["  [>_<]  ", " /|___|\\ ", "  /   \\  "],
    ["  [>_>]  ", " \\|___|/ ", "  /   \\  "],
  ],
  done: [["  [^o^]  ", " \\|___|/ ", "  /   \\  "]],
  error: [["  [x_x]  ", " /|___|\\ ", "  /   \\  "]],
}

export const labels: Record<MascotState, string> = {
  idle: "Ready",
  thinking: "Thinking...",
  coding: "Using tools...",
  done: "Done!",
  error: "Error",
}

export function frame(state: MascotState, index: number): readonly string[] {
  const pack = frames[state]
  return pack[((Math.floor(index) % pack.length) + pack.length) % pack.length]
}
