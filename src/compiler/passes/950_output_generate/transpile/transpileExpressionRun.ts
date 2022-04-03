import { AstExpressionRun } from '../../../data/ast/AstExpressionRun.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';
import { utilTranspileReferenceValueClosureToAnnotation } from '../util/utilTranspileReferenceValueClosureToAnnotation.ts';
import { utilTranspileReferenceValueClosureToExpression } from '../util/utilTranspileReferenceValueClosureToExpression.ts';
import { utilTranspileTypeToAnnotation } from '../util/utilTranspileTypeToAnnotation.ts';

export function transpileExpressionRun(
  pass: RecursorPass,
  astExpressionRun: AstExpressionRun,
  transpiler: Transpiler,
) {
  const referenceValueClosures = ensure(astExpressionRun.referenceValueClosures);

  const symbolGlobalCallableFunction = ensure(astExpressionRun.symbolGlobalCallableFunction);

  transpiler.pushStatementPart(symbolGlobalCallableFunction);
  transpiler.pushStatementPart('(');
  for (const referenceValueClosure of referenceValueClosures) {
    if (referenceValueClosure.idx !== 0) {
      transpiler.pushStatementPart(', ');
    }
    transpiler.pushStatementPart(utilTranspileReferenceValueClosureToExpression(referenceValueClosure));
  }
  transpiler.pushStatementPart(')');

  // New scope
  const transpiledType = utilTranspileTypeToAnnotation(ensure(astExpressionRun.resolvedType), false);
  transpiler.pushFunction(
    transpiledType,
    symbolGlobalCallableFunction,
    referenceValueClosures.map((referenceValueClosure) => {
      return {
        name: ensure(referenceValueClosure.symbolLocalValue),
        type: utilTranspileReferenceValueClosureToAnnotation(referenceValueClosure) + '&',
      };
    }),
  );

  // Run the recursive writing
  transpiler.pushStatement(['/* run block */']);
  pass.recurseBlock(astExpressionRun.block);

  // Backup return
  transpiler.pushStatement(['return', ' ', 'null_make()']);

  // Done
  transpiler.popFunction();
}
