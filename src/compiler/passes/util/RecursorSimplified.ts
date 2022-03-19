import { AstAnnotationTemplate } from '../../data/ast/AstAnnotationTemplate.ts';
import { AstAnnotationType } from '../../data/ast/AstAnnotationType.ts';
import { AstBlock } from '../../data/ast/AstBlock.ts';
import { AstExpression } from '../../data/ast/AstExpression.ts';
import { AstExpressionBinary } from '../../data/ast/AstExpressionBinary.ts';
import { AstExpressionCall } from '../../data/ast/AstExpressionCall.ts';
import { AstExpressionFunction } from '../../data/ast/AstExpressionFunction.ts';
import { AstExpressionIdentifier } from '../../data/ast/AstExpressionIdentifier.ts';
import { AstExpressionLiteral } from '../../data/ast/AstExpressionLiteral.ts';
import { AstExpressionLookup } from '../../data/ast/AstExpressionLookup.ts';
import { AstExpressionObject } from '../../data/ast/AstExpressionObject.ts';
import { AstExpressionParenthesis } from '../../data/ast/AstExpressionParenthesis.ts';
import { AstExpressionRun } from '../../data/ast/AstExpressionRun.ts';
import { AstExpressionTyping } from '../../data/ast/AstExpressionTyping.ts';
import { AstExpressionUnary } from '../../data/ast/AstExpressionUnary.ts';
import { AstModule } from '../../data/ast/AstModule.ts';
import { AstStatement } from '../../data/ast/AstStatement.ts';
import { AstStatementBlock } from '../../data/ast/AstStatementBlock.ts';
import { AstStatementCondition } from '../../data/ast/AstStatementCondition.ts';
import { AstStatementEmpty } from '../../data/ast/AstStatementEmpty.ts';
import { AstStatementExport } from '../../data/ast/AstStatementExport.ts';
import { AstStatementExpression } from '../../data/ast/AstStatementExpression.ts';
import { AstStatementImport } from '../../data/ast/AstStatementImport.ts';
import { AstStatementReturn } from '../../data/ast/AstStatementReturn.ts';
import { AstStatementTypedef } from '../../data/ast/AstStatementTypedef.ts';
import { AstStatementUnsafe } from '../../data/ast/AstStatementUnsafe.ts';
import { AstStatementVariable } from '../../data/ast/AstStatementVariable.ts';
import { AstStatementWhile } from '../../data/ast/AstStatementWhile.ts';
import { AstType } from '../../data/ast/AstType.ts';
import { AstTypeBinary } from '../../data/ast/AstTypeBinary.ts';
import { AstTypeFunction } from '../../data/ast/AstTypeFunction.ts';
import { AstTypeIdentifier } from '../../data/ast/AstTypeIdentifier.ts';
import { AstTypeObject } from '../../data/ast/AstTypeObject.ts';
import { AstTypeParenthesis } from '../../data/ast/AstTypeParenthesis.ts';
import { AstTypePrimitive } from '../../data/ast/AstTypePrimitive.ts';

export type RecursorSimplifiedFunction<Ast, Scope> = (
  next: () => void,
  ast: Ast,
  scope: Scope,
) => void;

export interface RecursorSimplified<Scope> {
  recurseModule?: RecursorSimplifiedFunction<AstModule, Scope>;
  recurseBlock?: RecursorSimplifiedFunction<AstBlock, Scope>;

  recurseStatement?: RecursorSimplifiedFunction<AstStatement, Scope>;
  recurseStatementImport?: RecursorSimplifiedFunction<AstStatementImport, Scope>;
  recurseStatementExport?: RecursorSimplifiedFunction<AstStatementExport, Scope>;
  recurseStatementVariable?: RecursorSimplifiedFunction<AstStatementVariable, Scope>;
  recurseStatementTypedef?: RecursorSimplifiedFunction<AstStatementTypedef, Scope>;
  recurseStatementBlock?: RecursorSimplifiedFunction<AstStatementBlock, Scope>;
  recurseStatementWhile?: RecursorSimplifiedFunction<AstStatementWhile, Scope>;
  recurseStatementCondition?: RecursorSimplifiedFunction<AstStatementCondition, Scope>;
  recurseStatementReturn?: RecursorSimplifiedFunction<AstStatementReturn, Scope>;
  recurseStatementUnsafe?: RecursorSimplifiedFunction<AstStatementUnsafe, Scope>;
  recurseStatementExpression?: RecursorSimplifiedFunction<AstStatementExpression, Scope>;
  recurseStatementEmpty?: RecursorSimplifiedFunction<AstStatementEmpty, Scope>;

  recurseExpression?: RecursorSimplifiedFunction<AstExpression, Scope>;
  recurseExpressionCall?: RecursorSimplifiedFunction<AstExpressionCall, Scope>;
  recurseExpressionIdentifier?: RecursorSimplifiedFunction<AstExpressionIdentifier, Scope>;
  recurseExpressionLiteral?: RecursorSimplifiedFunction<AstExpressionLiteral, Scope>;
  recurseExpressionFunction?: RecursorSimplifiedFunction<AstExpressionFunction, Scope>;
  recurseExpressionObject?: RecursorSimplifiedFunction<AstExpressionObject, Scope>;
  recurseExpressionRun?: RecursorSimplifiedFunction<AstExpressionRun, Scope>;
  recurseExpressionLookup?: RecursorSimplifiedFunction<AstExpressionLookup, Scope>;
  recurseExpressionUnary?: RecursorSimplifiedFunction<AstExpressionUnary, Scope>;
  recurseExpressionBinary?: RecursorSimplifiedFunction<AstExpressionBinary, Scope>;
  recurseExpressionTyping?: RecursorSimplifiedFunction<AstExpressionTyping, Scope>;
  recurseExpressionParenthesis?: RecursorSimplifiedFunction<AstExpressionParenthesis, Scope>;

  recurseAnnotationType?: RecursorSimplifiedFunction<AstAnnotationType, Scope>;
  recurseAnnotationTemplate?: RecursorSimplifiedFunction<AstAnnotationTemplate, Scope>;

  recurseType?: RecursorSimplifiedFunction<AstType, Scope>;
  recurseTypeParenthesis?: RecursorSimplifiedFunction<AstTypeParenthesis, Scope>;
  recurseTypeIdentifier?: RecursorSimplifiedFunction<AstTypeIdentifier, Scope>;
  recurseTypePrimitive?: RecursorSimplifiedFunction<AstTypePrimitive, Scope>;
  recurseTypeFunction?: RecursorSimplifiedFunction<AstTypeFunction, Scope>;
  recurseTypeObject?: RecursorSimplifiedFunction<AstTypeObject, Scope>;
  recurseTypeBinary?: RecursorSimplifiedFunction<AstTypeBinary, Scope>;
}
