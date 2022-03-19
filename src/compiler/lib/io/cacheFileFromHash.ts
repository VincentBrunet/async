import { join } from "https://deno.land/std@0.63.0/path/mod.ts";
import { cacheDirFromHash } from "./cacheDirFromHash.ts";

export function cacheFileFromHash(hash: string, file: string) {
  const cacheDir = cacheDirFromHash(hash);
  return join(cacheDir, file);
}
