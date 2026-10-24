// One interval per mounted, animated mascot. The caller owns the returned disposer.
export function schedule(active: boolean, fps: number, tick: () => void): () => void {
  if (!active) return () => {}
  const timer = setInterval(tick, 1000 / Math.max(1, Math.min(4, fps)))
  return () => clearInterval(timer)
}
