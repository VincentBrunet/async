import { AstStatementExport } from "../../../data/ast/AstStatementExport.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export async function transpileStatementExport(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstStatementExport,
) {
  transpiler.pushStatement([]);
  transpiler.pushPart("_export_");
  transpiler.pushPart(ast.name);
  transpiler.pushPart("->value");
  transpiler.pushPart(" = ");
  await pass.recurseExpression(transpiler, ast.expression);
}
