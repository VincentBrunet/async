import { AstExpressionRun } from '../../../data/ast/AstExpressionRun.ts';
import { AstModule } from '../../../data/ast/AstModule.ts';
import { hashGlobalSymbol } from '../util/hashGlobalSymbol.ts';

export function browseExpressionRun(
  astExpressionRun: AstExpressionRun,
  astModule: AstModule,
): void {
  astExpressionRun.symbolGlobalCallablePointer = hashGlobalSymbol(
    astModule.hash,
    astExpressionRun,
    'callable',
  );
  astExpressionRun.symbolGlobalClosureType = hashGlobalSymbol(
    astModule.hash,
    astExpressionRun,
    'closure',
  );
}
