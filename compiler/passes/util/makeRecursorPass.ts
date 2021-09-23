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
function fRec<Scope, Ast>(
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
function fLog<Scope, Ast>(
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
  let pass: RecursorPassHolder<Scope> = {};

  passRecurse.value = {
    recurseModule: fRec(s, pass, recurseModule),
    recurseBlock: fRec(s, pass, recurseBlock),
    recurseExpression: fRec(s, pass, recurseExpression),
    recurseExpressionIdentifier: fRec(s, pass, recurseExpressionIdentifier),
    recurseExpressionFunction: fRec(s, pass, recurseExpressionFunction),
    recurseExpressionObject: fRec(s, pass, recurseExpressionObject),
    recurseExpressionRun: fRec(s, pass, recurseExpressionRun),
    recurseExpressionLookup: fRec(s, pass, recurseExpressionLookup),
    recurseExpressionCall: fRec(s, pass, recurseExpressionCall),
    recurseExpressionLiteral: fRec(s, pass, recurseExpressionLiteral),
    recurseExpressionUnary: fRec(s, pass, recurseExpressionUnary),
    recurseExpressionBinary: fRec(s, pass, recurseExpressionBinary),
    recurseExpressionTyping: fRec(s, pass, recurseExpressionTyping),
    recurseExpressionParenthesis: fRec(s, pass, recurseExpressionParenthesis),
    recurseAnnotationType: fRec(s, pass, recurseAnnotationType),
    recurseAnnotationTemplate: fRec(s, pass, recurseAnnotationTemplate),
    recurseType: fRec(s, pass, recurseType),
    recurseTypeIdentifier: fRec(s, pass, recurseTypeIdentifier),
    recurseTypeBinary: fRec(s, pass, recurseTypeBinary),
    recurseTypeFunction: fRec(s, pass, recurseTypeFunction),
    recurseTypeObject: fRec(s, pass, recurseTypeObject),
    recurseStatement: fRec(s, pass, recurseStatement),
    recurseStatementVariable: fRec(s, pass, recurseStatementVariable),
    recurseStatementTypedef: fRec(s, pass, recurseStatementTypedef),
    recurseStatementWhile: fRec(s, pass, recurseStatementWhile),
    recurseStatementReturn: fRec(s, pass, recurseStatementReturn),
    recurseStatementExpression: fRec(s, pass, recurseStatementExpression),
  };

  pass.value = {
    recurseModule: fLog(
      passRecurse.value.recurseModule,
      logic.recurseModule,
    ),
    recurseBlock: fLog(
      passRecurse.value.recurseBlock,
      logic.recurseBlock,
    ),
    recurseExpression: fLog(
      passRecurse.value.recurseExpression,
      logic.recurseExpression,
    ),
    recurseExpressionIdentifier: fLog(
      passRecurse.value.recurseExpressionIdentifier,
      logic.recurseExpressionIdentifier,
    ),
    recurseExpressionFunction: fLog(
      passRecurse.value.recurseExpressionFunction,
      logic.recurseExpressionFunction,
    ),
    recurseExpressionObject: fLog(
      passRecurse.value.recurseExpressionObject,
      logic.recurseExpressionObject,
    ),
    recurseExpressionRun: fLog(
      passRecurse.value.recurseExpressionRun,
      logic.recurseExpressionRun,
    ),
    recurseExpressionLookup: fLog(
      passRecurse.value.recurseExpressionLookup,
      logic.recurseExpressionLookup,
    ),
    recurseExpressionCall: fLog(
      passRecurse.value.recurseExpressionCall,
      logic.recurseExpressionCall,
    ),
    recurseExpressionLiteral: fLog(
      passRecurse.value.recurseExpressionLiteral,
      logic.recurseExpressionLiteral,
    ),
    recurseExpressionUnary: fLog(
      passRecurse.value.recurseExpressionUnary,
      logic.recurseExpressionUnary,
    ),
    recurseExpressionBinary: fLog(
      passRecurse.value.recurseExpressionBinary,
      logic.recurseExpressionBinary,
    ),
    recurseExpressionTyping: fLog(
      passRecurse.value.recurseExpressionTyping,
      logic.recurseExpressionTyping,
    ),
    recurseExpressionParenthesis: fLog(
      passRecurse.value.recurseExpressionParenthesis,
      logic.recurseExpressionParenthesis,
    ),
    recurseAnnotationType: fLog(
      passRecurse.value.recurseAnnotationType,
      logic.recurseAnnotationType,
    ),
    recurseAnnotationTemplate: fLog(
      passRecurse.value.recurseAnnotationTemplate,
      logic.recurseAnnotationTemplate,
    ),
    recurseType: fLog(
      passRecurse.value.recurseType,
      logic.recurseType,
    ),
    recurseTypeIdentifier: fLog(
      passRecurse.value.recurseTypeIdentifier,
      logic.recurseTypeIdentifier,
    ),
    recurseTypeBinary: fLog(
      passRecurse.value.recurseTypeBinary,
      logic.recurseTypeBinary,
    ),
    recurseTypeFunction: fLog(
      passRecurse.value.recurseTypeFunction,
      logic.recurseTypeFunction,
    ),
    recurseTypeObject: fLog(
      passRecurse.value.recurseTypeObject,
      logic.recurseTypeObject,
    ),
    recurseStatement: fLog(
      passRecurse.value.recurseStatement,
      logic.recurseStatement,
    ),
    recurseStatementVariable: fLog(
      passRecurse.value.recurseStatementVariable,
      logic.recurseStatementVariable,
    ),
    recurseStatementTypedef: fLog(
      passRecurse.value.recurseStatementTypedef,
      logic.recurseStatementTypedef,
    ),
    recurseStatementWhile: fLog(
      passRecurse.value.recurseStatementWhile,
      logic.recurseStatementWhile,
    ),
    recurseStatementReturn: fLog(
      passRecurse.value.recurseStatementReturn,
      logic.recurseStatementReturn,
    ),
    recurseStatementExpression: fLog(
      passRecurse.value.recurseStatementExpression,
      logic.recurseStatementExpression,
    ),
  };

  return pass.value;
}
