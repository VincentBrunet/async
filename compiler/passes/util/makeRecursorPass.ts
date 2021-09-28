import { recurseAnnotationTemplate } from "./recurseAnnotationTemplate.ts";
import { recurseAnnotationType } from "./recurseAnnotationType.ts";
import { recurseBlock } from "./recurseBlock.ts";
import { recurseExpression } from "./recurseExpression.ts";
import { recurseExpressionBinary } from "./recurseExpressionBinary.ts";
import { recurseExpressionCall } from "./recurseExpressionCall.ts";
import { recurseExpressionFunction } from "./recurseExpressionFunction.ts";
import { recurseExpressionIdentifier } from "./recurseExpressionIdentifier.ts";
import { recurseExpressionImport } from "./recurseExpressionImport.ts";
import { recurseExpressionLiteral } from "./recurseExpressionLiteral.ts";
import { recurseExpressionLookup } from "./recurseExpressionLookup.ts";
import { recurseExpressionObject } from "./recurseExpressionObject.ts";
import { recurseExpressionParenthesis } from "./recurseExpressionParenthesis.ts";
import { recurseExpressionRun } from "./recurseExpressionRun.ts";
import { recurseExpressionTyping } from "./recurseExpressionTyping.ts";
import { recurseExpressionUnary } from "./recurseExpressionUnary.ts";
import { recurseModule } from "./recurseModule.ts";
import { recurseStatement } from "./recurseStatement.ts";
import { recurseStatementCondition } from "./recurseStatementCondition.ts";
import { recurseStatementConditionBranch } from "./recurseStatementConditionBranch.ts";
import { recurseStatementEmpty } from "./recurseStatementEmpty.ts";
import { recurseStatementExpression } from "./recurseStatementExpression.ts";
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
import { recurseTypePrimitive } from "./recurseTypePrimitive.ts";
import { RecursorLogic } from "./RecursorLogic.ts";
import { RecursorPass } from "./RecursorPass.ts";

type RecursorPassHolder<Scope> = {
  value?: RecursorPass<Scope>;
};

type RecursorNextFunction<Scope, Ast> = (
  pass: RecursorPass<Scope>,
  scope: Scope,
  ast: Ast,
) => void;

type RecursorPassFunction<Scope, Ast> = (
  scope: Scope,
  ast: Ast,
) => void;

type RecursorLogicFunction<Scope, Ast> = (
  scope: Scope,
  ast: Ast,
  next: () => void,
) => void;

/**
 * Make a recursion pass function:
 *  - deepen the scope
 *  - call the standard recursion logic that will call custom logic
 */
function makeRecursion<Scope, Ast>(
  deeper: (parent: Scope) => Scope,
  pass: RecursorPassHolder<Scope>,
  call: RecursorNextFunction<Scope, Ast>,
): RecursorPassFunction<Scope, Ast> {
  return (scope, ast) => {
    const child = deeper(scope);
    call(pass.value!, child, ast);
  };
}

/**
 * Make a logic pass function:
 *  - no-op and go back to standard if undefined
 *  - if defined, call logic with recursion call as parameter
 */
function makeLogic<Scope, Ast>(
  recurse: RecursorPassFunction<Scope, Ast>,
  logic?: RecursorLogicFunction<Scope, Ast>,
): RecursorPassFunction<Scope, Ast> {
  return (scope, ast) => {
    if (logic) {
      logic(scope, ast, () => {
        recurse(scope, ast);
      });
    } else {
      recurse(scope, ast);
    }
  };
}

