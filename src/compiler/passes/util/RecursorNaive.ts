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

export type RecursorNaiveFunction<Ast, Scope> = (
  ast: Ast,
  scope: Scope,
) => void;

export interface RecursorNaive<Scope> {
  recurseModule?: RecursorNaiveFunction<AstModule, Scope>;
  recurseBlock?: RecursorNaiveFunction<AstBlock, Scope>;

  recurseStatement?: RecursorNaiveFunction<AstStatement, Scope>;
  recurseStatementImport?: RecursorNaiveFunction<AstStatementImport, Scope>;
  recurseStatementExport?: RecursorNaiveFunction<AstStatementExport, Scope>;
  recurseStatementVariable?: RecursorNaiveFunction<AstStatementVariable, Scope>;
  recurseStatementTypedef?: RecursorNaiveFunction<AstStatementTypedef, Scope>;
  recurseStatementBlock?: RecursorNaiveFunction<AstStatementBlock, Scope>;
  recurseStatementWhile?: RecursorNaiveFunction<AstStatementWhile, Scope>;
  recurseStatementCondition?: RecursorNaiveFunction<AstStatementCondition, Scope>;
  recurseStatementReturn?: RecursorNaiveFunction<AstStatementReturn, Scope>;
  recurseStatementUnsafe?: RecursorNaiveFunction<AstStatementUnsafe, Scope>;
  recurseStatementExpression?: RecursorNaiveFunction<AstStatementExpression, Scope>;
  recurseStatementEmpty?: RecursorNaiveFunction<AstStatementEmpty, Scope>;

  recurseExpression?: RecursorNaiveFunction<AstExpression, Scope>;
  recurseExpressionCall?: RecursorNaiveFunction<AstExpressionCall, Scope>;
  recurseExpressionIdentifier?: RecursorNaiveFunction<AstExpressionIdentifier, Scope>;
  recurseExpressionLiteral?: RecursorNaiveFunction<AstExpressionLiteral, Scope>;
  recurseExpressionFunction?: RecursorNaiveFunction<AstExpressionFunction, Scope>;
  recurseExpressionObject?: RecursorNaiveFunction<AstExpressionObject, Scope>;
  recurseExpressionRun?: RecursorNaiveFunction<AstExpressionRun, Scope>;
  recurseExpressionLookup?: RecursorNaiveFunction<AstExpressionLookup, Scope>;
  recurseExpressionUnary?: RecursorNaiveFunction<AstExpressionUnary, Scope>;
  recurseExpressionBinary?: RecursorNaiveFunction<AstExpressionBinary, Scope>;
  recurseExpressionTyping?: RecursorNaiveFunction<AstExpressionTyping, Scope>;
  recurseExpressionParenthesis?: RecursorNaiveFunction<AstExpressionParenthesis, Scope>;

  recurseAnnotationType?: RecursorNaiveFunction<AstAnnotationType, Scope>;
  recurseAnnotationTemplate?: RecursorNaiveFunction<AstAnnotationTemplate, Scope>;

  recurseType?: RecursorNaiveFunction<AstType, Scope>;
  recurseTypeParenthesis?: RecursorNaiveFunction<AstTypeParenthesis, Scope>;
  recurseTypeIdentifier?: RecursorNaiveFunction<AstTypeIdentifier, Scope>;
  recurseTypePrimitive?: RecursorNaiveFunction<AstTypePrimitive, Scope>;
  recurseTypeFunction?: RecursorNaiveFunction<AstTypeFunction, Scope>;
  recurseTypeObject?: RecursorNaiveFunction<AstTypeObject, Scope>;
  recurseTypeBinary?: RecursorNaiveFunction<AstTypeBinary, Scope>;
}
