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

function fRec<Scope, Ast>(
  deeper: (parent: Scope) => Scope,
  pass: RecursorPass<Scope> | undefined,
  call: RecursorNextFunction<Scope, Ast>,
): RecursorPassFunction<Scope, Ast> {
  return (scope, ast) => {
    const child = deeper(scope);
    call(pass!, child, ast);
  };
}

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
  let pr: RecursorPass<Scope> | undefined = undefined;
  // Pass with custom logic
  let pl: RecursorPass<Scope> | undefined = undefined;

  pr = {
    recurseModule: fRec(s, pl, recurseModule),
    recurseBlock: fRec(s, pl, recurseBlock),
    recurseExpression: fRec(s, pl, recurseExpression),
    recurseExpressionIdentifier: fRec(s, pl, recurseExpressionIdentifier),
    recurseExpressionFunction: fRec(s, pl, recurseExpressionFunction),
    recurseExpressionObject: fRec(s, pl, recurseExpressionObject),
    recurseExpressionRun: fRec(s, pl, recurseExpressionRun),
    recurseExpressionLookup: fRec(s, pl, recurseExpressionLookup),
    recurseExpressionCall: fRec(s, pl, recurseExpressionCall),
    recurseExpressionLiteral: fRec(s, pl, recurseExpressionLiteral),
    recurseExpressionUnary: fRec(s, pl, recurseExpressionUnary),
    recurseExpressionBinary: fRec(s, pl, recurseExpressionBinary),
    recurseExpressionTyping: fRec(s, pl, recurseExpressionTyping),
    recurseExpressionParenthesis: fRec(s, pl, recurseExpressionParenthesis),
    recurseAnnotationType: fRec(s, pl, recurseAnnotationType),
    recurseAnnotationTemplate: fRec(s, pl, recurseAnnotationTemplate),
    recurseType: fRec(s, pl, recurseType),
    recurseTypeIdentifier: fRec(s, pl, recurseTypeIdentifier),
    recurseTypeBinary: fRec(s, pl, recurseTypeBinary),
    recurseTypeFunction: fRec(s, pl, recurseTypeFunction),
    recurseTypeObject: fRec(s, pl, recurseTypeObject),
    recurseStatement: fRec(s, pl, recurseStatement),
    recurseStatementVariable: fRec(s, pl, recurseStatementVariable),
    recurseStatementTypedef: fRec(s, pl, recurseStatementTypedef),
    recurseStatementWhile: fRec(s, pl, recurseStatementWhile),
    recurseStatementReturn: fRec(s, pl, recurseStatementReturn),
    recurseStatementExpression: fRec(s, pl, recurseStatementExpression),
  };

  pl = {
    recurseModule: fLog(pr.recurseModule, logic.recurseModule),
    recurseBlock: fLog(pr.recurseBlock, logic.recurseBlock),
    recurseExpression: fLog(pr.recurseExpression, logic.recurseExpression),
    recurseExpressionIdentifier: fLog(
      pr.recurseExpressionIdentifier,
      logic.recurseExpressionIdentifier,
    ),
    recurseExpressionFunction: fLog(
      pr.recurseExpressionFunction,
      logic.recurseExpressionFunction,
    ),
    recurseExpressionObject: fLog(
      pr.recurseExpressionObject,
      logic.recurseExpressionObject,
    ),
    recurseExpressionRun: fLog(
      pr.recurseExpressionRun,
      logic.recurseExpressionRun,
    ),
    recurseExpressionLookup: fLog(
      pr.recurseExpressionLookup,
      logic.recurseExpressionLookup,
    ),
    recurseExpressionCall: fLog(
      pr.recurseExpressionCall,
      logic.recurseExpressionCall,
    ),
    recurseExpressionLiteral: fLog(
      pr.recurseExpressionLiteral,
      logic.recurseExpressionLiteral,
    ),
    recurseExpressionUnary: fLog(
      pr.recurseExpressionUnary,
      logic.recurseExpressionUnary,
    ),
    recurseExpressionBinary: fLog(
      pr.recurseExpressionBinary,
      logic.recurseExpressionBinary,
    ),
    recurseExpressionTyping: fLog(
      pr.recurseExpressionTyping,
      logic.recurseExpressionTyping,
    ),
    recurseExpressionParenthesis: fLog(
      pr.recurseExpressionParenthesis,
      logic.recurseExpressionParenthesis,
    ),
    recurseAnnotationType: fLog(
      pr.recurseAnnotationType,
      logic.recurseAnnotationType,
    ),
    recurseAnnotationTemplate: fLog(
      pr.recurseAnnotationTemplate,
      logic.recurseAnnotationTemplate,
    ),
    recurseType: fLog(pr.recurseType, logic.recurseType),
    recurseTypeIdentifier: fLog(
      pr.recurseTypeIdentifier,
      logic.recurseTypeIdentifier,
    ),
    recurseTypeBinary: fLog(pr.recurseTypeBinary, logic.recurseTypeBinary),
    recurseTypeFunction: fLog(
      pr.recurseTypeFunction,
      logic.recurseTypeFunction,
    ),
    recurseTypeObject: fLog(pr.recurseTypeObject, logic.recurseTypeObject),
    recurseStatement: fLog(pr.recurseStatement, logic.recurseStatement),
    recurseStatementVariable: fLog(
      pr.recurseStatementVariable,
      logic.recurseStatementVariable,
    ),
    recurseStatementTypedef: fLog(
      pr.recurseStatementTypedef,
      logic.recurseStatementTypedef,
    ),
    recurseStatementWhile: fLog(
      pr.recurseStatementWhile,
      logic.recurseStatementWhile,
    ),
    recurseStatementReturn: fLog(
      pr.recurseStatementReturn,
      logic.recurseStatementReturn,
    ),
    recurseStatementExpression: fLog(
      pr.recurseStatementExpression,
      logic.recurseStatementExpression,
    ),
  };

  return pl;
}
