import { finishCompiles, triggerCompile } from "./pipeline/triggerCompile.ts";

await triggerCompile(Deno.args[0]);
await finishCompiles();
