import { AstStatement } from "../../../data/ast/AstStatement.ts";
import { switchOnStatement } from "../../../data/ast/util/switchOnStatement.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseExpression } from "./browseExpression.ts";
import { browseVariable } from "./browseVariable.ts";
import { browseWhile } from "./browseWhile.ts";

const mapping = {
  caseVariable: browseVariable,
  caseWhile: browseWhile,
  caseExpression: browseExpression,
};

export function browseStatement(
  scope: BrowsedScope,
  astStatement: AstStatement,
) {
  switchOnStatement(astStatement, scope, mapping);
}
