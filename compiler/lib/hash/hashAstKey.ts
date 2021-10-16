import { Ast } from "../../data/ast/Ast.ts";
import { AstModule } from "../../data/ast/AstModule.ts";
import { ensure } from "../errors/ensure.ts";

export function hashAstKey(
  parent: AstModule,
  ast: Ast,
  prefix: string,
) {
  const begin = ensure(ensure(ast.token).begin);
  const hashModule = parent.sourceToken.sourceCode.hash;
  const hashLocation = begin.toString(16).padStart(8, "0");
  return ["_", hashModule, "_", prefix, "_", "0x", hashLocation].join("");
}
