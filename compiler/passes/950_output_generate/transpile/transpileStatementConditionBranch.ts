import { AstStatementConditionBranch } from "../../../data/ast/AstStatementCondition.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export function transpileStatementConditionBranch(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstStatementConditionBranch,
) {
  // condition
  transpiler.pushStatement(["if (TO_BOOLEAN("]);
  pass.recurseExpression(transpiler, ast.condition);
  transpiler.pushPart("))");
  // content
  pass.recurseBlock(transpiler, ast.block);
}
