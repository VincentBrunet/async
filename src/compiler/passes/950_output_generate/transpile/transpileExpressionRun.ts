import { AstExpressionRun } from '../../../data/ast/AstExpressionRun.ts';
import { ensure } from '../../../lib/errors/ensure.ts';
import { hashGlobalSymbol } from '../../../lib/hash/hashGlobalSymbol.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';
import { transpileResolvedClosure } from './transpileResolvedClosure.ts';

export function transpileExpressionRun(
  pass: RecursorPass,
  ast: AstExpressionRun,
  transpiler: Transpiler,
) {
  // Asserts
  const resolvedClosures = ensure(ast.resolvedClosures);

  // Generate a stable unique name
  const name = hashGlobalSymbol(
    transpiler.getUnit().ast.hash,
    ast,
    'run',
  );

  // Simply call the run function in the expression
  const runCallLength = resolvedClosures.length.toString();
  const runCallVariadic = resolvedClosures.length > 9;
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
  for (const astClosure of resolvedClosures) {
    transpiler.pushStatementPart(', ');
    transpileResolvedClosure(astClosure, transpiler);
  }
  transpiler.pushStatementPart(')');

  // New scope
  transpiler.pushFunction('t_value *', name, ['t_ref **closure']);

  // Run the recursive writing
  transpiler.pushStatement(['/* run block */']);
  pass.recurseBlock(ast.block);

  // Backup return
  transpiler.pushStatement(['return', ' ', 'null_make()']);

  // Done
  transpiler.popFunction();
}
