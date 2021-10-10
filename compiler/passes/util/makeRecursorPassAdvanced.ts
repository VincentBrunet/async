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
import { recurseTypePrimitive } from "./recurseTypePrimitive.ts";
import { RecursorAdvanced } from "./RecursorAdvanced.ts";
import { RecursorPass } from "./RecursorPass.ts";

type RecursorPassHolder<Scope> = {
  value?: RecursorPass<Scope>;
};

type RecursorAdvancedFunction<Scope, Ast> = (
  pass: RecursorPass<Scope>,
  scope: Scope,
  ast: Ast,
) => Promise<void>;

type RecursorPassFunction<Scope, Ast> = (
  scope: Scope,
  ast: Ast,
) => Promise<void>;

function makePass<Scope, Ast>(
  scoper: (parent: Scope) => Scope,
  pass: RecursorPassHolder<Scope>,
  standard: RecursorAdvancedFunction<Scope, Ast>,
  custom?: RecursorAdvancedFunction<Scope, Ast>,
): RecursorPassFunction<Scope, Ast> {
  return async (scope, ast) => {
    const child = scoper(scope);
    const advanced = custom ?? standard;
    await advanced(pass.value!, child, ast);
  };
}

export function makeRecursorPassAdvanced<Scope>(
  scoper: (parent: Scope) => Scope,
  customAdvanced: RecursorAdvanced<Scope>,
): RecursorPass<Scope> {
  let passRecurse: RecursorPassHolder<Scope> = {};

  passRecurse.value = {
    recurseModule: makePass(
      scoper,
      passRecurse,
      recurseModule,
      customAdvanced.recurseModule,
    ),

    recurseBlock: makePass(
      scoper,
      passRecurse,
      recurseBlock,
      customAdvanced.recurseBlock,
    ),

    recurseExpression: makePass(
      scoper,
      passRecurse,
      recurseExpression,
      customAdvanced.recurseExpression,
    ),
    recurseExpressionCall: makePass(
      scoper,
      passRecurse,
      recurseExpressionCall,
      customAdvanced.recurseExpressionCall,
    ),
    recurseExpressionIdentifier: makePass(
      scoper,
      passRecurse,
      recurseExpressionIdentifier,
      customAdvanced.recurseExpressionIdentifier,
    ),
    recurseExpressionFunction: makePass(
      scoper,
      passRecurse,
      recurseExpressionFunction,
      customAdvanced.recurseExpressionFunction,
    ),
    recurseExpressionObject: makePass(
      scoper,
      passRecurse,
      recurseExpressionObject,
      customAdvanced.recurseExpressionObject,
    ),
    recurseExpressionRun: makePass(
      scoper,
      passRecurse,
      recurseExpressionRun,
      customAdvanced.recurseExpressionRun,
    ),
    recurseExpressionLookup: makePass(
      scoper,
      passRecurse,
      recurseExpressionLookup,
      customAdvanced.recurseExpressionLookup,
    ),
    recurseExpressionLiteral: makePass(
      scoper,
      passRecurse,
      recurseExpressionLiteral,
      customAdvanced.recurseExpressionLiteral,
    ),
    recurseExpressionUnary: makePass(
      scoper,
      passRecurse,
      recurseExpressionUnary,
      customAdvanced.recurseExpressionUnary,
    ),
    recurseExpressionBinary: makePass(
      scoper,
      passRecurse,
      recurseExpressionBinary,
      customAdvanced.recurseExpressionBinary,
    ),
    recurseExpressionTyping: makePass(
      scoper,
      passRecurse,
      recurseExpressionTyping,
      customAdvanced.recurseExpressionTyping,
    ),
    recurseExpressionParenthesis: makePass(
      scoper,
      passRecurse,
      recurseExpressionParenthesis,
      customAdvanced.recurseExpressionParenthesis,
    ),

    recurseAnnotationType: makePass(
      scoper,
      passRecurse,
      recurseAnnotationType,
      customAdvanced.recurseAnnotationType,
    ),
    recurseAnnotationTemplate: makePass(
      scoper,
      passRecurse,
      recurseAnnotationTemplate,
      customAdvanced.recurseAnnotationTemplate,
    ),

    recurseType: makePass(
      scoper,
      passRecurse,
      recurseType,
      customAdvanced.recurseType,
    ),
    recurseTypeIdentifier: makePass(
      scoper,
      passRecurse,
      recurseTypeIdentifier,
      customAdvanced.recurseTypeIdentifier,
    ),
    recurseTypePrimitive: makePass(
      scoper,
      passRecurse,
      recurseTypePrimitive,
      customAdvanced.recurseTypePrimitive,
    ),
    recurseTypeBinary: makePass(
      scoper,
      passRecurse,
      recurseTypeBinary,
      customAdvanced.recurseTypeBinary,
    ),
    recurseTypeFunction: makePass(
      scoper,
      passRecurse,
      recurseTypeFunction,
      customAdvanced.recurseTypeFunction,
    ),
    recurseTypeObject: makePass(
      scoper,
      passRecurse,
      recurseTypeObject,
      customAdvanced.recurseTypeObject,
    ),

    recurseStatement: makePass(
      scoper,
      passRecurse,
      recurseStatement,
      customAdvanced.recurseStatement,
    ),
    recurseStatementImport: makePass(
      scoper,
      passRecurse,
      recurseStatementImport,
      customAdvanced.recurseStatementImport,
    ),
    recurseStatementExport: makePass(
      scoper,
      passRecurse,
      recurseStatementExport,
      customAdvanced.recurseStatementExport,
    ),
    recurseStatementVariable: makePass(
      scoper,
      passRecurse,
      recurseStatementVariable,
      customAdvanced.recurseStatementVariable,
    ),
    recurseStatementTypedef: makePass(
      scoper,
      passRecurse,
      recurseStatementTypedef,
      customAdvanced.recurseStatementTypedef,
    ),
    recurseStatementWhile: makePass(
      scoper,
      passRecurse,
      recurseStatementWhile,
      customAdvanced.recurseStatementWhile,
    ),
    recurseStatementCondition: makePass(
      scoper,
      passRecurse,
      recurseStatementCondition,
      customAdvanced.recurseStatementCondition,
    ),
    recurseStatementConditionBranch: makePass(
      scoper,
      passRecurse,
      recurseStatementConditionBranch,
      customAdvanced.recurseStatementConditionBranch,
    ),
    recurseStatementReturn: makePass(
      scoper,
      passRecurse,
      recurseStatementReturn,
      customAdvanced.recurseStatementReturn,
    ),
    recurseStatementUnsafe: makePass(
      scoper,
      passRecurse,
      recurseStatementUnsafe,
      customAdvanced.recurseStatementUnsafe,
    ),
    recurseStatementExpression: makePass(
      scoper,
      passRecurse,
      recurseStatementExpression,
      customAdvanced.recurseStatementExpression,
    ),
    recurseStatementEmpty: makePass(
      scoper,
      passRecurse,
      recurseStatementEmpty,
      customAdvanced.recurseStatementEmpty,
    ),
  };

  return passRecurse.value;
}
