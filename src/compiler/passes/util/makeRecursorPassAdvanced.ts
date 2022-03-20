import { recurseAnnotationTemplate } from './recurseAnnotationTemplate.ts';
import { recurseAnnotationType } from './recurseAnnotationType.ts';
import { recurseBlock } from './recurseBlock.ts';
import { recurseExpression } from './recurseExpression.ts';
import { recurseExpressionBinary } from './recurseExpressionBinary.ts';
import { recurseExpressionCall } from './recurseExpressionCall.ts';
import { recurseExpressionFunction } from './recurseExpressionFunction.ts';
import { recurseExpressionIdentifier } from './recurseExpressionIdentifier.ts';
import { recurseExpressionLiteral } from './recurseExpressionLiteral.ts';
import { recurseExpressionLookup } from './recurseExpressionLookup.ts';
import { recurseExpressionObject } from './recurseExpressionObject.ts';
import { recurseExpressionParenthesis } from './recurseExpressionParenthesis.ts';
import { recurseExpressionRun } from './recurseExpressionRun.ts';
import { recurseExpressionTyping } from './recurseExpressionTyping.ts';
import { recurseExpressionUnary } from './recurseExpressionUnary.ts';
import { recurseModule } from './recurseModule.ts';
import { recurseStatement } from './recurseStatement.ts';
import { recurseStatementBlock } from './recurseStatementBlock.ts';
import { recurseStatementCondition } from './recurseStatementCondition.ts';
import { recurseStatementEmpty } from './recurseStatementEmpty.ts';
import { recurseStatementExport } from './recurseStatementExport.ts';
import { recurseStatementExpression } from './recurseStatementExpression.ts';
import { recurseStatementImport } from './recurseStatementImport.ts';
import { recurseStatementReturn } from './recurseStatementReturn.ts';
import { recurseStatementTypedef } from './recurseStatementTypedef.ts';
import { recurseStatementUnsafe } from './recurseStatementUnsafe.ts';
import { recurseStatementVariable } from './recurseStatementVariable.ts';
import { recurseStatementWhile } from './recurseStatementWhile.ts';
import { recurseType } from './recurseType.ts';
import { recurseTypeBinary } from './recurseTypeBinary.ts';
import { recurseTypeFunction } from './recurseTypeFunction.ts';
import { recurseTypeIdentifier } from './recurseTypeIdentifier.ts';
import { recurseTypeObject } from './recurseTypeObject.ts';
import { recurseTypeParenthesis } from './recurseTypeParenthesis.ts';
import { recurseTypePrimitive } from './recurseTypePrimitive.ts';
import { RecursorAdvanced, RecursorAdvancedFunction } from './RecursorAdvanced.ts';
import { RecursorPass, RecursorPassFunction, RecursorPassHolder, RecursorPassStandard } from './RecursorPass.ts';
import { RecursorStack } from './RecursorStack.ts';

function make<Ast, Scope>(
  stack: RecursorStack<Scope>,
  pass: RecursorPassHolder,
  standard: RecursorPassStandard<Ast>,
  advanced?: RecursorAdvancedFunction<Ast, Scope>,
): RecursorPassFunction<Ast> {
  return (ast: Ast) => {
    if (advanced) {
      const child = stack.push();
      advanced(pass.value!, ast, child);
      stack.pop();
    } else {
      standard(pass.value!, ast);
    }
  };
}

