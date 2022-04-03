import { AstExpressionRun } from '../../../data/ast/AstExpressionRun.ts';
import { AstModule } from '../../../data/ast/AstModule.ts';
import { ensure } from '../../errors/ensure.ts';
import { hashGlobalSymbol } from '../util/hashGlobalSymbol.ts';
import { hashLocalSymbol } from '../util/hashLocalSymbol.ts';

export function browseExpressionRun(
  astExpressionRun: AstExpressionRun,
  astModule: AstModule,
): void {
  for (const astReferenceClosure of ensure(astExpressionRun.referenceClosures)) {
    astReferenceClosure.symbolLocalValue = hashLocalSymbol('closure', astReferenceClosure.name);
  }
  astExpressionRun.symbolGlobalCallableFunction = hashGlobalSymbol(
    astModule.hash,
    astExpressionRun,
    'run_callable',
  );
}
