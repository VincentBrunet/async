import { createHash } from "https://deno.land/std@0.106.0/hash/mod.ts";

export function hashModuleId(input: string): string {
  const sha256 = createHash("sha256").update(input).toString();
  const hash = "0x" + sha256.slice(0, 64).toUpperCase();
  if (true) { // TODO - remove
    return hash.slice(0, 16);
  }
  return hash;
}
