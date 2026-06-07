export function parseLocalTime(time?: string) {
  if (!time) return null;

  if (time.endsWith("Z")) {
    return new Date(time);
  }

  return new Date(time + "Z");
}
