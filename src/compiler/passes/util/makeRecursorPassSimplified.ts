import { Stack } from '../../lib/core/data/Stack.ts';
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
import { RecursorPass, RecursorPassFunction } from './RecursorPass.ts';
import { RecursorSimplified, RecursorSimplifiedFunction } from './RecursorSimplified.ts';

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

/**
 * Make a recursion pass function:
 *  - deepen the scope
 *  - call the standard recursion logic that will call custom logic
 */
function makeFromStandard<Scope, Ast>(
  pass: RecursorPassHolder,
  standard: RecursorPassStandard<Ast>,
): RecursorPassFunction<Ast> {
  return (ast: Ast) => {
    standard(pass.value!, ast);
  };
}

/**
 * Make a logic pass function:
 *  - no-op and go back to standard if undefined
 *  - if defined, call logic with recursion call as parameter
 */
function makeFromSimplified<Scope, Ast>(
  stack: RecursorStack<Scope>,
  passStandard: RecursorPassFunction<Ast>,
  simplified?: RecursorSimplifiedFunction<Ast, Scope>,
): RecursorPassFunction<Ast> {
  return (ast: Ast) => {
    if (simplified) {
      const child = stack.push();
      simplified(
        () => {
          passStandard(ast);
        },
        ast,
        child,
      );
      stack.pop();
    } else {
      passStandard(ast);
    }
  };
}

