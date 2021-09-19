import { AstRecursor } from "./AstRecursor.ts";
import { recurseAnnotation } from "./recurseAnnotation.ts";
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
import { recurseExpressionTyping } from "./recurseExpressionTyping.ts";
import { recurseExpressionUnary } from "./recurseExpressionUnary.ts";
import { recurseModule } from "./recurseModule.ts";
import { recurseStatement } from "./recurseStatement.ts";
import { recurseStatementExpression } from "./recurseStatementExpression.ts";
import { recurseStatementReturn } from "./recurseStatementReturn.ts";
import { recurseStatementTypedef } from "./recurseStatementTypedef.ts";
import { recurseStatementVariable } from "./recurseStatementVariable.ts";
import { recurseStatementWhile } from "./recurseStatementWhile.ts";
import { recurseType } from "./recurseType.ts";
import { recurseTypeBinary } from "./recurseTypeBinary.ts";
import { recurseTypeFunction } from "./recurseTypeFunction.ts";
import { recurseTypeIdentifier } from "./recurseTypeIdentifier.ts";
import { recurseTypeObject } from "./recurseTypeObject.ts";

export function makeRecursor<Param>(
  partial: Partial<AstRecursor<Param>>,
): AstRecursor<Param> {
  return {
    recurseModule: partial.recurseModule ?? recurseModule,
    recurseBlock: partial.recurseBlock ?? recurseBlock,

    recurseExpression: partial.recurseExpression ?? recurseExpression,
    recurseExpressionIdentifier: partial.recurseExpressionIdentifier ??
      recurseExpressionIdentifier,
    recurseExpressionFunction: partial.recurseExpressionFunction ??
      recurseExpressionFunction,
    recurseExpressionObject: partial.recurseExpressionObject ??
      recurseExpressionObject,
    recurseExpressionRun: partial.recurseExpressionRun ?? recurseExpressionRun,
    recurseExpressionLookup: partial.recurseExpressionLookup ??
      recurseExpressionLookup,
    recurseExpressionCall: partial.recurseExpressionCall ??
      recurseExpressionCall,
    recurseExpressionLiteral: partial.recurseExpressionLiteral ??
      recurseExpressionLiteral,
    recurseExpressionUnary: partial.recurseExpressionUnary ??
      recurseExpressionUnary,
    recurseExpressionBinary: partial.recurseExpressionBinary ??
      recurseExpressionBinary,
    recurseExpressionTyping: partial.recurseExpressionTyping ??
      recurseExpressionTyping,
    recurseExpressionParenthesis: partial.recurseExpressionParenthesis ??
      recurseExpressionParenthesis,

    recurseAnnotation: partial.recurseAnnotation ?? recurseAnnotation,

    recurseType: partial.recurseType ?? recurseType,
    recurseTypeIdentifier: partial.recurseTypeIdentifier ??
      recurseTypeIdentifier,
    recurseTypeBinary: partial.recurseTypeBinary ??
      recurseTypeBinary,
    recurseTypeFunction: partial.recurseTypeFunction ??
      recurseTypeFunction,
    recurseTypeObject: partial.recurseTypeObject ??
      recurseTypeObject,

    recurseStatement: partial.recurseStatement ?? recurseStatement,
    recurseStatementVariable: partial.recurseStatementVariable ??
      recurseStatementVariable,
    recurseStatementTypedef: partial.recurseStatementTypedef ??
      recurseStatementTypedef,
    recurseStatementWhile: partial.recurseStatementWhile ??
      recurseStatementWhile,
    recurseStatementReturn: partial.recurseStatementReturn ??
      recurseStatementReturn,
    recurseStatementExpression: partial.recurseStatementExpression ??
      recurseStatementExpression,
  };
}
