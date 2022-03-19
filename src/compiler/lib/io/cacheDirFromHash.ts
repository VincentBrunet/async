import { join } from "https://deno.land/std@0.63.0/path/mod.ts";

const cachePath = join(Deno.cwd(), ".cache");

export function cacheDirFromHash(hash: string) {
  return join(cachePath, hash);
}
