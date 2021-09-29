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
  ) => Promise<void>;

  recurseBlock: (
    scope: Scope,
    ast: AstBlock,
  ) => Promise<void>;

  recurseStatement: (
    scope: Scope,
    ast: AstStatement,
  ) => Promise<void>;
  recurseStatementVariable: (
    scope: Scope,
    ast: AstStatementVariable,
  ) => Promise<void>;
  recurseStatementTypedef: (
    scope: Scope,
    ast: AstStatementTypedef,
  ) => Promise<void>;
  recurseStatementWhile: (
    scope: Scope,
    ast: AstStatementWhile,
  ) => Promise<void>;
  recurseStatementCondition: (
    scope: Scope,
    ast: AstStatementCondition,
  ) => Promise<void>;
  recurseStatementConditionBranch: (
    scope: Scope,
    ast: AstStatementConditionBranch,
  ) => Promise<void>;
  recurseStatementReturn: (
    scope: Scope,
    ast: AstStatementReturn,
  ) => Promise<void>;
  recurseStatementUnsafe: (
    scope: Scope,
    ast: AstStatementUnsafe,
  ) => Promise<void>;
  recurseStatementExpression: (
    scope: Scope,
    ast: AstStatementExpression,
  ) => Promise<void>;
  recurseStatementEmpty: (
    scope: Scope,
    ast: AstStatementEmpty,
  ) => Promise<void>;

  recurseExpression: (
    scope: Scope,
    ast: AstExpression,
  ) => Promise<void>;
  recurseExpressionImport: (
    scope: Scope,
    ast: AstExpressionImport,
  ) => Promise<void>;
  recurseExpressionCall: (
    scope: Scope,
    ast: AstExpressionCall,
  ) => Promise<void>;
  recurseExpressionIdentifier: (
    scope: Scope,
    ast: AstExpressionIdentifier,
  ) => Promise<void>;
  recurseExpressionLiteral: (
    scope: Scope,
    ast: AstExpressionLiteral,
  ) => Promise<void>;
  recurseExpressionFunction: (
    scope: Scope,
    ast: AstExpressionFunction,
  ) => Promise<void>;
  recurseExpressionObject: (
    scope: Scope,
    ast: AstExpressionObject,
  ) => Promise<void>;
  recurseExpressionRun: (
    scope: Scope,
    ast: AstExpressionRun,
  ) => Promise<void>;
  recurseExpressionLookup: (
    scope: Scope,
    ast: AstExpressionLookup,
  ) => Promise<void>;
  recurseExpressionUnary: (
    scope: Scope,
    ast: AstExpressionUnary,
  ) => Promise<void>;
  recurseExpressionBinary: (
    scope: Scope,
    ast: AstExpressionBinary,
  ) => Promise<void>;
  recurseExpressionTyping: (
    scope: Scope,
    ast: AstExpressionTyping,
  ) => Promise<void>;
  recurseExpressionParenthesis: (
    scope: Scope,
    ast: AstExpressionParenthesis,
  ) => Promise<void>;

  recurseAnnotationType: (
    scope: Scope,
    ast: AstAnnotationType,
  ) => Promise<void>;
  recurseAnnotationTemplate: (
    scope: Scope,
    ast: AstAnnotationTemplate,
  ) => Promise<void>;

  recurseType: (
    scope: Scope,
    ast: AstType,
  ) => Promise<void>;
  recurseTypeBinary: (
    scope: Scope,
    ast: AstTypeBinary,
  ) => Promise<void>;
  recurseTypePrimitive: (
    scope: Scope,
    ast: AstTypePrimitive,
  ) => Promise<void>;
  recurseTypeIdentifier: (
    scope: Scope,
    ast: AstTypeIdentifier,
  ) => Promise<void>;
  recurseTypeFunction: (
    scope: Scope,
    ast: AstTypeFunction,
  ) => Promise<void>;
  recurseTypeObject: (
    scope: Scope,
    ast: AstTypeObject,
  ) => Promise<void>;
}
