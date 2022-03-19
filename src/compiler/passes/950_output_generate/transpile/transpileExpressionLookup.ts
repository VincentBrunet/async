import { AstExpressionLookup } from "../../../data/ast/AstExpressionLookup.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export function transpileExpressionLookup(
  pass: RecursorPass,
  ast: AstExpressionLookup,
  transpiler: Transpiler,
) {
  transpiler.pushStatementPart("object_read(");
  pass.recurseExpression(ast.expression);
  transpiler.pushStatementPart(", ");
  transpiler.pushStatementPart(ast.hash);
  transpiler.pushStatementPart(")->value");
}
