import { join, toFileUrl } from "https://deno.land/std@0.109.0/path/mod.ts";
import { AstModule } from "./data/ast/AstModule.ts";
import { combinedUrl } from "./lib/io/combinedUrl.ts";
import { runLoop, scheduleImport } from "./pipeline/compile.ts";

scheduleImport(
  combinedUrl(
    Deno.args[0],
    toFileUrl(join(Deno.cwd(), "/origin")),
  ),
  () => {},
);

await runLoop();