export function makeRecursorPassAdvanced<Scope>(
  advanceds: RecursorAdvanced<Scope>,
  scoper?: (parent: Scope) => Scope,
): (scope: Scope) => RecursorPass {
  return (scope: Scope) => {
    const stack = new RecursorStack(scope, scoper ?? ((v) => v));

    const pass: RecursorPassHolder = {};
    pass.value = {
      recurseModule: make(stack, pass, recurseModule, advanceds.recurseModule),
      recurseBlock: make(stack, pass, recurseBlock, advanceds.recurseBlock),

      recurseExpression: make(stack, pass, recurseExpression, advanceds.recurseExpression),
      recurseExpressionCall: make(stack, pass, recurseExpressionCall, advanceds.recurseExpressionCall),
      recurseExpressionIdentifier: make(stack, pass, recurseExpressionIdentifier, advanceds.recurseExpressionIdentifier),
      recurseExpressionFunction: make(stack, pass, recurseExpressionFunction, advanceds.recurseExpressionFunction),
      recurseExpressionObject: make(stack, pass, recurseExpressionObject, advanceds.recurseExpressionObject),
      recurseExpressionRun: make(stack, pass, recurseExpressionRun, advanceds.recurseExpressionRun),
      recurseExpressionLookup: make(stack, pass, recurseExpressionLookup, advanceds.recurseExpressionLookup),
      recurseExpressionLiteral: make(stack, pass, recurseExpressionLiteral, advanceds.recurseExpressionLiteral),
      recurseExpressionUnary: make(stack, pass, recurseExpressionUnary, advanceds.recurseExpressionUnary),
      recurseExpressionBinary: make(stack, pass, recurseExpressionBinary, advanceds.recurseExpressionBinary),
      recurseExpressionTyping: make(stack, pass, recurseExpressionTyping, advanceds.recurseExpressionTyping),
      recurseExpressionParenthesis: make(stack, pass, recurseExpressionParenthesis, advanceds.recurseExpressionParenthesis),

      recurseAnnotationType: make(stack, pass, recurseAnnotationType, advanceds.recurseAnnotationType),
      recurseAnnotationTemplate: make(stack, pass, recurseAnnotationTemplate, advanceds.recurseAnnotationTemplate),

      recurseType: make(stack, pass, recurseType, advanceds.recurseType),
      recurseTypeParenthesis: make(stack, pass, recurseTypeParenthesis, advanceds.recurseTypeParenthesis),
      recurseTypeIdentifier: make(stack, pass, recurseTypeIdentifier, advanceds.recurseTypeIdentifier),
      recurseTypePrimitive: make(stack, pass, recurseTypePrimitive, advanceds.recurseTypePrimitive),
      recurseTypeBinary: make(stack, pass, recurseTypeBinary, advanceds.recurseTypeBinary),
      recurseTypeFunction: make(stack, pass, recurseTypeFunction, advanceds.recurseTypeFunction),
      recurseTypeObject: make(stack, pass, recurseTypeObject, advanceds.recurseTypeObject),

      recurseStatement: make(stack, pass, recurseStatement, advanceds.recurseStatement),
      recurseStatementImport: make(stack, pass, recurseStatementImport, advanceds.recurseStatementImport),
      recurseStatementExport: make(stack, pass, recurseStatementExport, advanceds.recurseStatementExport),
      recurseStatementVariable: make(stack, pass, recurseStatementVariable, advanceds.recurseStatementVariable),
      recurseStatementTypedef: make(stack, pass, recurseStatementTypedef, advanceds.recurseStatementTypedef),
      recurseStatementBlock: make(stack, pass, recurseStatementBlock, advanceds.recurseStatementBlock),
      recurseStatementWhile: make(stack, pass, recurseStatementWhile, advanceds.recurseStatementWhile),
      recurseStatementCondition: make(stack, pass, recurseStatementCondition, advanceds.recurseStatementCondition),
      recurseStatementReturn: make(stack, pass, recurseStatementReturn, advanceds.recurseStatementReturn),
      recurseStatementUnsafe: make(stack, pass, recurseStatementUnsafe, advanceds.recurseStatementUnsafe),
      recurseStatementExpression: make(stack, pass, recurseStatementExpression, advanceds.recurseStatementExpression),
      recurseStatementEmpty: make(stack, pass, recurseStatementEmpty, advanceds.recurseStatementEmpty),
    };
    return pass.value;
  };
}
