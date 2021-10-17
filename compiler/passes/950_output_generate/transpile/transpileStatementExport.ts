import { AstStatementExport } from "../../../data/ast/AstStatementExport.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export async function transpileStatementExport(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstStatementExport,
) {
  transpiler.pushStatement([
    "_export_",
    ast.name,
    "->value",
    " = ",
  ]);
  await pass.recurseExpression(transpiler, ast.expression);
}
