import { AstStatementExport } from "../../../data/ast/AstStatementExport.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export async function transpileStatementExport(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstStatementExport,
) {
  await pass.recurseStatement(transpiler, ast.statement);
}
