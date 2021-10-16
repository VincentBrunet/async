import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export async function transpileStatementVariable(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstStatementVariable,
) {
  if (ast.value) {
    transpiler.pushStatement([]);
    transpiler.pushPart("__");
    transpiler.pushPart(ast.name);
    transpiler.pushPart("->value");
    transpiler.pushPart(" = ");
    await pass.recurseExpression(transpiler, ast.value);
  }
}
