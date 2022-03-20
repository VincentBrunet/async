export function combinedUrl(currentUrl: URL, nextStr: string): URL {
  return new URL(nextStr, currentUrl);
}
