import { AstStatement } from "../../../data/ast/AstStatement.ts";
import { browseStatement } from "../../../data/ast/util/browseStatement.ts";
import { ResolveScope } from "../util/ResolveScope.ts";
import { computeExpression } from "./computeExpression.ts";
import { computeVariable } from "./computeVariable.ts";
import { computeWhile } from "./computeWhile.ts";

const browser = {
  browseVariable: computeVariable,
  browseWhile: computeWhile,
  browseExpression: computeExpression,
};

export function computeStatement(
  scope: ResolveScope,
  astStatement: AstStatement,
) {
  browseStatement(astStatement, scope, browser);
}
