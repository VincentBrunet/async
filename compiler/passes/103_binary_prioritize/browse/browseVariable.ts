import { AstVariable } from "../../../data/ast/AstVariable.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseExpression } from "./browseExpression.ts";

export function browseVariable(
  scope: BrowsedScope,
  astVariable: AstVariable,
) {
  if (astVariable.value) {
    browseExpression(scope, astVariable.value);
  }
}