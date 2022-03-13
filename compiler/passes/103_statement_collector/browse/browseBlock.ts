import { AstBlock } from "../../../data/ast/AstBlock.ts";
import { Scope } from "../util/Scope.ts";

export function browseBlock(
  scope: Scope,
  ast: AstBlock,
  next: () => void,
) {
  scope.markCollectorStatementVariable();
  next();
  ast.resolvedVariables = scope.getStatementVariables();
}
