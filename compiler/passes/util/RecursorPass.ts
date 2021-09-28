import { AstAnnotationTemplate } from "../../data/ast/AstAnnotationTemplate.ts";
import { AstAnnotationType } from "../../data/ast/AstAnnotationType.ts";
import { AstBlock } from "../../data/ast/AstBlock.ts";
import { AstExpression } from "../../data/ast/AstExpression.ts";
import { AstExpressionBinary } from "../../data/ast/AstExpressionBinary.ts";
import { AstExpressionCall } from "../../data/ast/AstExpressionCall.ts";
import { AstExpressionFunction } from "../../data/ast/AstExpressionFunction.ts";
import { AstExpressionIdentifier } from "../../data/ast/AstExpressionIdentifier.ts";
import { AstExpressionImport } from "../../data/ast/AstExpressionImport.ts";
import { AstExpressionLiteral } from "../../data/ast/AstExpressionLiteral.ts";
import { AstExpressionLookup } from "../../data/ast/AstExpressionLookup.ts";
import { AstExpressionObject } from "../../data/ast/AstExpressionObject.ts";
import { AstExpressionParenthesis } from "../../data/ast/AstExpressionParenthesis.ts";
import { AstExpressionRun } from "../../data/ast/AstExpressionRun.ts";
import { AstExpressionTyping } from "../../data/ast/AstExpressionTyping.ts";
import { AstExpressionUnary } from "../../data/ast/AstExpressionUnary.ts";
import { AstModule } from "../../data/ast/AstModule.ts";
import { AstStatement } from "../../data/ast/AstStatement.ts";
import {
  AstStatementCondition,
  AstStatementConditionBranch,
} from "../../data/ast/AstStatementCondition.ts";
import { AstStatementEmpty } from "../../data/ast/AstStatementEmpty.ts";
import { AstStatementExpression } from "../../data/ast/AstStatementExpression.ts";
import { AstStatementReturn } from "../../data/ast/AstStatementReturn.ts";
import { AstStatementTypedef } from "../../data/ast/AstStatementTypedef.ts";
import { AstStatementUnsafe } from "../../data/ast/AstStatementUnsafe.ts";
import { AstStatementVariable } from "../../data/ast/AstStatementVariable.ts";
import { AstStatementWhile } from "../../data/ast/AstStatementWhile.ts";
import { AstType } from "../../data/ast/AstType.ts";
import { AstTypeBinary } from "../../data/ast/AstTypeBinary.ts";
import { AstTypeFunction } from "../../data/ast/AstTypeFunction.ts";
import { AstTypeIdentifier } from "../../data/ast/AstTypeIdentifier.ts";
import { AstTypeObject } from "../../data/ast/AstTypeObject.ts";
import { AstTypePrimitive } from "../../data/ast/AstTypePrimitive.ts";

export interface RecursorPass<Scope> {
  recurseModule: (
    scope: Scope,
    ast: AstModule,
  ) => void;

  recurseBlock: (
    scope: Scope,
    ast: AstBlock,
  ) => void;

  recurseStatement: (
    scope: Scope,
    ast: AstStatement,
  ) => void;
  recurseStatementVariable: (
    scope: Scope,
    ast: AstStatementVariable,
  ) => void;
  recurseStatementTypedef: (
    scope: Scope,
    ast: AstStatementTypedef,
  ) => void;
  recurseStatementWhile: (
    scope: Scope,
    ast: AstStatementWhile,
  ) => void;
  recurseStatementCondition: (
    scope: Scope,
    ast: AstStatementCondition,
  ) => void;
  recurseStatementConditionBranch: (
    scope: Scope,
    ast: AstStatementConditionBranch,
  ) => void;
  recurseStatementReturn: (
    scope: Scope,
    ast: AstStatementReturn,
  ) => void;
  recurseStatementUnsafe: (
    scope: Scope,
    ast: AstStatementUnsafe,
  ) => void;
  recurseStatementExpression: (
    scope: Scope,
    ast: AstStatementExpression,
  ) => void;
  recurseStatementEmpty: (
    scope: Scope,
    ast: AstStatementEmpty,
  ) => void;

  recurseExpression: (
    scope: Scope,
    ast: AstExpression,
  ) => void;
  recurseExpressionImport: (
    scope: Scope,
    ast: AstExpressionImport,
  ) => void;
  recurseExpressionCall: (
    scope: Scope,
    ast: AstExpressionCall,
  ) => void;
  recurseExpressionIdentifier: (
    scope: Scope,
    ast: AstExpressionIdentifier,
  ) => void;
  recurseExpressionLiteral: (
    scope: Scope,
    ast: AstExpressionLiteral,
  ) => void;
  recurseExpressionFunction: (
    scope: Scope,
    ast: AstExpressionFunction,
  ) => void;
  recurseExpressionObject: (
    scope: Scope,
    ast: AstExpressionObject,
  ) => void;
  recurseExpressionRun: (
    scope: Scope,
    ast: AstExpressionRun,
  ) => void;
  recurseExpressionLookup: (
    scope: Scope,
    ast: AstExpressionLookup,
  ) => void;
  recurseExpressionUnary: (
    scope: Scope,
    ast: AstExpressionUnary,
  ) => void;
  recurseExpressionBinary: (
    scope: Scope,
    ast: AstExpressionBinary,
  ) => void;
  recurseExpressionTyping: (
    scope: Scope,
    ast: AstExpressionTyping,
  ) => void;
  recurseExpressionParenthesis: (
    scope: Scope,
    ast: AstExpressionParenthesis,
  ) => void;

  recurseAnnotationType: (
    scope: Scope,
    ast: AstAnnotationType,
  ) => void;
  recurseAnnotationTemplate: (
    scope: Scope,
    ast: AstAnnotationTemplate,
  ) => void;

  recurseType: (
    scope: Scope,
    ast: AstType,
  ) => void;
  recurseTypeBinary: (
    scope: Scope,
    ast: AstTypeBinary,
  ) => void;
  recurseTypePrimitive: (
    scope: Scope,
    ast: AstTypePrimitive,
  ) => void;
  recurseTypeIdentifier: (
    scope: Scope,
    ast: AstTypeIdentifier,
  ) => void;
  recurseTypeFunction: (
    scope: Scope,
    ast: AstTypeFunction,
  ) => void;
  recurseTypeObject: (
    scope: Scope,
    ast: AstTypeObject,
  ) => void;
}
