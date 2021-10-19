import { recurseAnnotationTemplate } from "./recurseAnnotationTemplate.ts";
import { recurseAnnotationType } from "./recurseAnnotationType.ts";
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
import { recurseStatementBlock } from "./recurseStatementBlock.ts";
import { recurseStatementCondition } from "./recurseStatementCondition.ts";
import { recurseStatementConditionBranch } from "./recurseStatementConditionBranch.ts";
import { recurseStatementEmpty } from "./recurseStatementEmpty.ts";
import { recurseStatementExport } from "./recurseStatementExport.ts";
import { recurseStatementExpression } from "./recurseStatementExpression.ts";
import { recurseStatementImport } from "./recurseStatementImport.ts";
import { recurseStatementReturn } from "./recurseStatementReturn.ts";
import { recurseStatementTypedef } from "./recurseStatementTypedef.ts";
import { recurseStatementUnsafe } from "./recurseStatementUnsafe.ts";
import { recurseStatementVariable } from "./recurseStatementVariable.ts";
import { recurseStatementWhile } from "./recurseStatementWhile.ts";
import { recurseType } from "./recurseType.ts";
import { recurseTypeBinary } from "./recurseTypeBinary.ts";
import { recurseTypeFunction } from "./recurseTypeFunction.ts";
import { recurseTypeIdentifier } from "./recurseTypeIdentifier.ts";
import { recurseTypeObject } from "./recurseTypeObject.ts";
import { recurseTypeParenthesis } from "./recurseTypeParenthesis.ts";
import { recurseTypePrimitive } from "./recurseTypePrimitive.ts";
import { RecursorPass } from "./RecursorPass.ts";
import { RecursorSimplified } from "./RecursorSimplified.ts";

type RecursorPassHolder<Scope> = {
  value?: RecursorPass<Scope>;
};

type RecursorAdvancedFunction<Scope, Ast> = (
  pass: RecursorPass<Scope>,
  scope: Scope,
  ast: Ast,
) => Promise<void>;

type RecursorSimplifiedFunction<Scope, Ast> = (
  scope: Scope,
  ast: Ast,
  next: () => Promise<void>,
) => Promise<void>;

type RecursorPassFunction<Scope, Ast> = (
  scope: Scope,
  ast: Ast,
) => Promise<void>;

/**
 * Make a recursion pass function:
 *  - deepen the scope
 *  - call the standard recursion logic that will call custom logic
 */
function makePassFromStandardAdvanced<Scope, Ast>(
  scoper: (parent: Scope) => Scope,
  holderPassFromCustomSimplified: RecursorPassHolder<Scope>,
  standardAdvanced: RecursorAdvancedFunction<Scope, Ast>,
): RecursorPassFunction<Scope, Ast> {
  return async (scope, ast) => {
    const child = scoper(scope);
    await standardAdvanced(holderPassFromCustomSimplified.value!, child, ast);
  };
}

/**
 * Make a logic pass function:
 *  - no-op and go back to standard if undefined
 *  - if defined, call logic with recursion call as parameter
 */
function makePassFromCustomSimplified<Scope, Ast>(
  passFromStandardAdvanced: RecursorPassFunction<Scope, Ast>,
  customSimplified?: RecursorSimplifiedFunction<Scope, Ast>,
): RecursorPassFunction<Scope, Ast> {
  return async (scope, ast) => {
    if (customSimplified) {
      await customSimplified(scope, ast, async () => {
        await passFromStandardAdvanced(scope, ast);
      });
    } else {
      await passFromStandardAdvanced(scope, ast);
    }
  };
}

