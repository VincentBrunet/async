import { AstModule } from "../../../data/ast/AstModule.ts";
import { hashAstKey } from "../../../lib/hash/hashAstKey.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { writeStatement } from "./writeStatement.ts";

export function writeModule(module: OutputModule, ast: AstModule) {
  // Named with module hash
  const name = hashAstKey(module, ast, "module");
  // New Scope
  const scope = new OutputScope(name);
  // Recurse in module content
  for (const astStatement of ast.statements) {
    writeStatement(module, scope, astStatement);
  }
  // Done
  module.pushScope(scope);
}
