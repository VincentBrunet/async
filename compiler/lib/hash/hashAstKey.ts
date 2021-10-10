import { Ast } from "../../data/ast/Ast.ts";
import { OutputModule } from "../../passes/950_write_output/util/OutputModule.ts";
import { ensure } from "../errors/ensure.ts";

export function hashAstKey(
  output: OutputModule,
  ast: Ast,
  prefix: string,
) {
  const begin = ensure(ensure(ast.token).begin);
  const hashModule = output.getMeta().meta.meta.hash;
  const hashLocation = begin.toString(16).padStart(8, "0");
  return ["_", hashModule, "_", prefix, "_", "0x", hashLocation].join("");
}
