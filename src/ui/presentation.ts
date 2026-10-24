import type { MascotState } from "../mascot/states"

// Keep the compact copy within the sidebar card; always name the state in text.
export const status: Record<MascotState, { short: string; detail: string; tone: "accent" | "success" | "error" | "neutral" }> = {
  idle: { short: "Ready", detail: "Waiting for a session", tone: "neutral" },
  thinking: { short: "Thinking", detail: "Working on your request", tone: "accent" },
  coding: { short: "Using tools", detail: "Tools are running", tone: "accent" },
  done: { short: "Done", detail: "Request complete", tone: "success" },
  error: { short: "Error", detail: "Request failed", tone: "error" },
}
