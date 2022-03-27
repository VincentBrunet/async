import { AstExpressionFunction } from '../../../data/ast/AstExpressionFunction.ts';
import { hashGlobalSymbol } from '../util/hashGlobalSymbol.ts';
import { hashLocalSymbol } from '../util/hashLocalSymbol.ts';
import { AstModule } from '../../../data/ast/AstModule.ts';
import { ensure } from '../../errors/ensure.ts';

export function browseExpressionFunction(
  astExpressionFunction: AstExpressionFunction,
  astModule: AstModule,
): void {
  astExpressionFunction.symbolLocalClosureValue = hashLocalSymbol('closure', '');
  for (const astReferenceValueClosure of ensure(astExpressionFunction.referenceValueClosures)) {
    astReferenceValueClosure.symbolLocalValue = astExpressionFunction.symbolLocalClosureValue + '->' + astReferenceValueClosure.name;
  }
  for (const astExpressionFunctionParam of astExpressionFunction.params) {
    if (astExpressionFunctionParam.name) {
      astExpressionFunctionParam.symbolLocalValue = hashLocalSymbol('param', astExpressionFunctionParam.name);
    }
  }
  astExpressionFunction.symbolGlobalCallableFunction = hashGlobalSymbol(
    astModule.hash,
    astExpressionFunction,
    'callable',
  );
  astExpressionFunction.symbolGlobalClosureStruct = hashGlobalSymbol(
    astModule.hash,
    astExpressionFunction,
    'closure',
  );
}
