import { AstExpressionRun } from '../../../data/ast/AstExpressionRun.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { hashGlobalSymbol } from '../../../passes/hash/hashGlobalSymbol.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';
import { utilTranspileReferenceValueClosure } from '../util/utilTranspileReferenceValueClosure.ts';
import { utilTranspileType } from '../util/utilTranspileType.ts';

export function transpileExpressionRun(
  pass: RecursorPass,
  ast: AstExpressionRun,
  transpiler: Transpiler,
) {
  // Asserts
  const referenceValueClosures = ensure(ast.referenceValueClosures);

  // Generate a stable unique name
  const name = hashGlobalSymbol(
    transpiler.getUnit().ast.hash,
    ast,
    'run',
  );

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
  transpiler.pushStatementPart(name);
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
  const transpiledType = utilTranspileType(ensure(ast.resolvedType), false);
  transpiler.pushFunction(transpiledType, name, [{ type: 't_closure', name: 'closure' }]);

  // Run the recursive writing
  transpiler.pushStatement(['/* run block */']);
  pass.recurseBlock(ast.block);

  // Backup return
  transpiler.pushStatement(['return', ' ', 'null_make()']);

  // Done
  transpiler.popFunction();
}
