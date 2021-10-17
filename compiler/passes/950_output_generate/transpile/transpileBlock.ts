import { AstBlock } from "../../../data/ast/AstBlock.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export async function transpileBlock(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstBlock,
) {
  // Asserts
  const resolvedVariables = ensure(ast.resolvedVariables);

  // Open block
  transpiler.pushBlock();

  // Setup local variables
  for (const variable of resolvedVariables) {
    transpiler.pushStatement([
      "t_ref *",
      "_variable_",
      variable.name,
      " = ",
      "ref_make(NULL)",
    ]);
  }

  // Recurse on statements
  for (const statement of ast.statements) {
    await pass.recurseStatement(transpiler, statement);
  }

  // Close block
  transpiler.popBlock();
}
