import { AstModule } from "../../../data/ast/AstModule.ts";
import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { hashAstKey } from "../../../lib/hash/hashAstKey.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeStatement } from "./writeStatement.ts";

export function writeModule(module: OutputModule, ast: AstModule) {
  // Dependencies
  const resolvedExports = ensure(ast.resolvedExports);
  const resolvedVariables = ensure(ast.resolvedVariables);

  // Named with module hash
  const name = hashAstKey(module, ast, "module");

  // New Scope
  const scope = new OutputScope("t_ref **", name);

  // Setup variables
  for (const resolvedVariable of resolvedVariables) {
    const declaration = new OutputStatement();
    declaration.pushPart("t_ref *");
    declaration.pushPart("__");
    declaration.pushPart(resolvedVariable.name);
    declaration.pushPart(" = ");
    declaration.pushPart("ref_make(NULL)");
    scope.pushStatement(OutputOrder.Logic, declaration);
  }

  // Recurse in module content
  for (const astStatement of ast.statements) {
    writeStatement(module, scope, astStatement);
  }

  // We simply return the module
  const callLength = resolvedExports.length.toString();
  const callVariadic = resolvedExports.length > 9;
  const done = new OutputStatement();
  done.pushPart("return ");
  done.pushPart("module_make_");
  if (callVariadic) {
    done.pushPart("x");
  } else {
    done.pushPart(callLength);
  }
  done.pushPart("(");
  for (const resolvedExport of resolvedExports) {
    const resolvedVariable = resolvedExport.statement
      .data as AstStatementVariable; // TODO - should be checked
    done.pushPart("__");
    done.pushPart(resolvedVariable.name);
  }
  done.pushPart(")");
  scope.pushStatement(OutputOrder.Logic, done);

  // Done
  module.pushScope(scope);
}
