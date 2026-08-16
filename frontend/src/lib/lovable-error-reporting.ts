export function reportLovableError(
  error: Error,
  context?: Record<string, unknown>
) {
  console.error("Application error:", error, context);
}
