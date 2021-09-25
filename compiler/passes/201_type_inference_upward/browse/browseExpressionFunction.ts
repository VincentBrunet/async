import { AstExpressionFunction } from "../../../data/ast/AstExpressionFunction.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionFunction(
  scope: BrowsedScope,
  ast: AstExpressionFunction,
  next: () => void,
) {
  scope.setFunction(ast);
  next();
  const returns = scope.getStatementReturns();
  //ast.resolvedType = ast.return.type;
}
