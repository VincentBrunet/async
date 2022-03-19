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
import { AstStatementCondition, AstStatementConditionBranch } from '../../data/ast/AstStatementCondition.ts';
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
import { RecursorPass } from './RecursorPass.ts';

export type RecursorAdvancedFunction<Ast, Scope> = (
  pass: RecursorPass,
  ast: Ast,
  scope: Scope,
) => void;

export interface RecursorAdvanced<Scope> {
  recurseModule?: RecursorAdvancedFunction<AstModule, Scope>;
  recurseBlock?: RecursorAdvancedFunction<AstBlock, Scope>;

  recurseStatement?: RecursorAdvancedFunction<AstStatement, Scope>;
  recurseStatementImport?: RecursorAdvancedFunction<AstStatementImport, Scope>;
  recurseStatementExport?: RecursorAdvancedFunction<AstStatementExport, Scope>;
  recurseStatementVariable?: RecursorAdvancedFunction<AstStatementVariable, Scope>;
  recurseStatementTypedef?: RecursorAdvancedFunction<AstStatementTypedef, Scope>;
  recurseStatementBlock?: RecursorAdvancedFunction<AstStatementBlock, Scope>;
  recurseStatementWhile?: RecursorAdvancedFunction<AstStatementWhile, Scope>;
  recurseStatementCondition?: RecursorAdvancedFunction<AstStatementCondition, Scope>;
  recurseStatementConditionBranch?: RecursorAdvancedFunction<AstStatementConditionBranch, Scope>;
  recurseStatementReturn?: RecursorAdvancedFunction<AstStatementReturn, Scope>;
  recurseStatementUnsafe?: RecursorAdvancedFunction<AstStatementUnsafe, Scope>;
  recurseStatementExpression?: RecursorAdvancedFunction<AstStatementExpression, Scope>;
  recurseStatementEmpty?: RecursorAdvancedFunction<AstStatementEmpty, Scope>;

  recurseExpression?: RecursorAdvancedFunction<AstExpression, Scope>;
  recurseExpressionCall?: RecursorAdvancedFunction<AstExpressionCall, Scope>;
  recurseExpressionIdentifier?: RecursorAdvancedFunction<AstExpressionIdentifier, Scope>;
  recurseExpressionLiteral?: RecursorAdvancedFunction<AstExpressionLiteral, Scope>;
  recurseExpressionFunction?: RecursorAdvancedFunction<AstExpressionFunction, Scope>;
  recurseExpressionObject?: RecursorAdvancedFunction<AstExpressionObject, Scope>;
  recurseExpressionRun?: RecursorAdvancedFunction<AstExpressionRun, Scope>;
  recurseExpressionLookup?: RecursorAdvancedFunction<AstExpressionLookup, Scope>;
  recurseExpressionUnary?: RecursorAdvancedFunction<AstExpressionUnary, Scope>;
  recurseExpressionBinary?: RecursorAdvancedFunction<AstExpressionBinary, Scope>;
  recurseExpressionTyping?: RecursorAdvancedFunction<AstExpressionTyping, Scope>;
  recurseExpressionParenthesis?: RecursorAdvancedFunction<AstExpressionParenthesis, Scope>;

  recurseAnnotationType?: RecursorAdvancedFunction<AstAnnotationType, Scope>;
  recurseAnnotationTemplate?: RecursorAdvancedFunction<AstAnnotationTemplate, Scope>;

  recurseType?: RecursorAdvancedFunction<AstType, Scope>;
  recurseTypeParenthesis?: RecursorAdvancedFunction<AstTypeParenthesis, Scope>;
  recurseTypeIdentifier?: RecursorAdvancedFunction<AstTypeIdentifier, Scope>;
  recurseTypePrimitive?: RecursorAdvancedFunction<AstTypePrimitive, Scope>;
  recurseTypeFunction?: RecursorAdvancedFunction<AstTypeFunction, Scope>;
  recurseTypeObject?: RecursorAdvancedFunction<AstTypeObject, Scope>;
  recurseTypeBinary?: RecursorAdvancedFunction<AstTypeBinary, Scope>;
}
