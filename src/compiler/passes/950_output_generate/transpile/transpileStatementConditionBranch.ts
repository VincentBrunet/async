import { AstStatementConditionBranch } from "../../../data/ast/AstStatementCondition.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export function transpileStatementConditionBranch(
  pass: RecursorPass,
  ast: AstStatementConditionBranch,
  transpiler: Transpiler,
) {
  // condition
  transpiler.pushStatement(["if (TO_BOOLEAN("]);
  pass.recurseExpression(ast.condition);
  transpiler.pushStatementPart("))");
  // content
  pass.recurseBlock(ast.block);
}
