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

  const symbolGlobalCallablePointer = ensure(astExpressionRun.symbolGlobalCallablePointer);
  const symbolGlobalClosureType = ensure(astExpressionRun.symbolGlobalClosureType);

  // Simply call the run function in the expression
  const runCallLength = referenceValueClosures.length.toString();
  const runCallVariadic = referenceValueClosures.length > 9;
  transpiler.pushStatementPart('run_call_');
  if (runCallVariadic) {
    transpiler.pushStatementPart('x');
  } else {
    transpiler.pushStatementPart(runCallLength);
  }
  transpiler.pushStatementPart('(');
  transpiler.pushStatementPart('&');
  transpiler.pushStatementPart(symbolGlobalCallablePointer);
  if (runCallVariadic) {
    transpiler.pushStatementPart(', ');
    transpiler.pushStatementPart(runCallLength);
  }
  for (const referenceValueClosure of referenceValueClosures) {
    transpiler.pushStatementPart(', ');
    utilTranspileReferenceValueClosure(referenceValueClosure, transpiler);
  }
  transpiler.pushStatementPart(')');

  // New scope
  const transpiledType = utilTranspileTypeAnnotation(ensure(astExpressionRun.resolvedType));
  transpiler.pushFunction(transpiledType, symbolGlobalCallablePointer, [{
    type: symbolGlobalClosureType,
    name: 'closure',
  }]);

  // Run the recursive writing
  transpiler.pushStatement(['/* run block */']);
  pass.recurseBlock(astExpressionRun.block);

  // Backup return
  transpiler.pushStatement(['return', ' ', 'null_make()']);

  // Done
  transpiler.popFunction();
}
