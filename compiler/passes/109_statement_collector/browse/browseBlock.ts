import { AstBlock } from "../../../data/ast/AstBlock.ts";
import { Scope } from "../util/Scope.ts";

export async function browseBlock(
  scope: Scope,
  ast: AstBlock,
  next: () => Promise<void>,
) {
  scope.markCollectorStatementVariable();

  await next();

  ast.resolvedVariables = scope.getStatementVariables();
}
