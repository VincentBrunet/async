export function combinedUrl(nextStr: string, currentUrl: URL): URL {
  console.log("combineUrl.nextStr", nextStr);
  console.log("combineUrl.currentUrl.href", currentUrl.href);
  const nextUrl = new URL(nextStr, currentUrl);
  console.log("combineUrl.nextUrl.href", nextUrl.href);
  return nextUrl;
}
