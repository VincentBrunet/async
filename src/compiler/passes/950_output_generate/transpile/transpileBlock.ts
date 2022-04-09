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
  const collectedVariables = ensure(ast.collectedVariables);
  for (const collectedVariable of collectedVariables) {
    const resolvedType = ensure(collectedVariable.resolvedType);
    const transpiledType = utilTranspileTypeToAnnotation(resolvedType, collectedVariable.resolvedHeapized);
    const symbolLocalValue = ensure(collectedVariable.symbolLocalValue);

    if (collectedVariable.resolvedHeapized) {
      transpiler.pushStatement([
        transpiledType,
        ' ',
        symbolLocalValue,
        '',
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
