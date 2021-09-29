import { transpileToC } from "./transpileToC.ts";

await transpileToC(Deno.args[0]);
