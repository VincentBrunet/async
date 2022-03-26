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
import { RecursorPass, RecursorPassFunction, RecursorPassHolder, RecursorPassStandard } from './RecursorPass.ts';
import { RecursorNaive, RecursorNaiveFunction } from './RecursorNaive.ts';
import { RecursorStack } from './RecursorStack.ts';

/**
 * Make a recursion pass function:
 *  - deepen the scope
 *  - call the standard recursion logic that will call custom logic
 */
function makeFromStandard<Ast>(
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
function makeFromNaive<Scope, Ast>(
  stack: RecursorStack<Scope>,
  passStandard: RecursorPassFunction<Ast>,
  naive?: RecursorNaiveFunction<Ast, Scope>,
): RecursorPassFunction<Ast> {
  return (ast: Ast) => {
    if (naive) {
      const child = stack.push();
      naive(ast, child);
      passStandard(ast);
      stack.pop();
    } else {
      passStandard(ast);
    }
  };
}

export function makeRecursorPassBfs<Scope>(
  naives: RecursorNaive<Scope>,
  scoper?: (parent: Scope) => Scope,
): (scope: Scope) => RecursorPass {
  return (scope: Scope) => {
    const stack = new RecursorStack(scope, scoper ?? ((v) => v));

    const passBfs: RecursorPassHolder = {};

    const standardModule = makeFromStandard(passBfs, recurseModule);
    const standardBlock = makeFromStandard(passBfs, recurseBlock);

    const standardExpression = makeFromStandard(passBfs, recurseExpression);
    const standardExpressionCall = makeFromStandard(passBfs, recurseExpressionCall);
    const standardExpressionIdentifier = makeFromStandard(passBfs, recurseExpressionIdentifier);
    const standardExpressionFunction = makeFromStandard(passBfs, recurseExpressionFunction);
    const standardExpressionObject = makeFromStandard(passBfs, recurseExpressionObject);
    const standardExpressionRun = makeFromStandard(passBfs, recurseExpressionRun);
    const standardExpressionLookup = makeFromStandard(passBfs, recurseExpressionLookup);
    const standardExpressionLiteral = makeFromStandard(passBfs, recurseExpressionLiteral);
    const standardExpressionUnary = makeFromStandard(passBfs, recurseExpressionUnary);
    const standardExpressionBinary = makeFromStandard(passBfs, recurseExpressionBinary);
    const standardExpressionTyping = makeFromStandard(passBfs, recurseExpressionTyping);
    const standardExpressionParenthesis = makeFromStandard(passBfs, recurseExpressionParenthesis);

    const standardAnnotationType = makeFromStandard(passBfs, recurseAnnotationType);
    const standardAnnotationTemplate = makeFromStandard(passBfs, recurseAnnotationTemplate);

    const standardType = makeFromStandard(passBfs, recurseType);
    const standardTypeParenthesis = makeFromStandard(passBfs, recurseTypeParenthesis);
    const standardTypeIdentifier = makeFromStandard(passBfs, recurseTypeIdentifier);
    const standardTypePrimitive = makeFromStandard(passBfs, recurseTypePrimitive);
    const standardTypeBinary = makeFromStandard(passBfs, recurseTypeBinary);
    const standardTypeFunction = makeFromStandard(passBfs, recurseTypeFunction);
    const standardTypeObject = makeFromStandard(passBfs, recurseTypeObject);

    const standardStatement = makeFromStandard(passBfs, recurseStatement);
    const standardStatementImport = makeFromStandard(passBfs, recurseStatementImport);
    const standardStatementExport = makeFromStandard(passBfs, recurseStatementExport);
    const standardStatementVariable = makeFromStandard(passBfs, recurseStatementVariable);
    const standardStatementTypedef = makeFromStandard(passBfs, recurseStatementTypedef);
    const standardStatementBlock = makeFromStandard(passBfs, recurseStatementBlock);
    const standardStatementWhile = makeFromStandard(passBfs, recurseStatementWhile);
    const standardStatementCondition = makeFromStandard(passBfs, recurseStatementCondition);
    const standardStatementReturn = makeFromStandard(passBfs, recurseStatementReturn);
    const standardStatementUnsafe = makeFromStandard(passBfs, recurseStatementUnsafe);
    const standardStatementExpression = makeFromStandard(passBfs, recurseStatementExpression);
    const standardStatementEmpty = makeFromStandard(passBfs, recurseStatementEmpty);

    passBfs.value = {
      recurseModule: makeFromNaive(stack, standardModule, naives.recurseModule),
      recurseBlock: makeFromNaive(stack, standardBlock, naives.recurseBlock),

      recurseExpression: makeFromNaive(stack, standardExpression, naives.recurseExpression),
      recurseExpressionCall: makeFromNaive(stack, standardExpressionCall, naives.recurseExpressionCall),
      recurseExpressionIdentifier: makeFromNaive(stack, standardExpressionIdentifier, naives.recurseExpressionIdentifier),
      recurseExpressionFunction: makeFromNaive(stack, standardExpressionFunction, naives.recurseExpressionFunction),
      recurseExpressionObject: makeFromNaive(stack, standardExpressionObject, naives.recurseExpressionObject),
      recurseExpressionRun: makeFromNaive(stack, standardExpressionRun, naives.recurseExpressionRun),
      recurseExpressionLookup: makeFromNaive(stack, standardExpressionLookup, naives.recurseExpressionLookup),
      recurseExpressionLiteral: makeFromNaive(stack, standardExpressionLiteral, naives.recurseExpressionLiteral),
      recurseExpressionUnary: makeFromNaive(stack, standardExpressionUnary, naives.recurseExpressionUnary),
      recurseExpressionBinary: makeFromNaive(stack, standardExpressionBinary, naives.recurseExpressionBinary),
      recurseExpressionTyping: makeFromNaive(stack, standardExpressionTyping, naives.recurseExpressionTyping),
      recurseExpressionParenthesis: makeFromNaive(stack, standardExpressionParenthesis, naives.recurseExpressionParenthesis),

      recurseAnnotationType: makeFromNaive(stack, standardAnnotationType, naives.recurseAnnotationType),
      recurseAnnotationTemplate: makeFromNaive(stack, standardAnnotationTemplate, naives.recurseAnnotationTemplate),

      recurseType: makeFromNaive(stack, standardType, naives.recurseType),
      recurseTypeParenthesis: makeFromNaive(stack, standardTypeParenthesis, naives.recurseTypeParenthesis),
      recurseTypeIdentifier: makeFromNaive(stack, standardTypeIdentifier, naives.recurseTypeIdentifier),
      recurseTypePrimitive: makeFromNaive(stack, standardTypePrimitive, naives.recurseTypePrimitive),
      recurseTypeBinary: makeFromNaive(stack, standardTypeBinary, naives.recurseTypeBinary),
      recurseTypeFunction: makeFromNaive(stack, standardTypeFunction, naives.recurseTypeFunction),
      recurseTypeObject: makeFromNaive(stack, standardTypeObject, naives.recurseTypeObject),

      recurseStatement: makeFromNaive(stack, standardStatement, naives.recurseStatement),
      recurseStatementImport: makeFromNaive(stack, standardStatementImport, naives.recurseStatementImport),
      recurseStatementExport: makeFromNaive(stack, standardStatementExport, naives.recurseStatementExport),
      recurseStatementVariable: makeFromNaive(stack, standardStatementVariable, naives.recurseStatementVariable),
      recurseStatementTypedef: makeFromNaive(stack, standardStatementTypedef, naives.recurseStatementTypedef),
      recurseStatementBlock: makeFromNaive(stack, standardStatementBlock, naives.recurseStatementBlock),
      recurseStatementWhile: makeFromNaive(stack, standardStatementWhile, naives.recurseStatementWhile),
      recurseStatementCondition: makeFromNaive(stack, standardStatementCondition, naives.recurseStatementCondition),
      recurseStatementReturn: makeFromNaive(stack, standardStatementReturn, naives.recurseStatementReturn),
      recurseStatementUnsafe: makeFromNaive(stack, standardStatementUnsafe, naives.recurseStatementUnsafe),
      recurseStatementExpression: makeFromNaive(stack, standardStatementExpression, naives.recurseStatementExpression),
      recurseStatementEmpty: makeFromNaive(stack, standardStatementEmpty, naives.recurseStatementEmpty),
    };

    return passBfs.value;
  };
}
