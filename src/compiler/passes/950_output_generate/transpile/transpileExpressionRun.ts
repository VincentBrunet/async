import { AstExpressionRun } from '../../../data/ast/AstExpressionRun.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';
import { utilTranspileReferenceValueClosure } from '../util/utilTranspileReferenceValueClosure.ts';
import { utilTranspileTypeAnnotation } from '../util/utilTranspileTypeAnnotation.ts';

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
    utilTranspileReferenceValueClosure(referenceValueClosure, transpiler);
  }
  transpiler.pushStatementPart(')');

  // New scope
  const transpiledType = utilTranspileTypeAnnotation(ensure(astExpressionRun.resolvedType));
  transpiler.pushFunction(
    transpiledType,
    symbolGlobalCallableFunction,
    referenceValueClosures.map((referenceValueClosure) => {
      return {
        type: utilTranspileTypeAnnotation(ensure(referenceValueClosure.resolvedType)),
        name: ensure(referenceValueClosure.symbolLocalValue),
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
