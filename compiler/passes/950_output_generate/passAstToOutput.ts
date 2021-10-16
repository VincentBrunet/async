import { AstModule } from "../../data/ast/AstModule.ts";
import { makeRecursorPassAdvanced } from "../util/makeRecursorPassAdvanced.ts";
import { transpileModule } from "./transpile/transpileModule.ts";
import { Transpiler } from "./util/Transpiler.ts";
import { transpileExpressionBinary } from "./write/transpileExpressionBinary.ts";
import { transpileExpressionCall } from "./write/transpileExpressionCall.ts";
import { transpileExpressionFunction } from "./write/transpileExpressionFunction.ts";
import { transpileExpressionIdentifier } from "./write/transpileExpressionIdentifier.ts";
import { transpileExpressionLiteral } from "./write/transpileExpressionLiteral.ts";
import { transpileExpressionObject } from "./write/transpileExpressionObject.ts";
import { transpileExpressionParenthesis } from "./write/transpileExpressionParenthesis.ts";
import { transpileExpressionRun } from "./write/transpileExpressionRun.ts";
import { transpileExpressionTyping } from "./write/transpileExpressionTyping.ts";
import { transpileExpressionUnary } from "./write/transpileExpressionUnary.ts";
import { transpileStatementConditionBranch } from "./write/transpileStatementConditionBranch.ts";
import { transpileStatementExport } from "./write/transpileStatementExport.ts";
import { transpileStatementExpression } from "./write/transpileStatementExpression.ts";
import { transpileStatementReturn } from "./write/transpileStatementReturn.ts";
import { transpileStatementUnsafe } from "./write/transpileStatementUnsafe.ts";
import { transpileStatementVariable } from "./write/transpileStatementVariable.ts";
import { transpileStatementWhile } from "./write/transpileStatementWhile.ts";

const pass = makeRecursorPassAdvanced((no) => no, {
  recurseModule: transpileModule,
  recurseExpressionBinary: transpileExpressionBinary,
  recurseExpressionCall: transpileExpressionCall,
  recurseExpressionFunction: transpileExpressionFunction,
  recurseExpressionIdentifier: transpileExpressionIdentifier,
  recurseExpressionLiteral: transpileExpressionLiteral,
  recurseExpressionLookup: transpileExpressionLookup,
  recurseExpressionObject: transpileExpressionObject,
  recurseExpressionParenthesis: transpileExpressionParenthesis,
  recurseExpressionRun: transpileExpressionRun,
  recurseExpressionTyping: transpileExpressionTyping,
  recurseExpressionUnary: transpileExpressionUnary,
  recurseStatementConditionBranch: transpileStatementConditionBranch,
  recurseStatementExport: transpileStatementExport,
  recurseStatementExpression: transpileStatementExpression,
  recurseStatementReturn: transpileStatementReturn,
  recurseStatementUnsafe: transpileStatementUnsafe,
  recurseStatementVariable: transpileStatementVariable,
  recurseStatementWhile: transpileStatementWhile,
});

export async function passAstToOutput(
  ast: AstModule,
) {
  const transpiler = new Transpiler(ast);
  await pass.recurseModule(transpiler, ast);
  return transpiler.getOutput();
}
