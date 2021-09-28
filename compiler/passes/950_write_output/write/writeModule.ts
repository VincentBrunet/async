import { AstModule } from "../../../data/ast/AstModule.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { writeStatement } from "./writeStatement.ts";

export function writeModule(module: OutputModule, ast: AstModule) {
  // New Scope
  const scope = new OutputScope("module_load");
  // Recurse in module content
  for (const astStatement of ast.statements) {
    writeStatement(module, scope, astStatement);
  }
  // Done
  module.pushScope(scope);
}
