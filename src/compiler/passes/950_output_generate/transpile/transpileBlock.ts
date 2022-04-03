import { AstBlock } from '../../../data/ast/AstBlock.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';
import { utilTranspileTypeToAnnotation } from '../util/utilTranspileTypeToAnnotation.ts';

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
    const transpiledType = utilTranspileTypeToAnnotation(resolvedType, resolvedVariable.resolvedHeapized);
    const symbolLocalValue = ensure(resolvedVariable.symbolLocalValue);

    if (resolvedVariable.resolvedHeapized) {
      const transpiledTypeInner = utilTranspileTypeToAnnotation(resolvedType, false);
      transpiler.pushStatement([
        transpiledType,
        ' ',
        symbolLocalValue,
        '(new ',
        transpiledTypeInner,
        '())',
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
