import { Ast } from "../../data/ast/Ast.ts";
import { AstModule } from "../../data/ast/AstModule.ts";
import { ensure } from "../errors/ensure.ts";

export function hashGlobalSymbol(
  module: AstModule,
  symbol: Ast,
  prefix: string,
) {
  const begin = ensure(ensure(symbol.token).begin);
  const hashModule = module.sourceToken.sourceCode.hash;
  const hashLocation = begin.toString(16).padStart(8, "0");
  return ["_", hashModule, "_", prefix, "_", "0x", hashLocation].join("");
}
