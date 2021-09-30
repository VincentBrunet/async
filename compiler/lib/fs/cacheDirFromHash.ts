import { ensureDir } from "https://deno.land/std/fs/ensure_dir.ts";

const cachePath = ".cache";

export async function cacheDirFromHash(hash: string) {
  const dir = cachePath + "/" + hash;
  await ensureDir(dir);
  return dir;
}
