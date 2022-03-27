import { createHash } from 'https://deno.land/std@0.106.0/hash/mod.ts';

export function hashObjectFieldName(input: string): string {
  const sha256 = createHash('sha256').update(input).toString();
  const hash = '0x' + sha256.slice(0, 16).toUpperCase();
  return hash;
}
