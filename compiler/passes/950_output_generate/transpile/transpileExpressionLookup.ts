import { AstExpressionLookup } from "../../../data/ast/AstExpressionLookup.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export function transpileExpressionLookup(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstExpressionLookup,
) {
  transpiler.pushPart("object_read(");
  pass.recurseExpression(transpiler, ast.expression);
  transpiler.pushPart(", ");
  transpiler.pushPart(ast.hash);
  transpiler.pushPart(")->value");
}
