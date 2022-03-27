import { AstExpressionFunction } from '../../../data/ast/AstExpressionFunction.ts';
import { hashGlobalSymbol } from '../util/hashGlobalSymbol.ts';
import { hashLocalSymbol } from '../util/hashLocalSymbol.ts';
import { AstModule } from '../../../data/ast/AstModule.ts';

export function browseExpressionFunction(
  astExpressionFunction: AstExpressionFunction,
  astModule: AstModule,
): void {
  for (const param of astExpressionFunction.params) {
    if (param.name) {
      param.symbolLocalValue = hashLocalSymbol('param', param.name);
    }
  }
  astExpressionFunction.symbolGlobalCallablePointer = hashGlobalSymbol(
    astModule.hash,
    astExpressionFunction,
    'callable',
  );
  astExpressionFunction.symbolGlobalClosureType = hashGlobalSymbol(
    astModule.hash,
    astExpressionFunction,
    'closure',
  );
}
