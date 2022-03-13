import { AstStatementReturn } from "../../../data/ast/AstStatementReturn.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export function transpileStatementReturn(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstStatementReturn,
) {
  transpiler.pushStatement(["return", " "]);
  pass.recurseExpression(transpiler, ast.value);
}
