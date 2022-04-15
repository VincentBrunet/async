import { AstExpressionFunction } from '../../../data/ast/AstExpressionFunction.ts';
import { hashLocalSymbol } from '../util/hashLocalSymbol.ts';
import { ensure } from '../../errors/ensure.ts';
import { hashFileSymbol } from '../util/hashFileSymbol.ts';

export function browseExpressionFunction(
  astExpressionFunction: AstExpressionFunction,
): void {
  astExpressionFunction.symbolFileImplementationFunction = hashFileSymbol(astExpressionFunction, 'fn_implementation');
  astExpressionFunction.symbolFileFactoryFunction = hashFileSymbol(astExpressionFunction, 'fn_factory');
  astExpressionFunction.symbolFileClosureStruct = hashFileSymbol(astExpressionFunction, 'fn_closure');
  astExpressionFunction.symbolFileCallableStruct = hashFileSymbol(astExpressionFunction, 'fn_callable');
  astExpressionFunction.symbolLocalClosureValue = hashLocalSymbol('closure', 'struct');
  astExpressionFunction.symbolLocalCallableValue = hashLocalSymbol('callable', 'struct');

  for (const astReferenceClosure of ensure(astExpressionFunction.referenceClosures)) {
    astReferenceClosure.symbolLocalParam = hashLocalSymbol('closure', astReferenceClosure.name);
    astReferenceClosure.symbolLocalValue = astExpressionFunction.symbolLocalClosureValue + '.' + astReferenceClosure.name;
  }
  astExpressionFunction.params.forEach((astExpressionFunctionParam, index) => {
    if (astExpressionFunctionParam.name) {
      astExpressionFunctionParam.symbolLocalValue = hashLocalSymbol('param', astExpressionFunctionParam.name);
    } else {
      astExpressionFunctionParam.symbolLocalValue = hashLocalSymbol('param', index.toString());
    }
  });
}
