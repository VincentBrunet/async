import { AstRecursor } from "./AstRecursor.ts";
import { recurseBlock } from "./recurseBlock.ts";
import { recurseExpression } from "./recurseExpression.ts";
import { recurseExpressionBinary } from "./recurseExpressionBinary.ts";
import { recurseExpressionCall } from "./recurseExpressionCall.ts";
import { recurseExpressionFunction } from "./recurseExpressionFunction.ts";
import { recurseExpressionIdentifier } from "./recurseExpressionIdentifier.ts";
import { recurseExpressionLiteral } from "./recurseExpressionLiteral.ts";
import { recurseExpressionLookup } from "./recurseExpressionLookup.ts";
import { recurseExpressionObject } from "./recurseExpressionObject.ts";
import { recurseExpressionParenthesis } from "./recurseExpressionParenthesis.ts";
import { recurseExpressionRun } from "./recurseExpressionRun.ts";
import { recurseExpressionUnary } from "./recurseExpressionUnary.ts";
import { recurseModule } from "./recurseModule.ts";
import { recurseStatement } from "./recurseStatement.ts";
import { recurseVariable } from "./recurseVariable.ts";
import { recurseWhile } from "./recurseWhile.ts";

export function makeRecursor<Param>(
  partial: Partial<AstRecursor<Param>>,
): AstRecursor<Param> {
  return {
    recurseExpression: partial.recurseExpression ?? recurseExpression,
    recurseExpressionIdentifier: partial.recurseExpressionIdentifier ??
      recurseExpressionIdentifier,
    recurseExpressionBinary: partial.recurseExpressionBinary ??
      recurseExpressionBinary,
    recurseExpressionUnary: partial.recurseExpressionUnary ??
      recurseExpressionUnary,
    recurseExpressionFunction: partial.recurseExpressionFunction ??
      recurseExpressionFunction,
    recurseExpressionObject: partial.recurseExpressionObject ??
      recurseExpressionObject,
    recurseExpressionRun: partial.recurseExpressionRun ?? recurseExpressionRun,
    recurseExpressionParenthesis: partial.recurseExpressionParenthesis ??
      recurseExpressionParenthesis,
    recurseExpressionLookup: partial.recurseExpressionLookup ??
      recurseExpressionLookup,
    recurseExpressionCall: partial.recurseExpressionCall ??
      recurseExpressionCall,
    recurseExpressionLiteral: partial.recurseExpressionLiteral ??
      recurseExpressionLiteral,
    recurseModule: partial.recurseModule ?? recurseModule,
    recurseBlock: partial.recurseBlock ?? recurseBlock,
    recurseStatement: partial.recurseStatement ?? recurseStatement,
    recurseVariable: partial.recurseVariable ?? recurseVariable,
    recurseWhile: partial.recurseWhile ?? recurseWhile,
  };
}
