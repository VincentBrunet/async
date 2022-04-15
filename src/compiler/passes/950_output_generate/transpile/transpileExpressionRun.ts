import { AstExpressionRun } from '../../../data/ast/AstExpressionRun.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';
import { utilTranspileReferenceClosureToAnnotation } from '../util/utilTranspileReferenceClosureToAnnotation.ts';
import { utilTranspileReferenceClosureToExpression } from '../util/utilTranspileReferenceClosureToExpression.ts';
import { utilTranspileTypeToAnnotation } from '../util/utilTranspileTypeToAnnotation.ts';

export function transpileExpressionRun(
  pass: RecursorPass,
  astExpressionRun: AstExpressionRun,
  transpiler: Transpiler,
) {
  const referenceClosures = ensure(astExpressionRun.referenceClosures);

  const symbolFileImplementationFunction = ensure(astExpressionRun.symbolFileImplementationFunction);

  transpiler.pushStatementPart(symbolFileImplementationFunction);
  transpiler.pushStatementPart('(');
  referenceClosures.forEach((referenceClosure, index) => {
    if (index !== 0) {
      transpiler.pushStatementPart(', ');
    }
    transpiler.pushStatementPart(utilTranspileReferenceClosureToExpression(referenceClosure));
  });
  transpiler.pushStatementPart(')');

  // New scope
  const transpiledType = utilTranspileTypeToAnnotation(
    ensure(astExpressionRun.resolvedType),
    false,
  );
  transpiler.pushFunction(
    false,
    transpiledType,
    symbolFileImplementationFunction,
    referenceClosures.map((referenceClosure) => {
      return {
        name: ensure(referenceClosure.symbolLocalParam),
        type: utilTranspileReferenceClosureToAnnotation(referenceClosure) + '&',
      };
    }),
  );

  // Run the recursive writing
  transpiler.pushStatement(['/* run block */']);
  pass.recurseBlock(astExpressionRun.block);

  // Done
  transpiler.popFunction();
}
