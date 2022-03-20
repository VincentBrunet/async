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
import { RecursorSimplified, RecursorSimplifiedFunction } from './RecursorSimplified.ts';
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
  simplifieds: RecursorSimplified<Scope>,
  scoper?: (parent: Scope) => Scope,
): (scope: Scope) => RecursorPass {
  return (scope: Scope) => {
    const stack = new RecursorStack(scope, scoper ?? ((v) => v));

    const passSimplified: RecursorPassHolder = {};

    const standardModule = makeFromStandard(passSimplified, recurseModule);
    const standardBlock = makeFromStandard(passSimplified, recurseBlock);

    const standardExpression = makeFromStandard(passSimplified, recurseExpression);
    const standardExpressionCall = makeFromStandard(passSimplified, recurseExpressionCall);
    const standardExpressionIdentifier = makeFromStandard(passSimplified, recurseExpressionIdentifier);
    const standardExpressionFunction = makeFromStandard(passSimplified, recurseExpressionFunction);
    const standardExpressionObject = makeFromStandard(passSimplified, recurseExpressionObject);
    const standardExpressionRun = makeFromStandard(passSimplified, recurseExpressionRun);
    const standardExpressionLookup = makeFromStandard(passSimplified, recurseExpressionLookup);
    const standardExpressionLiteral = makeFromStandard(passSimplified, recurseExpressionLiteral);
    const standardExpressionUnary = makeFromStandard(passSimplified, recurseExpressionUnary);
    const standardExpressionBinary = makeFromStandard(passSimplified, recurseExpressionBinary);
    const standardExpressionTyping = makeFromStandard(passSimplified, recurseExpressionTyping);
    const standardExpressionParenthesis = makeFromStandard(passSimplified, recurseExpressionParenthesis);

    const standardAnnotationType = makeFromStandard(passSimplified, recurseAnnotationType);
    const standardAnnotationTemplate = makeFromStandard(passSimplified, recurseAnnotationTemplate);

    const standardType = makeFromStandard(passSimplified, recurseType);
    const standardTypeParenthesis = makeFromStandard(passSimplified, recurseTypeParenthesis);
    const standardTypeIdentifier = makeFromStandard(passSimplified, recurseTypeIdentifier);
    const standardTypePrimitive = makeFromStandard(passSimplified, recurseTypePrimitive);
    const standardTypeBinary = makeFromStandard(passSimplified, recurseTypeBinary);
    const standardTypeFunction = makeFromStandard(passSimplified, recurseTypeFunction);
    const standardTypeObject = makeFromStandard(passSimplified, recurseTypeObject);

    const standardStatement = makeFromStandard(passSimplified, recurseStatement);
    const standardStatementImport = makeFromStandard(passSimplified, recurseStatementImport);
    const standardStatementExport = makeFromStandard(passSimplified, recurseStatementExport);
    const standardStatementVariable = makeFromStandard(passSimplified, recurseStatementVariable);
    const standardStatementTypedef = makeFromStandard(passSimplified, recurseStatementTypedef);
    const standardStatementBlock = makeFromStandard(passSimplified, recurseStatementBlock);
    const standardStatementWhile = makeFromStandard(passSimplified, recurseStatementWhile);
    const standardStatementCondition = makeFromStandard(passSimplified, recurseStatementCondition);
    const standardStatementReturn = makeFromStandard(passSimplified, recurseStatementReturn);
    const standardStatementUnsafe = makeFromStandard(passSimplified, recurseStatementUnsafe);
    const standardStatementExpression = makeFromStandard(passSimplified, recurseStatementExpression);
    const standardStatementEmpty = makeFromStandard(passSimplified, recurseStatementEmpty);

    passSimplified.value = {
      recurseModule: makeFromSimplified(stack, standardModule, simplifieds.recurseModule),
      recurseBlock: makeFromSimplified(stack, standardBlock, simplifieds.recurseBlock),

      recurseExpression: makeFromSimplified(stack, standardExpression, simplifieds.recurseExpression),
      recurseExpressionCall: makeFromSimplified(stack, standardExpressionCall, simplifieds.recurseExpressionCall),
      recurseExpressionIdentifier: makeFromSimplified(stack, standardExpressionIdentifier, simplifieds.recurseExpressionIdentifier),
      recurseExpressionFunction: makeFromSimplified(stack, standardExpressionFunction, simplifieds.recurseExpressionFunction),
      recurseExpressionObject: makeFromSimplified(stack, standardExpressionObject, simplifieds.recurseExpressionObject),
      recurseExpressionRun: makeFromSimplified(stack, standardExpressionRun, simplifieds.recurseExpressionRun),
      recurseExpressionLookup: makeFromSimplified(stack, standardExpressionLookup, simplifieds.recurseExpressionLookup),
      recurseExpressionLiteral: makeFromSimplified(stack, standardExpressionLiteral, simplifieds.recurseExpressionLiteral),
      recurseExpressionUnary: makeFromSimplified(stack, standardExpressionUnary, simplifieds.recurseExpressionUnary),
      recurseExpressionBinary: makeFromSimplified(stack, standardExpressionBinary, simplifieds.recurseExpressionBinary),
      recurseExpressionTyping: makeFromSimplified(stack, standardExpressionTyping, simplifieds.recurseExpressionTyping),
      recurseExpressionParenthesis: makeFromSimplified(stack, standardExpressionParenthesis, simplifieds.recurseExpressionParenthesis),

      recurseAnnotationType: makeFromSimplified(stack, standardAnnotationType, simplifieds.recurseAnnotationType),
      recurseAnnotationTemplate: makeFromSimplified(stack, standardAnnotationTemplate, simplifieds.recurseAnnotationTemplate),

      recurseType: makeFromSimplified(stack, standardType, simplifieds.recurseType),
      recurseTypeParenthesis: makeFromSimplified(stack, standardTypeParenthesis, simplifieds.recurseTypeParenthesis),
      recurseTypeIdentifier: makeFromSimplified(stack, standardTypeIdentifier, simplifieds.recurseTypeIdentifier),
      recurseTypePrimitive: makeFromSimplified(stack, standardTypePrimitive, simplifieds.recurseTypePrimitive),
      recurseTypeBinary: makeFromSimplified(stack, standardTypeBinary, simplifieds.recurseTypeBinary),
      recurseTypeFunction: makeFromSimplified(stack, standardTypeFunction, simplifieds.recurseTypeFunction),
      recurseTypeObject: makeFromSimplified(stack, standardTypeObject, simplifieds.recurseTypeObject),

      recurseStatement: makeFromSimplified(stack, standardStatement, simplifieds.recurseStatement),
      recurseStatementImport: makeFromSimplified(stack, standardStatementImport, simplifieds.recurseStatementImport),
      recurseStatementExport: makeFromSimplified(stack, standardStatementExport, simplifieds.recurseStatementExport),
      recurseStatementVariable: makeFromSimplified(stack, standardStatementVariable, simplifieds.recurseStatementVariable),
      recurseStatementTypedef: makeFromSimplified(stack, standardStatementTypedef, simplifieds.recurseStatementTypedef),
      recurseStatementBlock: makeFromSimplified(stack, standardStatementBlock, simplifieds.recurseStatementBlock),
      recurseStatementWhile: makeFromSimplified(stack, standardStatementWhile, simplifieds.recurseStatementWhile),
      recurseStatementCondition: makeFromSimplified(stack, standardStatementCondition, simplifieds.recurseStatementCondition),
      recurseStatementReturn: makeFromSimplified(stack, standardStatementReturn, simplifieds.recurseStatementReturn),
      recurseStatementUnsafe: makeFromSimplified(stack, standardStatementUnsafe, simplifieds.recurseStatementUnsafe),
      recurseStatementExpression: makeFromSimplified(stack, standardStatementExpression, simplifieds.recurseStatementExpression),
      recurseStatementEmpty: makeFromSimplified(stack, standardStatementEmpty, simplifieds.recurseStatementEmpty),
    };

    return passSimplified.value;
  };
}
