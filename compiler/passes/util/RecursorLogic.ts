import { AstAnnotationTemplate } from "../../data/ast/AstAnnotationTemplate.ts";
import { AstAnnotationType } from "../../data/ast/AstAnnotationType.ts";
import { AstBlock } from "../../data/ast/AstBlock.ts";
import { AstExpression } from "../../data/ast/AstExpression.ts";
import { AstExpressionBinary } from "../../data/ast/AstExpressionBinary.ts";
import { AstExpressionCall } from "../../data/ast/AstExpressionCall.ts";
import { AstExpressionFunction } from "../../data/ast/AstExpressionFunction.ts";
import { AstExpressionIdentifier } from "../../data/ast/AstExpressionIdentifier.ts";
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
import { AstStatementExport } from "../../data/ast/AstStatementExport.ts";
import { AstStatementExpression } from "../../data/ast/AstStatementExpression.ts";
import { AstStatementImport } from "../../data/ast/AstStatementImport.ts";
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

export interface RecursorLogic<Scope> {
  recurseModule?: (
    scope: Scope,
    ast: AstModule,
    next: () => Promise<void>,
  ) => Promise<void>;

  recurseBlock?: (
    scope: Scope,
    ast: AstBlock,
    next: () => Promise<void>,
  ) => Promise<void>;

  recurseStatement?: (
    scope: Scope,
    ast: AstStatement,
    next: () => Promise<void>,
  ) => Promise<void>;
  recurseStatementImport?: (
    scope: Scope,
    ast: AstStatementImport,
    next: () => Promise<void>,
  ) => Promise<void>;
  recurseStatementExport?: (
    scope: Scope,
    ast: AstStatementExport,
    next: () => Promise<void>,
  ) => Promise<void>;
  recurseStatementVariable?: (
    scope: Scope,
    ast: AstStatementVariable,
    next: () => Promise<void>,
  ) => Promise<void>;
  recurseStatementTypedef?: (
    scope: Scope,
    ast: AstStatementTypedef,
    next: () => Promise<void>,
  ) => Promise<void>;
  recurseStatementWhile?: (
    scope: Scope,
    ast: AstStatementWhile,
    next: () => Promise<void>,
  ) => Promise<void>;
  recurseStatementCondition?: (
    scope: Scope,
    ast: AstStatementCondition,
    next: () => Promise<void>,
  ) => Promise<void>;
  recurseStatementConditionBranch?: (
    scope: Scope,
    ast: AstStatementConditionBranch,
    next: () => Promise<void>,
  ) => Promise<void>;
  recurseStatementReturn?: (
    scope: Scope,
    ast: AstStatementReturn,
    next: () => Promise<void>,
  ) => Promise<void>;
  recurseStatementUnsafe?: (
    scope: Scope,
    ast: AstStatementUnsafe,
    next: () => Promise<void>,
  ) => Promise<void>;
  recurseStatementExpression?: (
    scope: Scope,
    ast: AstStatementExpression,
    next: () => Promise<void>,
  ) => Promise<void>;
  recurseStatementEmpty?: (
    scope: Scope,
    ast: AstStatementEmpty,
    next: () => Promise<void>,
  ) => Promise<void>;

  recurseExpression?: (
    scope: Scope,
    ast: AstExpression,
    next: () => Promise<void>,
  ) => Promise<void>;
  recurseExpressionCall?: (
    scope: Scope,
    ast: AstExpressionCall,
    next: () => Promise<void>,
  ) => Promise<void>;
  recurseExpressionIdentifier?: (
    scope: Scope,
    ast: AstExpressionIdentifier,
    next: () => Promise<void>,
  ) => Promise<void>;
  recurseExpressionLiteral?: (
    scope: Scope,
    ast: AstExpressionLiteral,
    next: () => Promise<void>,
  ) => Promise<void>;
  recurseExpressionFunction?: (
    scope: Scope,
    ast: AstExpressionFunction,
    next: () => Promise<void>,
  ) => Promise<void>;
  recurseExpressionObject?: (
    scope: Scope,
    ast: AstExpressionObject,
    next: () => Promise<void>,
  ) => Promise<void>;
  recurseExpressionRun?: (
    scope: Scope,
    ast: AstExpressionRun,
    next: () => Promise<void>,
  ) => Promise<void>;
  recurseExpressionLookup?: (
    scope: Scope,
    ast: AstExpressionLookup,
    next: () => Promise<void>,
  ) => Promise<void>;
  recurseExpressionUnary?: (
    scope: Scope,
    ast: AstExpressionUnary,
    next: () => Promise<void>,
  ) => Promise<void>;
  recurseExpressionBinary?: (
    scope: Scope,
    ast: AstExpressionBinary,
    next: () => Promise<void>,
  ) => Promise<void>;
  recurseExpressionTyping?: (
    scope: Scope,
    ast: AstExpressionTyping,
    next: () => Promise<void>,
  ) => Promise<void>;
  recurseExpressionParenthesis?: (
    scope: Scope,
    ast: AstExpressionParenthesis,
    next: () => Promise<void>,
  ) => Promise<void>;

  recurseAnnotationType?: (
    scope: Scope,
    ast: AstAnnotationType,
    next: () => Promise<void>,
  ) => Promise<void>;
  recurseAnnotationTemplate?: (
    scope: Scope,
    ast: AstAnnotationTemplate,
    next: () => Promise<void>,
  ) => Promise<void>;

  recurseType?: (
    scope: Scope,
    ast: AstType,
    next: () => Promise<void>,
  ) => Promise<void>;
  recurseTypeBinary?: (
    scope: Scope,
    ast: AstTypeBinary,
    next: () => Promise<void>,
  ) => Promise<void>;
  recurseTypeIdentifier?: (
    scope: Scope,
    ast: AstTypeIdentifier,
    next: () => Promise<void>,
  ) => Promise<void>;
  recurseTypePrimitive?: (
    scope: Scope,
    ast: AstTypePrimitive,
    next: () => Promise<void>,
  ) => Promise<void>;
  recurseTypeFunction?: (
    scope: Scope,
    ast: AstTypeFunction,
    next: () => Promise<void>,
  ) => Promise<void>;
  recurseTypeObject?: (
    scope: Scope,
    ast: AstTypeObject,
    next: () => Promise<void>,
  ) => Promise<void>;
}
