import { AstBlock } from '../../../data/ast/AstBlock.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';
import { utilTranspileTypeAnnotation } from '../util/utilTranspileTypeAnnotation.ts';

export function transpileBlock(
  pass: RecursorPass,
  ast: AstBlock,
  transpiler: Transpiler,
) {
  // Open block
  transpiler.pushBlock();

  // Setup local variables
  const resolvedVariables = ensure(ast.resolvedVariables);
  for (const resolvedVariable of resolvedVariables) {
    const resolvedType = ensure(resolvedVariable.resolvedType);
    const transpiledType = utilTranspileTypeAnnotation(resolvedType);
    const symbolLocalValue = ensure(resolvedVariable.symbolLocalValue);

    if (resolvedVariable.resolvedHeapized) {
      transpiler.pushStatement([
        transpiledType,
        '*',
        ' ',
        symbolLocalValue,
        ' = ',
        'malloc(sizeof(',
        transpiledType,
        '))',
      ]);
    } else if (resolvedVariable.mutable) {
      transpiler.pushStatement([
        transpiledType,
        ' ',
        '_' + symbolLocalValue,
      ]);
      transpiler.pushStatement([
        transpiledType,
        '*',
        ' ',
        symbolLocalValue,
        ' = ',
        '&',
        '_' + symbolLocalValue,
      ]);
    } else {
      transpiler.pushStatement([
        transpiledType,
        ' ',
        symbolLocalValue,
      ]);
    }
  }

  transpiler.pushStatement([]);

  // Recurse on statements
  for (const statement of ast.statements) {
    pass.recurseStatement(statement);
  }

  // Close block
  transpiler.popBlock();
}