export function makeRecursorPass<Scope>(
  s: (parent: Scope) => Scope,
  logic: RecursorLogic<Scope>,
): RecursorPass<Scope> {
  // Pass with standard recursion
  let passRecurse: RecursorPassHolder<Scope> = {};
  // Pass with custom logic
  let passLogic: RecursorPassHolder<Scope> = {};

  passRecurse.value = {
    recurseModule: makeRecursion(
      s,
      passLogic,
      recurseModule,
    ),

    recurseBlock: makeRecursion(
      s,
      passLogic,
      recurseBlock,
    ),

    recurseExpression: makeRecursion(
      s,
      passLogic,
      recurseExpression,
    ),
    recurseExpressionImport: makeRecursion(
      s,
      passLogic,
      recurseExpressionImport,
    ),
    recurseExpressionCall: makeRecursion(
      s,
      passLogic,
      recurseExpressionCall,
    ),
    recurseExpressionIdentifier: makeRecursion(
      s,
      passLogic,
      recurseExpressionIdentifier,
    ),
    recurseExpressionFunction: makeRecursion(
      s,
      passLogic,
      recurseExpressionFunction,
    ),
    recurseExpressionObject: makeRecursion(
      s,
      passLogic,
      recurseExpressionObject,
    ),
    recurseExpressionRun: makeRecursion(
      s,
      passLogic,
      recurseExpressionRun,
    ),
    recurseExpressionLookup: makeRecursion(
      s,
      passLogic,
      recurseExpressionLookup,
    ),
    recurseExpressionLiteral: makeRecursion(
      s,
      passLogic,
      recurseExpressionLiteral,
    ),
    recurseExpressionUnary: makeRecursion(
      s,
      passLogic,
      recurseExpressionUnary,
    ),
    recurseExpressionBinary: makeRecursion(
      s,
      passLogic,
      recurseExpressionBinary,
    ),
    recurseExpressionTyping: makeRecursion(
      s,
      passLogic,
      recurseExpressionTyping,
    ),
    recurseExpressionParenthesis: makeRecursion(
      s,
      passLogic,
      recurseExpressionParenthesis,
    ),

    recurseAnnotationType: makeRecursion(
      s,
      passLogic,
      recurseAnnotationType,
    ),
    recurseAnnotationTemplate: makeRecursion(
      s,
      passLogic,
      recurseAnnotationTemplate,
    ),

    recurseType: makeRecursion(
      s,
      passLogic,
      recurseType,
    ),
    recurseTypeIdentifier: makeRecursion(
      s,
      passLogic,
      recurseTypeIdentifier,
    ),
    recurseTypePrimitive: makeRecursion(
      s,
      passLogic,
      recurseTypePrimitive,
    ),
    recurseTypeBinary: makeRecursion(
      s,
      passLogic,
      recurseTypeBinary,
    ),
    recurseTypeFunction: makeRecursion(
      s,
      passLogic,
      recurseTypeFunction,
    ),
    recurseTypeObject: makeRecursion(
      s,
      passLogic,
      recurseTypeObject,
    ),

    recurseStatement: makeRecursion(
      s,
      passLogic,
      recurseStatement,
    ),
    recurseStatementVariable: makeRecursion(
      s,
      passLogic,
      recurseStatementVariable,
    ),
    recurseStatementTypedef: makeRecursion(
      s,
      passLogic,
      recurseStatementTypedef,
    ),
    recurseStatementWhile: makeRecursion(
      s,
      passLogic,
      recurseStatementWhile,
    ),
    recurseStatementCondition: makeRecursion(
      s,
      passLogic,
      recurseStatementCondition,
    ),
    recurseStatementConditionBranch: makeRecursion(
      s,
      passLogic,
      recurseStatementConditionBranch,
    ),
    recurseStatementReturn: makeRecursion(
      s,
      passLogic,
      recurseStatementReturn,
    ),
    recurseStatementUnsafe: makeRecursion(
      s,
      passLogic,
      recurseStatementUnsafe,
    ),
    recurseStatementExpression: makeRecursion(
      s,
      passLogic,
      recurseStatementExpression,
    ),
    recurseStatementEmpty: makeRecursion(
      s,
      passLogic,
      recurseStatementEmpty,
    ),
  };

  passLogic.value = {
    recurseModule: makeLogic(
      passRecurse.value.recurseModule,
      logic.recurseModule,
    ),

    recurseBlock: makeLogic(
      passRecurse.value.recurseBlock,
      logic.recurseBlock,
    ),

    recurseExpression: makeLogic(
      passRecurse.value.recurseExpression,
      logic.recurseExpression,
    ),
    recurseExpressionImport: makeLogic(
      passRecurse.value.recurseExpressionImport,
      logic.recurseExpressionImport,
    ),
    recurseExpressionCall: makeLogic(
      passRecurse.value.recurseExpressionCall,
      logic.recurseExpressionCall,
    ),
    recurseExpressionIdentifier: makeLogic(
      passRecurse.value.recurseExpressionIdentifier,
      logic.recurseExpressionIdentifier,
    ),
    recurseExpressionFunction: makeLogic(
      passRecurse.value.recurseExpressionFunction,
      logic.recurseExpressionFunction,
    ),
    recurseExpressionObject: makeLogic(
      passRecurse.value.recurseExpressionObject,
      logic.recurseExpressionObject,
    ),
    recurseExpressionRun: makeLogic(
      passRecurse.value.recurseExpressionRun,
      logic.recurseExpressionRun,
    ),
    recurseExpressionLookup: makeLogic(
      passRecurse.value.recurseExpressionLookup,
      logic.recurseExpressionLookup,
    ),
    recurseExpressionLiteral: makeLogic(
      passRecurse.value.recurseExpressionLiteral,
      logic.recurseExpressionLiteral,
    ),
    recurseExpressionUnary: makeLogic(
      passRecurse.value.recurseExpressionUnary,
      logic.recurseExpressionUnary,
    ),
    recurseExpressionBinary: makeLogic(
      passRecurse.value.recurseExpressionBinary,
      logic.recurseExpressionBinary,
    ),
    recurseExpressionTyping: makeLogic(
      passRecurse.value.recurseExpressionTyping,
      logic.recurseExpressionTyping,
    ),
    recurseExpressionParenthesis: makeLogic(
      passRecurse.value.recurseExpressionParenthesis,
      logic.recurseExpressionParenthesis,
    ),

    recurseAnnotationType: makeLogic(
      passRecurse.value.recurseAnnotationType,
      logic.recurseAnnotationType,
    ),
    recurseAnnotationTemplate: makeLogic(
      passRecurse.value.recurseAnnotationTemplate,
      logic.recurseAnnotationTemplate,
    ),

    recurseType: makeLogic(
      passRecurse.value.recurseType,
      logic.recurseType,
    ),
    recurseTypeIdentifier: makeLogic(
      passRecurse.value.recurseTypeIdentifier,
      logic.recurseTypeIdentifier,
    ),
    recurseTypePrimitive: makeLogic(
      passRecurse.value.recurseTypePrimitive,
      logic.recurseTypePrimitive,
    ),
    recurseTypeBinary: makeLogic(
      passRecurse.value.recurseTypeBinary,
      logic.recurseTypeBinary,
    ),
    recurseTypeFunction: makeLogic(
      passRecurse.value.recurseTypeFunction,
      logic.recurseTypeFunction,
    ),
    recurseTypeObject: makeLogic(
      passRecurse.value.recurseTypeObject,
      logic.recurseTypeObject,
    ),

    recurseStatement: makeLogic(
      passRecurse.value.recurseStatement,
      logic.recurseStatement,
    ),
    recurseStatementVariable: makeLogic(
      passRecurse.value.recurseStatementVariable,
      logic.recurseStatementVariable,
    ),
    recurseStatementTypedef: makeLogic(
      passRecurse.value.recurseStatementTypedef,
      logic.recurseStatementTypedef,
    ),
    recurseStatementWhile: makeLogic(
      passRecurse.value.recurseStatementWhile,
      logic.recurseStatementWhile,
    ),
    recurseStatementCondition: makeLogic(
      passRecurse.value.recurseStatementCondition,
      logic.recurseStatementCondition,
    ),
    recurseStatementConditionBranch: makeLogic(
      passRecurse.value.recurseStatementConditionBranch,
      logic.recurseStatementConditionBranch,
    ),
    recurseStatementReturn: makeLogic(
      passRecurse.value.recurseStatementReturn,
      logic.recurseStatementReturn,
    ),
    recurseStatementUnsafe: makeLogic(
      passRecurse.value.recurseStatementUnsafe,
      logic.recurseStatementUnsafe,
    ),
    recurseStatementExpression: makeLogic(
      passRecurse.value.recurseStatementExpression,
      logic.recurseStatementExpression,
    ),
    recurseStatementEmpty: makeLogic(
      passRecurse.value.recurseStatementEmpty,
      logic.recurseStatementEmpty,
    ),
  };

  return passLogic.value;
}
