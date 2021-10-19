import { AstModule } from "../../data/ast/AstModule.ts";
import { makeRecursorPassSimplified } from "../util/makeRecursorPassSimplified.ts";
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
import { browseStatementExport } from "./browse/browseStatementExport.ts";
import { browseStatementImport } from "./browse/browseStatementImport.ts";
import { browseStatementReturn } from "./browse/browseStatementReturn.ts";
import { browseStatementVariable } from "./browse/browseStatementVariable.ts";
import { Scope } from "./util/Scope.ts";

const pass = makeRecursorPassSimplified<Scope>((scope) => {
  return new Scope(scope);
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
  recurseStatementImport: browseStatementImport,
  recurseStatementExport: browseStatementExport,
  recurseStatementReturn: browseStatementReturn,
  recurseStatementVariable: browseStatementVariable,
});

export async function passTypeInferenceUpward(ast: AstModule) {
  await pass.recurseModule(new Scope(), ast);
}
