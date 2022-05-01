import { AstExpressionFunction } from '../../../data/ast/AstExpressionFunction.ts';
import { hashLocalSymbol } from '../util/hashLocalSymbol.ts';
import { ensure } from '../../errors/ensure.ts';
import { hashFileSymbol } from '../util/hashFileSymbol.ts';

export function browseExpressionFunction(
  expressionFunction: AstExpressionFunction,
): void {
  expressionFunction.symbolFileFactoryFunction = hashFileSymbol(expressionFunction, 'fn_factory');

  for (const astReferenceClosure of ensure(expressionFunction.referenceClosures)) {
    astReferenceClosure.symbolLocalVariable = hashLocalSymbol('closure', astReferenceClosure.name);
  }

  const expressionFunctionParams = expressionFunction.params;
  for (let i = 0; i < expressionFunctionParams.length; i++) {
    const expressionFunctionParam = expressionFunctionParams[i];
    if (expressionFunctionParam.name) {
      expressionFunctionParam.symbolLocalVariable = hashLocalSymbol('param', expressionFunctionParam.name);
    } else {
      expressionFunctionParam.symbolLocalVariable = hashLocalSymbol('param', i.toString());
    }
  }
}
