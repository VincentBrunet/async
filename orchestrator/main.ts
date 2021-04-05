import { prepare } from "./utils/path.ts";

prepare(import.meta.url);

console.log("Deno.cwd()", Deno.cwd())
