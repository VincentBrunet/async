import { AstExpressionFunction } from '../../../data/ast/AstExpressionFunction.ts';
import { hashGlobalSymbol } from '../util/hashGlobalSymbol.ts';
import { hashLocalSymbol } from '../util/hashLocalSymbol.ts';
import { AstModule } from '../../../data/ast/AstModule.ts';
import { ensure } from '../../errors/ensure.ts';
import { hashFileSymbol } from '../util/hashFileSymbol.ts';

export function browseExpressionFunction(
  astExpressionFunction: AstExpressionFunction,
  astModule: AstModule,
): void {
  astExpressionFunction.symbolLocalClosureValue = hashLocalSymbol('closure', 'struct');
  for (const astReferenceClosure of ensure(astExpressionFunction.referenceClosures)) {
    astReferenceClosure.symbolLocalValue = astExpressionFunction.symbolLocalClosureValue + '->' + astReferenceClosure.name;
  }
  for (const astExpressionFunctionParam of astExpressionFunction.params) {
    if (astExpressionFunctionParam.name) {
      astExpressionFunctionParam.symbolLocalValue = hashLocalSymbol('param', astExpressionFunctionParam.name);
    }
  }
  astExpressionFunction.symbolGlobalCallableFunction = hashGlobalSymbol(
    astModule.hash,
    astExpressionFunction,
    'fn_callable',
  );
  astExpressionFunction.symbolGlobalFactoryFunction = hashGlobalSymbol(
    astModule.hash,
    astExpressionFunction,
    'fn_factory',
  );
  astExpressionFunction.symbolFileClosureStruct = hashFileSymbol(
    astExpressionFunction,
    'fn_closure',
  );
}
