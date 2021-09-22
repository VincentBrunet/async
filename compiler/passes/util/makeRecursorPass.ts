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

type RecursorFunction<Scope, Ast> = (
  recursor: RecursorPass<Scope>,
  scope: Scope,
  ast: Ast,
) => void;

function makeRecurse<Scope, Ast>(
  recurse: (parent: Scope) => Scope,
  standard: RecursorFunction<Scope, Ast>,
  custom?: RecursorFunction<Scope, Ast>,
): RecursorFunction<Scope, Ast> {
  const call = custom ?? standard;
  return (recursor, scope, ast) => {
    const child = recurse(scope);
    call(recursor, child, ast);
  };
}

function makeCustom<Scope, Ast>(
  fn?: RecursorFunction<Scope, Ast>,
): RecursorFunction<Scope, Ast> | undefined {
  return fn;
}
function makeStandard<Scope, Ast>(
  fn?: RecursorFunction<Scope, Ast>,
): RecursorFunction<Scope, Ast> | undefined {
  return fn;
}

export function makeRecursorPass<Scope>(
  recurse: (parent: Scope) => Scope,
  logic: RecursorLogic<Scope>,
): RecursorPass<Scope> {
  const standardPass = {
    recurseModule: makeStandard(recurseModule),
    recurseBlock: makeStandard(recurseBlock),
    recurseExpression: makeStandard(recurseExpression),
    recurseExpressionIdentifier: makeStandard(recurseExpressionIdentifier),
    recurseExpressionFunction: makeStandard(recurseExpressionFunction),
    recurseExpressionObject: makeStandard(recurseExpressionObject),
    recurseExpressionRun: makeStandard(recurseExpressionRun),
    recurseExpressionLookup: makeStandard(recurseExpressionLookup),
    recurseExpressionCall: makeStandard(recurseExpressionCall),
    recurseExpressionLiteral: makeStandard(recurseExpressionLiteral),
    recurseExpressionUnary: makeStandard(recurseExpressionUnary),
    recurseExpressionBinary: makeStandard(recurseExpressionBinary),
    recurseExpressionTyping: makeStandard(recurseExpressionTyping),
    recurseExpressionParenthesis: makeStandard(recurseExpressionParenthesis),
    recurseAnnotationType: makeStandard(recurseAnnotationType),
    recurseAnnotationTemplate: makeStandard(recurseAnnotationTemplate),
    recurseType: makeStandard(recurseType),
    recurseTypeIdentifier: makeStandard(recurseTypeIdentifier),
    recurseTypeBinary: makeStandard(recurseTypeBinary),
    recurseTypeFunction: makeStandard(recurseTypeFunction),
    recurseTypeObject: makeStandard(recurseTypeObject),
    recurseStatement: makeStandard(recurseStatement),
    recurseStatementVariable: makeStandard(recurseStatementVariable),
    recurseStatementTypedef: makeStandard(recurseStatementTypedef),
    recurseStatementWhile: makeStandard(recurseStatementWhile),
    recurseStatementReturn: makeStandard(recurseStatementReturn),
    recurseStatementExpression: makeStandard(recurseStatementExpression),
  };

  const customPass = {
    recurseModule: makeCustom(partial.recurseModule),
    recurseBlock: makeCustom(partial.recurseBlock),
    recurseExpression: makeCustom(partial.recurseExpression),
    recurseExpressionIdentifier: makeCustom(
      partial.recurseExpressionIdentifier,
    ),
    recurseExpressionFunction: makeCustom(partial.recurseExpressionFunction),
    recurseExpressionObject: makeCustom(partial.recurseExpressionObject),
    recurseExpressionRun: makeCustom(partial.recurseExpressionRun),
    recurseExpressionLookup: makeCustom(partial.recurseExpressionLookup),
    recurseExpressionCall: makeCustom(partial.recurseExpressionCall),
    recurseExpressionLiteral: makeCustom(partial.recurseExpressionLiteral),
    recurseExpressionUnary: makeCustom(partial.recurseExpressionUnary),
    recurseExpressionBinary: makeCustom(partial.recurseExpressionBinary),
    recurseExpressionTyping: makeCustom(partial.recurseExpressionTyping),
    recurseExpressionParenthesis: makeCustom(
      partial.recurseExpressionParenthesis,
    ),
    recurseAnnotationType: makeCustom(partial.recurseAnnotationType),
    recurseAnnotationTemplate: makeCustom(partial.recurseAnnotationTemplate),
    recurseType: makeCustom(partial.recurseType),
    recurseTypeIdentifier: makeCustom(partial.recurseTypeIdentifier),
    recurseTypeBinary: makeCustom(partial.recurseTypeBinary),
    recurseTypeFunction: makeCustom(partial.recurseTypeFunction),
    recurseTypeObject: makeCustom(partial.recurseTypeObject),
    recurseStatement: makeCustom(partial.recurseStatement),
    recurseStatementVariable: makeCustom(partial.recurseStatementVariable),
    recurseStatementTypedef: makeCustom(partial.recurseStatementTypedef),
    recurseStatementWhile: makeCustom(partial.recurseStatementWhile),
    recurseStatementReturn: makeCustom(partial.recurseStatementReturn),
    recurseStatementExpression: makeCustom(partial.recurseStatementExpression),
  };

  return {
    recurseModule: makeRecurse(
      recurse,
      recurseModule,
      partial.recurseModule,
    ),
    recurseBlock: makeRecurse(
      recurse,
      recurseBlock,
      partial.recurseBlock,
    ),

    recurseExpression: makeRecurse(
      recurse,
      recurseExpression,
      partial.recurseExpression,
    ),
    recurseExpressionIdentifier: makeRecurse(
      recurse,
      recurseExpressionIdentifier,
      partial.recurseExpressionIdentifier,
    ),
    recurseExpressionFunction: makeRecurse(
      recurse,
      recurseExpressionFunction,
      partial.recurseExpressionFunction,
    ),
    recurseExpressionObject: makeRecurse(
      recurse,
      recurseExpressionObject,
      partial.recurseExpressionObject,
    ),
    recurseExpressionRun: makeRecurse(
      recurse,
      recurseExpressionRun,
      partial.recurseExpressionRun,
    ),
    recurseExpressionLookup: makeRecurse(
      recurse,
      recurseExpressionLookup,
      partial.recurseExpressionLookup,
    ),
    recurseExpressionCall: makeRecurse(
      recurse,
      recurseExpressionCall,
      partial.recurseExpressionCall,
    ),
    recurseExpressionLiteral: makeRecurse(
      recurse,
      recurseExpressionLiteral,
      partial.recurseExpressionLiteral,
    ),
    recurseExpressionUnary: makeRecurse(
      recurse,
      recurseExpressionUnary,
      partial.recurseExpressionUnary,
    ),
    recurseExpressionBinary: makeRecurse(
      recurse,
      recurseExpressionBinary,
      partial.recurseExpressionBinary,
    ),
    recurseExpressionTyping: makeRecurse(
      recurse,
      recurseExpressionTyping,
      partial.recurseExpressionTyping,
    ),
    recurseExpressionParenthesis: makeRecurse(
      recurse,
      recurseExpressionParenthesis,
      partial.recurseExpressionParenthesis,
    ),

    recurseAnnotationType: makeRecurse(
      recurse,
      recurseAnnotationType,
      partial.recurseAnnotationType,
    ),
    recurseAnnotationTemplate: makeRecurse(
      recurse,
      recurseAnnotationTemplate,
      partial.recurseAnnotationTemplate,
    ),

    recurseType: makeRecurse(
      recurse,
      recurseType,
      partial.recurseType,
    ),
    recurseTypeIdentifier: makeRecurse(
      recurse,
      recurseTypeIdentifier,
      partial.recurseTypeIdentifier,
    ),
    recurseTypeBinary: makeRecurse(
      recurse,
      recurseTypeBinary,
      partial.recurseTypeBinary,
    ),
    recurseTypeFunction: makeRecurse(
      recurse,
      recurseTypeFunction,
      partial.recurseTypeFunction,
    ),
    recurseTypeObject: makeRecurse(
      recurse,
      recurseTypeObject,
      partial.recurseTypeObject,
    ),

    recurseStatement: makeRecurse(
      recurse,
      recurseStatement,
      partial.recurseStatement,
    ),
    recurseStatementVariable: makeRecurse(
      recurse,
      recurseStatementVariable,
      partial.recurseStatementVariable,
    ),
    recurseStatementTypedef: makeRecurse(
      recurse,
      recurseStatementTypedef,
      partial.recurseStatementTypedef,
    ),
    recurseStatementWhile: makeRecurse(
      recurse,
      recurseStatementWhile,
      partial.recurseStatementWhile,
    ),
    recurseStatementReturn: makeRecurse(
      recurse,
      recurseStatementReturn,
      partial.recurseStatementReturn,
    ),
    recurseStatementExpression: makeRecurse(
      recurse,
      recurseStatementExpression,
      partial.recurseStatementExpression,
    ),
  };
}
