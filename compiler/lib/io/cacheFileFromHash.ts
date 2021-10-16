import { join } from "https://deno.land/std@0.63.0/path/mod.ts";
import { cacheDirFromHash } from "./cacheDirFromHash.ts";

export async function cacheFileFromHash(hash: string, file: string) {
  const cacheDir = await cacheDirFromHash(hash);
  return join(cacheDir, file);
}