export function makeRecursorPassSimplified<Scope>(
  recursors: RecursorSimplified<Scope>,
  scoper?: (parent: Scope) => Scope,
): (scope: Scope) => RecursorPass {
  return (scope: Scope) => {
    const stack = new RecursorStack(scope, scoper ?? ((v) => v));

    const passSimplified: RecursorPassHolder = {};

    const passStandard: RecursorPass = {
      recurseModule: makeFromStandard(passSimplified, recurseModule),
      recurseBlock: makeFromStandard(passSimplified, recurseBlock),

      recurseExpression: makeFromStandard(passSimplified, recurseExpression),
      recurseExpressionCall: makeFromStandard(passSimplified, recurseExpressionCall),
      recurseExpressionIdentifier: makeFromStandard(passSimplified, recurseExpressionIdentifier),
      recurseExpressionFunction: makeFromStandard(passSimplified, recurseExpressionFunction),
      recurseExpressionObject: makeFromStandard(passSimplified, recurseExpressionObject),
      recurseExpressionRun: makeFromStandard(passSimplified, recurseExpressionRun),
      recurseExpressionLookup: makeFromStandard(passSimplified, recurseExpressionLookup),
      recurseExpressionLiteral: makeFromStandard(passSimplified, recurseExpressionLiteral),
      recurseExpressionUnary: makeFromStandard(passSimplified, recurseExpressionUnary),
      recurseExpressionBinary: makeFromStandard(passSimplified, recurseExpressionBinary),
      recurseExpressionTyping: makeFromStandard(passSimplified, recurseExpressionTyping),
      recurseExpressionParenthesis: makeFromStandard(passSimplified, recurseExpressionParenthesis),

      recurseAnnotationType: makeFromStandard(passSimplified, recurseAnnotationType),
      recurseAnnotationTemplate: makeFromStandard(passSimplified, recurseAnnotationTemplate),

      recurseType: makeFromStandard(passSimplified, recurseType),
      recurseTypeParenthesis: makeFromStandard(passSimplified, recurseTypeParenthesis),
      recurseTypeIdentifier: makeFromStandard(passSimplified, recurseTypeIdentifier),
      recurseTypePrimitive: makeFromStandard(passSimplified, recurseTypePrimitive),
      recurseTypeBinary: makeFromStandard(passSimplified, recurseTypeBinary),
      recurseTypeFunction: makeFromStandard(passSimplified, recurseTypeFunction),
      recurseTypeObject: makeFromStandard(passSimplified, recurseTypeObject),

      recurseStatement: makeFromStandard(passSimplified, recurseStatement),
      recurseStatementImport: makeFromStandard(passSimplified, recurseStatementImport),
      recurseStatementExport: makeFromStandard(passSimplified, recurseStatementExport),
      recurseStatementVariable: makeFromStandard(passSimplified, recurseStatementVariable),
      recurseStatementTypedef: makeFromStandard(passSimplified, recurseStatementTypedef),
      recurseStatementBlock: makeFromStandard(passSimplified, recurseStatementBlock),
      recurseStatementWhile: makeFromStandard(passSimplified, recurseStatementWhile),
      recurseStatementCondition: makeFromStandard(passSimplified, recurseStatementCondition),
      recurseStatementConditionBranch: makeFromStandard(passSimplified, recurseStatementConditionBranch),
      recurseStatementReturn: makeFromStandard(passSimplified, recurseStatementReturn),
      recurseStatementUnsafe: makeFromStandard(passSimplified, recurseStatementUnsafe),
      recurseStatementExpression: makeFromStandard(passSimplified, recurseStatementExpression),
      recurseStatementEmpty: makeFromStandard(passSimplified, recurseStatementEmpty),
    };

    passSimplified.value = {
      recurseModule: makeFromSimplified(stack, passStandard.recurseModule, recursors.recurseModule),
      recurseBlock: makeFromSimplified(stack, passStandard.recurseBlock, recursors.recurseBlock),

      recurseExpression: makeFromSimplified(stack, passStandard.recurseExpression, recursors.recurseExpression),
      recurseExpressionCall: makeFromSimplified(stack, passStandard.recurseExpressionCall, recursors.recurseExpressionCall),
      recurseExpressionIdentifier: makeFromSimplified(
        stack,
        passStandard.recurseExpressionIdentifier,
        recursors.recurseExpressionIdentifier,
      ),
      recurseExpressionFunction: makeFromSimplified(stack, passStandard.recurseExpressionFunction, recursors.recurseExpressionFunction),
      recurseExpressionObject: makeFromSimplified(stack, passStandard.recurseExpressionObject, recursors.recurseExpressionObject),
      recurseExpressionRun: makeFromSimplified(stack, passStandard.recurseExpressionRun, recursors.recurseExpressionRun),
      recurseExpressionLookup: makeFromSimplified(stack, passStandard.recurseExpressionLookup, recursors.recurseExpressionLookup),
      recurseExpressionLiteral: makeFromSimplified(stack, passStandard.recurseExpressionLiteral, recursors.recurseExpressionLiteral),
      recurseExpressionUnary: makeFromSimplified(stack, passStandard.recurseExpressionUnary, recursors.recurseExpressionUnary),
      recurseExpressionBinary: makeFromSimplified(stack, passStandard.recurseExpressionBinary, recursors.recurseExpressionBinary),
      recurseExpressionTyping: makeFromSimplified(stack, passStandard.recurseExpressionTyping, recursors.recurseExpressionTyping),
      recurseExpressionParenthesis: makeFromSimplified(
        stack,
        passStandard.recurseExpressionParenthesis,
        recursors.recurseExpressionParenthesis,
      ),

      recurseAnnotationType: makeFromSimplified(stack, passStandard.recurseAnnotationType, recursors.recurseAnnotationType),
      recurseAnnotationTemplate: makeFromSimplified(stack, passStandard.recurseAnnotationTemplate, recursors.recurseAnnotationTemplate),

      recurseType: makeFromSimplified(stack, passStandard.recurseType, recursors.recurseType),
      recurseTypeParenthesis: makeFromSimplified(stack, passStandard.recurseTypeParenthesis, recursors.recurseTypeParenthesis),
      recurseTypeIdentifier: makeFromSimplified(stack, passStandard.recurseTypeIdentifier, recursors.recurseTypeIdentifier),
      recurseTypePrimitive: makeFromSimplified(stack, passStandard.recurseTypePrimitive, recursors.recurseTypePrimitive),
      recurseTypeBinary: makeFromSimplified(stack, passStandard.recurseTypeBinary, recursors.recurseTypeBinary),
      recurseTypeFunction: makeFromSimplified(stack, passStandard.recurseTypeFunction, recursors.recurseTypeFunction),
      recurseTypeObject: makeFromSimplified(stack, passStandard.recurseTypeObject, recursors.recurseTypeObject),

      recurseStatement: makeFromSimplified(stack, passStandard.recurseStatement, recursors.recurseStatement),
      recurseStatementImport: makeFromSimplified(stack, passStandard.recurseStatementImport, recursors.recurseStatementImport),
      recurseStatementExport: makeFromSimplified(stack, passStandard.recurseStatementExport, recursors.recurseStatementExport),
      recurseStatementVariable: makeFromSimplified(stack, passStandard.recurseStatementVariable, recursors.recurseStatementVariable),
      recurseStatementTypedef: makeFromSimplified(stack, passStandard.recurseStatementTypedef, recursors.recurseStatementTypedef),
      recurseStatementBlock: makeFromSimplified(stack, passStandard.recurseStatementBlock, recursors.recurseStatementBlock),
      recurseStatementWhile: makeFromSimplified(stack, passStandard.recurseStatementWhile, recursors.recurseStatementWhile),
      recurseStatementCondition: makeFromSimplified(stack, passStandard.recurseStatementCondition, recursors.recurseStatementCondition),
      recurseStatementConditionBranch: makeFromSimplified(
        stack,
        passStandard.recurseStatementConditionBranch,
        recursors.recurseStatementConditionBranch,
      ),
      recurseStatementReturn: makeFromSimplified(stack, passStandard.recurseStatementReturn, recursors.recurseStatementReturn),
      recurseStatementUnsafe: makeFromSimplified(stack, passStandard.recurseStatementUnsafe, recursors.recurseStatementUnsafe),
      recurseStatementExpression: makeFromSimplified(stack, passStandard.recurseStatementExpression, recursors.recurseStatementExpression),
      recurseStatementEmpty: makeFromSimplified(stack, passStandard.recurseStatementEmpty, recursors.recurseStatementEmpty),
    };

    return passSimplified.value;
  };
}
