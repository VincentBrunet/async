import { join, toFileUrl } from "https://deno.land/std@0.109.0/path/mod.ts";
import { combinedUrl } from "./lib/io/combinedUrl.ts";
import { finishCompiles, triggerCompile } from "./pipeline/triggerCompile.ts";

await triggerCompile(
  combinedUrl(
    Deno.args[0],
    toFileUrl(join(Deno.cwd(), "/origin")),
  ),
);

await finishCompiles();
