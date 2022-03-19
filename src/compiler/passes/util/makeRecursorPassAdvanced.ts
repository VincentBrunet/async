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
import { recurseStatementConditionBranch } from './recurseStatementConditionBranch.ts';
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
import { RecursorPass, RecursorPassFunction } from './RecursorPass.ts';
import { Stack } from '../../lib/core/data/Stack.ts';

type RecursorPassHolder = { value?: RecursorPass };

type RecursorPassStandard<Ast> = (r: RecursorPass, ast: Ast) => void;

class RecursorStack<Scope> {
  private scoper: (parent: Scope) => Scope;
  private stack: Stack<Scope>;
  constructor(scope: Scope, scoper: (parent: Scope) => Scope) {
    this.scoper = scoper;
    this.stack = new Stack();
    this.stack.push(scope);
  }
  public push(): Scope {
    const child = this.scoper(this.stack.peek()!);
    this.stack.push(child);
    return child;
  }
  public pop(): void {
    this.stack.pop();
  }
}

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
  recursors: RecursorAdvanced<Scope>,
  scoper?: (parent: Scope) => Scope,
): (scope: Scope) => RecursorPass {
  return (scope: Scope) => {
    const stack = new RecursorStack(scope, scoper ?? ((v) => v));

    const pass: RecursorPassHolder = {};
    pass.value = {
      recurseModule: make(stack, pass, recurseModule, recursors.recurseModule),
      recurseBlock: make(stack, pass, recurseBlock, recursors.recurseBlock),

      recurseExpression: make(stack, pass, recurseExpression, recursors.recurseExpression),
      recurseExpressionCall: make(stack, pass, recurseExpressionCall, recursors.recurseExpressionCall),
      recurseExpressionIdentifier: make(stack, pass, recurseExpressionIdentifier, recursors.recurseExpressionIdentifier),
      recurseExpressionFunction: make(stack, pass, recurseExpressionFunction, recursors.recurseExpressionFunction),
      recurseExpressionObject: make(stack, pass, recurseExpressionObject, recursors.recurseExpressionObject),
      recurseExpressionRun: make(stack, pass, recurseExpressionRun, recursors.recurseExpressionRun),
      recurseExpressionLookup: make(stack, pass, recurseExpressionLookup, recursors.recurseExpressionLookup),
      recurseExpressionLiteral: make(stack, pass, recurseExpressionLiteral, recursors.recurseExpressionLiteral),
      recurseExpressionUnary: make(stack, pass, recurseExpressionUnary, recursors.recurseExpressionUnary),
      recurseExpressionBinary: make(stack, pass, recurseExpressionBinary, recursors.recurseExpressionBinary),
      recurseExpressionTyping: make(stack, pass, recurseExpressionTyping, recursors.recurseExpressionTyping),
      recurseExpressionParenthesis: make(stack, pass, recurseExpressionParenthesis, recursors.recurseExpressionParenthesis),

      recurseAnnotationType: make(stack, pass, recurseAnnotationType, recursors.recurseAnnotationType),
      recurseAnnotationTemplate: make(stack, pass, recurseAnnotationTemplate, recursors.recurseAnnotationTemplate),

      recurseType: make(stack, pass, recurseType, recursors.recurseType),
      recurseTypeParenthesis: make(stack, pass, recurseTypeParenthesis, recursors.recurseTypeParenthesis),
      recurseTypeIdentifier: make(stack, pass, recurseTypeIdentifier, recursors.recurseTypeIdentifier),
      recurseTypePrimitive: make(stack, pass, recurseTypePrimitive, recursors.recurseTypePrimitive),
      recurseTypeBinary: make(stack, pass, recurseTypeBinary, recursors.recurseTypeBinary),
      recurseTypeFunction: make(stack, pass, recurseTypeFunction, recursors.recurseTypeFunction),
      recurseTypeObject: make(stack, pass, recurseTypeObject, recursors.recurseTypeObject),

      recurseStatement: make(stack, pass, recurseStatement, recursors.recurseStatement),
      recurseStatementImport: make(stack, pass, recurseStatementImport, recursors.recurseStatementImport),
      recurseStatementExport: make(stack, pass, recurseStatementExport, recursors.recurseStatementExport),
      recurseStatementVariable: make(stack, pass, recurseStatementVariable, recursors.recurseStatementVariable),
      recurseStatementTypedef: make(stack, pass, recurseStatementTypedef, recursors.recurseStatementTypedef),
      recurseStatementBlock: make(stack, pass, recurseStatementBlock, recursors.recurseStatementBlock),
      recurseStatementWhile: make(stack, pass, recurseStatementWhile, recursors.recurseStatementWhile),
      recurseStatementCondition: make(stack, pass, recurseStatementCondition, recursors.recurseStatementCondition),
      recurseStatementConditionBranch: make(stack, pass, recurseStatementConditionBranch, recursors.recurseStatementConditionBranch),
      recurseStatementReturn: make(stack, pass, recurseStatementReturn, recursors.recurseStatementReturn),
      recurseStatementUnsafe: make(stack, pass, recurseStatementUnsafe, recursors.recurseStatementUnsafe),
      recurseStatementExpression: make(stack, pass, recurseStatementExpression, recursors.recurseStatementExpression),
      recurseStatementEmpty: make(stack, pass, recurseStatementEmpty, recursors.recurseStatementEmpty),
    };
    return pass.value;
  };
}
