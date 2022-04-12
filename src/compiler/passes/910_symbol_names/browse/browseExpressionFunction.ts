import { AstExpressionFunction } from '../../../data/ast/AstExpressionFunction.ts';
import { hashLocalSymbol } from '../util/hashLocalSymbol.ts';
import { ensure } from '../../errors/ensure.ts';
import { hashFileSymbol } from '../util/hashFileSymbol.ts';

export function browseExpressionFunction(
  astExpressionFunction: AstExpressionFunction,
): void {
  astExpressionFunction.symbolLocalClosureValue = hashLocalSymbol('closure', 'struct');
  for (const astReferenceClosure of ensure(astExpressionFunction.referenceClosures)) {
    astReferenceClosure.symbolLocalValue = astExpressionFunction.symbolLocalClosureValue + '->_' + astReferenceClosure.name;
  }
  for (const astExpressionFunctionParam of astExpressionFunction.params) {
    if (astExpressionFunctionParam.name) {
      astExpressionFunctionParam.symbolLocalValue = hashLocalSymbol('param', astExpressionFunctionParam.name);
    }
  }
  astExpressionFunction.symbolFileCallableFunction = hashFileSymbol(astExpressionFunction, 'fn_callable');
  astExpressionFunction.symbolFileFactoryFunction = hashFileSymbol(astExpressionFunction, 'fn_factory');
  astExpressionFunction.symbolFileClosureStruct = hashFileSymbol(astExpressionFunction, 'fn_closure');
}
