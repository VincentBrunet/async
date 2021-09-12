import { AstStatement } from "../../../data/ast/AstStatement.ts";
import { doBrowseStatement } from "../../../data/ast/util/doBrowseStatement.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseExpression } from "./browseExpression.ts";
import { browseVariable } from "./browseVariable.ts";
import { browseWhile } from "./browseWhile.ts";

const browser = {
  browseVariable: browseVariable,
  browseWhile: browseWhile,
  browseExpression: browseExpression,
};

export function browseStatement(
  scope: BrowsedScope,
  astStatement: AstStatement,
) {
  doBrowseStatement(astStatement, scope, browser);
}
