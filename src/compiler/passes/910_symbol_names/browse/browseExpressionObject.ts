import { AstExpressionObject } from '../../../data/ast/AstExpressionObject.ts';
import { AstModule } from '../../../data/ast/AstModule.ts';
import { hashGlobalSymbol } from '../util/hashGlobalSymbol.ts';

export function browseExpressionObject(
  astExpressionObject: AstExpressionObject,
  astModule: AstModule,
): void {
  astExpressionObject.symbolGlobalCallablePointer = hashGlobalSymbol(
    astModule.hash,
    astExpressionObject,
    'callable',
  );
  astExpressionObject.symbolGlobalClosureType = hashGlobalSymbol(
    astModule.hash,
    astExpressionObject,
    'closure',
  );
}
