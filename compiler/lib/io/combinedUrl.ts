export function combinedUrl(nextStr: string, currentUrl: URL): URL {
  return new URL(nextStr, currentUrl);
}
