import { AstModule } from "../../data/ast/AstModule.ts";
import { makeRecursorPass } from "../util/makeRecursorPass.ts";
import { browseExpression } from "./browse/browseExpression.ts";
import { browseExpressionFunction } from "./browse/browseExpressionFunction.ts";
import { browseExpressionLiteral } from "./browse/browseExpressionLiteral.ts";
import { browseExpressionObject } from "./browse/browseExpressionObject.ts";
import { browseExpressionRun } from "./browse/browseExpressionRun.ts";
import { browseStatementVariable } from "./browse/browseStatementVariable.ts";
import { browseTypeIdentifier } from "./browse/browseTypeIdentifier.ts";
import { BrowsedScope } from "./util/BrowsedScope.ts";

const pass = makeRecursorPass<BrowsedScope>((scope) => {
  return new BrowsedScope(scope);
}, {
  recurseExpression: browseExpression,
  recurseExpressionFunction: browseExpressionFunction,
  recurseExpressionObject: browseExpressionObject,
  recurseExpressionRun: browseExpressionRun,
  recurseExpressionLiteral: browseExpressionLiteral,
  recurseStatementVariable: browseStatementVariable,
  recurseTypeIdentifier: browseTypeIdentifier,
});

export function applyTypeInferenceUpward(astModule: AstModule) {
  pass.recurseModule(new BrowsedScope(), astModule);
}
