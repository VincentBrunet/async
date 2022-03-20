import { join, toFileUrl } from 'https://deno.land/std@0.109.0/path/mod.ts';
import { combinedUrl } from './lib/io/combinedUrl.ts';
import { runLoop, scheduleImport } from './pipeline/compile.ts';

scheduleImport(
  combinedUrl(toFileUrl(join(Deno.cwd(), '/')), Deno.args[0]),
  () => {},
);

await runLoop();
