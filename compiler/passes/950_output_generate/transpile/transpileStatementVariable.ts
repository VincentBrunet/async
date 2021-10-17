import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export async function transpileStatementVariable(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstStatementVariable,
) {
  if (ast.value) {
    transpiler.pushStatement([
      "_variable_",
      ast.name,
      "->value",
      " = ",
    ]);
    await pass.recurseExpression(transpiler, ast.value);
  }
}
