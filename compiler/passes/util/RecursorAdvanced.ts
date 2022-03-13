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
import { AstStatementBlock } from "../../data/ast/AstStatementBlock.ts";
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
import { AstTypeParenthesis } from "../../data/ast/AstTypeParenthesis.ts";
import { AstTypePrimitive } from "../../data/ast/AstTypePrimitive.ts";
import { RecursorPass } from "./RecursorPass.ts";

export interface RecursorAdvanced<Scope> {
  recurseModule?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstModule,
  ) => void;

  recurseBlock?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstBlock,
  ) => void;

  recurseStatement?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstStatement,
  ) => void;
  recurseStatementImport?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstStatementImport,
  ) => void;
  recurseStatementExport?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstStatementExport,
  ) => void;
  recurseStatementVariable?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstStatementVariable,
  ) => void;
  recurseStatementTypedef?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstStatementTypedef,
  ) => void;
  recurseStatementBlock?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstStatementBlock,
  ) => void;
  recurseStatementWhile?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstStatementWhile,
  ) => void;
  recurseStatementCondition?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstStatementCondition,
  ) => void;
  recurseStatementConditionBranch?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstStatementConditionBranch,
  ) => void;
  recurseStatementReturn?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstStatementReturn,
  ) => void;
  recurseStatementUnsafe?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstStatementUnsafe,
  ) => void;
  recurseStatementExpression?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstStatementExpression,
  ) => void;
  recurseStatementEmpty?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstStatementEmpty,
  ) => void;

  recurseExpression?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstExpression,
  ) => void;
  recurseExpressionCall?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstExpressionCall,
  ) => void;
  recurseExpressionIdentifier?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstExpressionIdentifier,
  ) => void;
  recurseExpressionLiteral?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstExpressionLiteral,
  ) => void;
  recurseExpressionFunction?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstExpressionFunction,
  ) => void;
  recurseExpressionObject?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstExpressionObject,
  ) => void;
  recurseExpressionRun?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstExpressionRun,
  ) => void;
  recurseExpressionLookup?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstExpressionLookup,
  ) => void;
  recurseExpressionUnary?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstExpressionUnary,
  ) => void;
  recurseExpressionBinary?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstExpressionBinary,
  ) => void;
  recurseExpressionTyping?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstExpressionTyping,
  ) => void;
  recurseExpressionParenthesis?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstExpressionParenthesis,
  ) => void;

  recurseAnnotationType?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstAnnotationType,
  ) => void;
  recurseAnnotationTemplate?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstAnnotationTemplate,
  ) => void;

  recurseType?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstType,
  ) => void;
  recurseTypeParenthesis?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstTypeParenthesis,
  ) => void;
  recurseTypeIdentifier?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstTypeIdentifier,
  ) => void;
  recurseTypePrimitive?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstTypePrimitive,
  ) => void;
  recurseTypeFunction?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstTypeFunction,
  ) => void;
  recurseTypeObject?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstTypeObject,
  ) => void;
  recurseTypeBinary?: (
    pass: RecursorPass<Scope>,
    scope: Scope,
    ast: AstTypeBinary,
  ) => void;
}
