import { AstModule } from "../../data/ast/AstModule.ts";
import { makeRecursorPass } from "../util/makeRecursorPass.ts";
import { browseExpression } from "./browse/browseExpression.ts";
import { browseExpressionBinary } from "./browse/browseExpressionBinary.ts";
import { browseExpressionCall } from "./browse/browseExpressionCall.ts";
import { browseExpressionFunction } from "./browse/browseExpressionFunction.ts";
import { browseExpressionIdentifier } from "./browse/browseExpressionIdentifier.ts";
import { browseExpressionLiteral } from "./browse/browseExpressionLiteral.ts";
import { browseExpressionObject } from "./browse/browseExpressionObject.ts";
import { browseExpressionParenthesis } from "./browse/browseExpressionParenthesis.ts";
import { browseExpressionRun } from "./browse/browseExpressionRun.ts";
import { browseExpressionUnary } from "./browse/browseExpressionUnary.ts";
import { browseStatementVariable } from "./browse/browseStatementVariable.ts";
import { browseTypeIdentifier } from "./browse/browseTypeIdentifier.ts";
import { BrowsedScope } from "./util/BrowsedScope.ts";

const pass = makeRecursorPass<BrowsedScope>((scope) => {
  return new BrowsedScope(scope);
}, {
  recurseExpression: browseExpression,
  recurseExpressionBinary: browseExpressionBinary,
  recurseExpressionCall: browseExpressionCall,
  recurseExpressionFunction: browseExpressionFunction,
  recurseExpressionObject: browseExpressionObject,
  recurseExpressionRun: browseExpressionRun,
  recurseExpressionLiteral: browseExpressionLiteral,
  recurseExpressionIdentifier: browseExpressionIdentifier,
  recurseExpressionParenthesis: browseExpressionParenthesis,
  recurseExpressionUnary: browseExpressionUnary,
  recurseStatementVariable: browseStatementVariable,
  recurseTypeIdentifier: browseTypeIdentifier,
});

export async function passTypeInferenceUpward(ast: AstModule) {
  await pass.recurseModule(new BrowsedScope(), ast);
}
