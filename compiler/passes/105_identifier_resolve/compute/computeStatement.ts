import { AstStatement } from "../../../data/ast/AstStatement.ts";
import { ResolveScope } from "../util/ResolveScope.ts";
import { computeExpression } from "./computeExpression.ts";
import { computeVariable } from "./computeVariable.ts";

export function computeStatement(
  scope: ResolveScope,
  astStatement: AstStatement,
) {
  if (astStatement.variable) {
    computeVariable(scope, astStatement.variable);
  }
  if (astStatement.expression) {
    computeExpression(scope, astStatement.expression);
  }
}
