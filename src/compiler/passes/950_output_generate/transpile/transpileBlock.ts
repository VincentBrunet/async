import { AstBlock } from '../../../data/ast/AstBlock.ts';
import { ensure } from '../../../lib/errors/ensure.ts';
import { hashLocalSymbol } from '../../../lib/hash/hashLocalSymbol.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';
import { utilTranspileType } from '../util/utilTranspileType.ts';

export function transpileBlock(
  pass: RecursorPass,
  ast: AstBlock,
  transpiler: Transpiler,
) {
  // Asserts
  const resolvedVariables = ensure(ast.resolvedVariables);

  // Open block
  transpiler.pushBlock();

  // Setup local variables
  for (const variable of resolvedVariables) {
    transpiler.pushStatement([
      utilTranspileType(ensure(variable.resolvedType)),
      ' ',
      hashLocalSymbol('variable', variable.name),
      ' = ',
      'ref_make(NULL)',
    ]);
  }

  // Recurse on statements
  for (const statement of ast.statements) {
    pass.recurseStatement(statement);
  }

  // Close block
  transpiler.popBlock();
}
