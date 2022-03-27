import { AstExpressionRun } from '../../../data/ast/AstExpressionRun.ts';
import { AstModule } from '../../../data/ast/AstModule.ts';
import { ensure } from '../../errors/ensure.ts';
import { hashGlobalSymbol } from '../util/hashGlobalSymbol.ts';
import { hashLocalSymbol } from '../util/hashLocalSymbol.ts';

export function browseExpressionRun(
  astExpressionRun: AstExpressionRun,
  astModule: AstModule,
): void {
  for (const astReferenceValueClosure of ensure(astExpressionRun.referenceValueClosures)) {
    astReferenceValueClosure.symbolLocalValue = hashLocalSymbol('closure', astReferenceValueClosure.name);
  }
  astExpressionRun.symbolGlobalCallableFunction = hashGlobalSymbol(
    astModule.hash,
    astExpressionRun,
    'callable',
  );
}