export function makeRecursorPassSimplified<Scope>(
  scoper: (parent: Scope) => Scope,
  customSimplified: RecursorSimplified<Scope>,
): RecursorPass<Scope> {
  let holderPassFromCustomSimplified: RecursorPassHolder<Scope> = {};

  const passFromStandardAdvanced: RecursorPass<Scope> = {
    recurseModule: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseModule,
    ),
    recurseBlock: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseBlock,
    ),

    recurseExpression: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseExpression,
    ),
    recurseExpressionCall: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseExpressionCall,
    ),
    recurseExpressionIdentifier: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseExpressionIdentifier,
    ),
    recurseExpressionFunction: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseExpressionFunction,
    ),
    recurseExpressionObject: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseExpressionObject,
    ),
    recurseExpressionRun: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseExpressionRun,
    ),
    recurseExpressionLookup: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseExpressionLookup,
    ),
    recurseExpressionLiteral: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseExpressionLiteral,
    ),
    recurseExpressionUnary: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseExpressionUnary,
    ),
    recurseExpressionBinary: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseExpressionBinary,
    ),
    recurseExpressionTyping: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseExpressionTyping,
    ),
    recurseExpressionParenthesis: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseExpressionParenthesis,
    ),

    recurseAnnotationType: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseAnnotationType,
    ),
    recurseAnnotationTemplate: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseAnnotationTemplate,
    ),

    recurseType: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseType,
    ),
    recurseTypeParenthesis: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseTypeParenthesis,
    ),
    recurseTypeIdentifier: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseTypeIdentifier,
    ),
    recurseTypePrimitive: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseTypePrimitive,
    ),
    recurseTypeBinary: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseTypeBinary,
    ),
    recurseTypeFunction: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseTypeFunction,
    ),
    recurseTypeObject: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseTypeObject,
    ),

    recurseStatement: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseStatement,
    ),
    recurseStatementImport: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseStatementImport,
    ),
    recurseStatementExport: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseStatementExport,
    ),
    recurseStatementVariable: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseStatementVariable,
    ),
    recurseStatementTypedef: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseStatementTypedef,
    ),
    recurseStatementBlock: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseStatementBlock,
    ),
    recurseStatementWhile: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseStatementWhile,
    ),
    recurseStatementCondition: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseStatementCondition,
    ),
    recurseStatementConditionBranch: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseStatementConditionBranch,
    ),
    recurseStatementReturn: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseStatementReturn,
    ),
    recurseStatementUnsafe: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseStatementUnsafe,
    ),
    recurseStatementExpression: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseStatementExpression,
    ),
    recurseStatementEmpty: makePassFromStandardAdvanced(
      scoper,
      holderPassFromCustomSimplified,
      recurseStatementEmpty,
    ),
  };

  holderPassFromCustomSimplified.value = {
    recurseModule: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseModule,
      customSimplified.recurseModule,
    ),
    recurseBlock: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseBlock,
      customSimplified.recurseBlock,
    ),

    recurseExpression: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseExpression,
      customSimplified.recurseExpression,
    ),
    recurseExpressionCall: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseExpressionCall,
      customSimplified.recurseExpressionCall,
    ),
    recurseExpressionIdentifier: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseExpressionIdentifier,
      customSimplified.recurseExpressionIdentifier,
    ),
    recurseExpressionFunction: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseExpressionFunction,
      customSimplified.recurseExpressionFunction,
    ),
    recurseExpressionObject: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseExpressionObject,
      customSimplified.recurseExpressionObject,
    ),
    recurseExpressionRun: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseExpressionRun,
      customSimplified.recurseExpressionRun,
    ),
    recurseExpressionLookup: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseExpressionLookup,
      customSimplified.recurseExpressionLookup,
    ),
    recurseExpressionLiteral: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseExpressionLiteral,
      customSimplified.recurseExpressionLiteral,
    ),
    recurseExpressionUnary: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseExpressionUnary,
      customSimplified.recurseExpressionUnary,
    ),
    recurseExpressionBinary: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseExpressionBinary,
      customSimplified.recurseExpressionBinary,
    ),
    recurseExpressionTyping: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseExpressionTyping,
      customSimplified.recurseExpressionTyping,
    ),
    recurseExpressionParenthesis: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseExpressionParenthesis,
      customSimplified.recurseExpressionParenthesis,
    ),

    recurseAnnotationType: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseAnnotationType,
      customSimplified.recurseAnnotationType,
    ),
    recurseAnnotationTemplate: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseAnnotationTemplate,
      customSimplified.recurseAnnotationTemplate,
    ),

    recurseType: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseType,
      customSimplified.recurseType,
    ),
    recurseTypeParenthesis: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseTypeParenthesis,
      customSimplified.recurseTypeParenthesis,
    ),
    recurseTypeIdentifier: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseTypeIdentifier,
      customSimplified.recurseTypeIdentifier,
    ),
    recurseTypePrimitive: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseTypePrimitive,
      customSimplified.recurseTypePrimitive,
    ),
    recurseTypeBinary: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseTypeBinary,
      customSimplified.recurseTypeBinary,
    ),
    recurseTypeFunction: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseTypeFunction,
      customSimplified.recurseTypeFunction,
    ),
    recurseTypeObject: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseTypeObject,
      customSimplified.recurseTypeObject,
    ),

    recurseStatement: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseStatement,
      customSimplified.recurseStatement,
    ),
    recurseStatementImport: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseStatementImport,
      customSimplified.recurseStatementImport,
    ),
    recurseStatementExport: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseStatementExport,
      customSimplified.recurseStatementExport,
    ),
    recurseStatementVariable: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseStatementVariable,
      customSimplified.recurseStatementVariable,
    ),
    recurseStatementTypedef: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseStatementTypedef,
      customSimplified.recurseStatementTypedef,
    ),
    recurseStatementBlock: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseStatementBlock,
      customSimplified.recurseStatementBlock,
    ),
    recurseStatementWhile: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseStatementWhile,
      customSimplified.recurseStatementWhile,
    ),
    recurseStatementCondition: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseStatementCondition,
      customSimplified.recurseStatementCondition,
    ),
    recurseStatementConditionBranch: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseStatementConditionBranch,
      customSimplified.recurseStatementConditionBranch,
    ),
    recurseStatementReturn: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseStatementReturn,
      customSimplified.recurseStatementReturn,
    ),
    recurseStatementUnsafe: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseStatementUnsafe,
      customSimplified.recurseStatementUnsafe,
    ),
    recurseStatementExpression: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseStatementExpression,
      customSimplified.recurseStatementExpression,
    ),
    recurseStatementEmpty: makePassFromCustomSimplified(
      passFromStandardAdvanced.recurseStatementEmpty,
      customSimplified.recurseStatementEmpty,
    ),
  };

  return holderPassFromCustomSimplified.value;
}
