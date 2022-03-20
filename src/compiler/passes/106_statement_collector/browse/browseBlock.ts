import { AstBlock } from "../../../data/ast/AstBlock.ts";
import { Scope } from "../util/Scope.ts";

export function browseBlock(
  next: () => void,
  ast: AstBlock,
  scope: Scope,
) {
  scope.markCollectorStatementVariable();
  next();
  ast.resolvedVariables = scope.getStatementVariables();
}
