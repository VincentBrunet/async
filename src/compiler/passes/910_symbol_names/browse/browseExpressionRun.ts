import { AstExpressionRun } from '../../../data/ast/AstExpressionRun.ts';
import { ensure } from '../../errors/ensure.ts';
import { hashFileSymbol } from '../util/hashFileSymbol.ts';
import { hashLocalSymbol } from '../util/hashLocalSymbol.ts';

export function browseExpressionRun(
  astExpressionRun: AstExpressionRun,
): void {
  for (const astReferenceClosure of ensure(astExpressionRun.referenceClosures)) {
    astReferenceClosure.symbolLocalVariable = hashLocalSymbol('closure', astReferenceClosure.name);
  }
  astExpressionRun.symbolFileImplementationFunction = hashFileSymbol(astExpressionRun, 'run_implementation');
}
