import { ensureDir } from "https://deno.land/std@0.63.0/fs/mod.ts";
import { join } from "https://deno.land/std@0.63.0/path/mod.ts";

const cachePath = join(Deno.cwd(), ".cache");

export async function cacheDirFromHash(hash: string) {
  const dir = join(cachePath, hash);
  await ensureDir(dir);
  return dir;
}
