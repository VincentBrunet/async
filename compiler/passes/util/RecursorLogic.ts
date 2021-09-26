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
import { AstStatementExpression } from "../../data/ast/AstStatementExpression.ts";
import { AstStatementReturn } from "../../data/ast/AstStatementReturn.ts";
import { AstStatementTypedef } from "../../data/ast/AstStatementTypedef.ts";
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
    next: () => void,
  ) => void;

  recurseBlock?: (
    scope: Scope,
    ast: AstBlock,
    next: () => void,
  ) => void;

  recurseStatement?: (
    scope: Scope,
    ast: AstStatement,
    next: () => void,
  ) => void;
  recurseStatementVariable?: (
    scope: Scope,
    ast: AstStatementVariable,
    next: () => void,
  ) => void;
  recurseStatementTypedef?: (
    scope: Scope,
    ast: AstStatementTypedef,
    next: () => void,
  ) => void;
  recurseStatementWhile?: (
    scope: Scope,
    ast: AstStatementWhile,
    next: () => void,
  ) => void;
  recurseStatementCondition?: (
    scope: Scope,
    ast: AstStatementCondition,
    next: () => void,
  ) => void;
  recurseStatementConditionBranch?: (
    scope: Scope,
    ast: AstStatementConditionBranch,
    next: () => void,
  ) => void;
  recurseStatementReturn?: (
    scope: Scope,
    ast: AstStatementReturn,
    next: () => void,
  ) => void;
  recurseStatementExpression?: (
    scope: Scope,
    ast: AstStatementExpression,
    next: () => void,
  ) => void;

  recurseExpression?: (
    scope: Scope,
    ast: AstExpression,
    next: () => void,
  ) => void;
  recurseExpressionCall?: (
    scope: Scope,
    ast: AstExpressionCall,
    next: () => void,
  ) => void;
  recurseExpressionIdentifier?: (
    scope: Scope,
    ast: AstExpressionIdentifier,
    next: () => void,
  ) => void;
  recurseExpressionLiteral?: (
    scope: Scope,
    ast: AstExpressionLiteral,
    next: () => void,
  ) => void;
  recurseExpressionFunction?: (
    scope: Scope,
    ast: AstExpressionFunction,
    next: () => void,
  ) => void;
  recurseExpressionObject?: (
    scope: Scope,
    ast: AstExpressionObject,
    next: () => void,
  ) => void;
  recurseExpressionRun?: (
    scope: Scope,
    ast: AstExpressionRun,
    next: () => void,
  ) => void;
  recurseExpressionLookup?: (
    scope: Scope,
    ast: AstExpressionLookup,
    next: () => void,
  ) => void;
  recurseExpressionUnary?: (
    scope: Scope,
    ast: AstExpressionUnary,
    next: () => void,
  ) => void;
  recurseExpressionBinary?: (
    scope: Scope,
    ast: AstExpressionBinary,
    next: () => void,
  ) => void;
  recurseExpressionTyping?: (
    scope: Scope,
    ast: AstExpressionTyping,
    next: () => void,
  ) => void;
  recurseExpressionParenthesis?: (
    scope: Scope,
    ast: AstExpressionParenthesis,
    next: () => void,
  ) => void;

  recurseAnnotationType?: (
    scope: Scope,
    ast: AstAnnotationType,
    next: () => void,
  ) => void;
  recurseAnnotationTemplate?: (
    scope: Scope,
    ast: AstAnnotationTemplate,
    next: () => void,
  ) => void;

  recurseType?: (
    scope: Scope,
    ast: AstType,
    next: () => void,
  ) => void;
  recurseTypeBinary?: (
    scope: Scope,
    ast: AstTypeBinary,
    next: () => void,
  ) => void;
  recurseTypeIdentifier?: (
    scope: Scope,
    ast: AstTypeIdentifier,
    next: () => void,
  ) => void;
  recurseTypePrimitive?: (
    scope: Scope,
    ast: AstTypePrimitive,
    next: () => void,
  ) => void;
  recurseTypeFunction?: (
    scope: Scope,
    ast: AstTypeFunction,
    next: () => void,
  ) => void;
  recurseTypeObject?: (
    scope: Scope,
    ast: AstTypeObject,
    next: () => void,
  ) => void;
}
