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

export function makeRecursorPassNaive<Scope>(
  naives: RecursorNaive<Scope>,
  scoper?: (parent: Scope) => Scope,
): (scope: Scope) => RecursorPass {
  return (scope: Scope) => {
    const stack = new RecursorStack(scope, scoper ?? ((v) => v));

    const passNaive: RecursorPassHolder = {};

    const standardModule = makeFromStandard(passNaive, recurseModule);
    const standardBlock = makeFromStandard(passNaive, recurseBlock);

    const standardExpression = makeFromStandard(passNaive, recurseExpression);
    const standardExpressionCall = makeFromStandard(passNaive, recurseExpressionCall);
    const standardExpressionIdentifier = makeFromStandard(passNaive, recurseExpressionIdentifier);
    const standardExpressionFunction = makeFromStandard(passNaive, recurseExpressionFunction);
    const standardExpressionObject = makeFromStandard(passNaive, recurseExpressionObject);
    const standardExpressionRun = makeFromStandard(passNaive, recurseExpressionRun);
    const standardExpressionLookup = makeFromStandard(passNaive, recurseExpressionLookup);
    const standardExpressionLiteral = makeFromStandard(passNaive, recurseExpressionLiteral);
    const standardExpressionUnary = makeFromStandard(passNaive, recurseExpressionUnary);
    const standardExpressionBinary = makeFromStandard(passNaive, recurseExpressionBinary);
    const standardExpressionTyping = makeFromStandard(passNaive, recurseExpressionTyping);
    const standardExpressionParenthesis = makeFromStandard(passNaive, recurseExpressionParenthesis);

    const standardAnnotationType = makeFromStandard(passNaive, recurseAnnotationType);
    const standardAnnotationTemplate = makeFromStandard(passNaive, recurseAnnotationTemplate);

    const standardType = makeFromStandard(passNaive, recurseType);
    const standardTypeParenthesis = makeFromStandard(passNaive, recurseTypeParenthesis);
    const standardTypeIdentifier = makeFromStandard(passNaive, recurseTypeIdentifier);
    const standardTypePrimitive = makeFromStandard(passNaive, recurseTypePrimitive);
    const standardTypeBinary = makeFromStandard(passNaive, recurseTypeBinary);
    const standardTypeFunction = makeFromStandard(passNaive, recurseTypeFunction);
    const standardTypeObject = makeFromStandard(passNaive, recurseTypeObject);

    const standardStatement = makeFromStandard(passNaive, recurseStatement);
    const standardStatementImport = makeFromStandard(passNaive, recurseStatementImport);
    const standardStatementExport = makeFromStandard(passNaive, recurseStatementExport);
    const standardStatementVariable = makeFromStandard(passNaive, recurseStatementVariable);
    const standardStatementTypedef = makeFromStandard(passNaive, recurseStatementTypedef);
    const standardStatementBlock = makeFromStandard(passNaive, recurseStatementBlock);
    const standardStatementWhile = makeFromStandard(passNaive, recurseStatementWhile);
    const standardStatementCondition = makeFromStandard(passNaive, recurseStatementCondition);
    const standardStatementReturn = makeFromStandard(passNaive, recurseStatementReturn);
    const standardStatementUnsafe = makeFromStandard(passNaive, recurseStatementUnsafe);
    const standardStatementExpression = makeFromStandard(passNaive, recurseStatementExpression);
    const standardStatementEmpty = makeFromStandard(passNaive, recurseStatementEmpty);

    passNaive.value = {
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

    return passNaive.value;
  };
}
