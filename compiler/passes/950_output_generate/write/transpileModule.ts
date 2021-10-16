import { AstModule } from "../../../data/ast/AstModule.ts";
import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { hashAstKey } from "../../../lib/hash/hashAstKey.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export async function transpileModule(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstModule,
) {
  // Asserts
  const resolvedExports = ensure(ast.resolvedExports);
  const resolvedVariables = ensure(ast.resolvedVariables);

  // New Function
  transpiler.pushFunction("t_ref **", hashAstKey(ast, ast, "module"), []);

  // Setup variables
  for (const resolvedVariable of resolvedVariables) {
    transpiler.pushStatement([
      "t_ref *",
      "__",
      resolvedVariable.name,
      " = ",
      "ref_make(NULL)",
    ]);
  }

  // Recurse in module content
  for (const astStatement of ast.statements) {
    await pass.recurseStatement(transpiler, astStatement);
  }

  // We simply return the module
  const callLength = resolvedExports.length.toString();
  const callVariadic = resolvedExports.length > 9;
  const done = new Array<string>();
  done.push("return ");
  done.push("module_make_");
  if (callVariadic) {
    done.push("x");
  } else {
    done.push(callLength);
  }
  done.push("(");
  for (const resolvedExport of resolvedExports) {
    const resolvedVariable = resolvedExport.statement
      .data as AstStatementVariable; // TODO - should be checked
    done.push("__");
    done.push(resolvedVariable.name);
  }
  done.push(")");
  transpiler.pushStatement(done);
}
