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

export type RecursorPassFunction<Ast> = (
  ast: Ast,
) => void;

export interface RecursorPass {
  recurseModule: RecursorPassFunction<AstModule>;
  recurseBlock: RecursorPassFunction<AstBlock>;

  recurseStatement: RecursorPassFunction<AstStatement>;
  recurseStatementImport: RecursorPassFunction<AstStatementImport>;
  recurseStatementExport: RecursorPassFunction<AstStatementExport>;
  recurseStatementVariable: RecursorPassFunction<AstStatementVariable>;
  recurseStatementTypedef: RecursorPassFunction<AstStatementTypedef>;
  recurseStatementBlock: RecursorPassFunction<AstStatementBlock>;
  recurseStatementWhile: RecursorPassFunction<AstStatementWhile>;
  recurseStatementCondition: RecursorPassFunction<AstStatementCondition>;
  recurseStatementReturn: RecursorPassFunction<AstStatementReturn>;
  recurseStatementUnsafe: RecursorPassFunction<AstStatementUnsafe>;
  recurseStatementExpression: RecursorPassFunction<AstStatementExpression>;
  recurseStatementEmpty: RecursorPassFunction<AstStatementEmpty>;

  recurseExpression: RecursorPassFunction<AstExpression>;
  recurseExpressionCall: RecursorPassFunction<AstExpressionCall>;
  recurseExpressionIdentifier: RecursorPassFunction<AstExpressionIdentifier>;
  recurseExpressionLiteral: RecursorPassFunction<AstExpressionLiteral>;
  recurseExpressionFunction: RecursorPassFunction<AstExpressionFunction>;
  recurseExpressionObject: RecursorPassFunction<AstExpressionObject>;
  recurseExpressionRun: RecursorPassFunction<AstExpressionRun>;
  recurseExpressionLookup: RecursorPassFunction<AstExpressionLookup>;
  recurseExpressionUnary: RecursorPassFunction<AstExpressionUnary>;
  recurseExpressionBinary: RecursorPassFunction<AstExpressionBinary>;
  recurseExpressionTyping: RecursorPassFunction<AstExpressionTyping>;
  recurseExpressionParenthesis: RecursorPassFunction<AstExpressionParenthesis>;

  recurseAnnotationType: RecursorPassFunction<AstAnnotationType>;
  recurseAnnotationTemplate: RecursorPassFunction<AstAnnotationTemplate>;

  recurseType: RecursorPassFunction<AstType>;
  recurseTypeParenthesis: RecursorPassFunction<AstTypeParenthesis>;
  recurseTypeIdentifier: RecursorPassFunction<AstTypeIdentifier>;
  recurseTypePrimitive: RecursorPassFunction<AstTypePrimitive>;
  recurseTypeFunction: RecursorPassFunction<AstTypeFunction>;
  recurseTypeObject: RecursorPassFunction<AstTypeObject>;
  recurseTypeBinary: RecursorPassFunction<AstTypeBinary>;
}
