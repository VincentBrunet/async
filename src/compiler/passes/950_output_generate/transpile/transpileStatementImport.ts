import { AstStatementImport } from '../../../data/ast/AstStatementImport.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { cacheFileFromHash } from '../../../lib/io/cacheFileFromHash.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';
import { astStatementAsStatementVariable } from '../../../data/ast/AstStatement.ts';
import { utilTranspileTypeToAnnotation } from '../util/utilTranspileTypeToAnnotation.ts';

export function transpileStatementImport(
  pass: RecursorPass,
  astStatementImport: AstStatementImport,
  transpiler: Transpiler,
) {
  // Asserts
  const resolvedModule = ensure(astStatementImport.resolvedModule);

  // Include
  transpiler.pushInclude(
    cacheFileFromHash(
      resolvedModule.hash,
      'output.hpp',
    ),
  );

  // Imported keys
  for (const slot of astStatementImport.slots) {
    const resolvedExport = ensure(slot.resolvedExport);
    const statementVariable = astStatementAsStatementVariable(resolvedExport.statement);
    if (statementVariable) {
      const transpiledType = utilTranspileTypeToAnnotation(
        ensure(statementVariable.resolvedType),
        statementVariable.resolvedHeapized,
      );
      transpiler.pushStatement([
        transpiledType,
        ' ',
        ensure(slot.symbolLocalValue),
        ' = ',
        ensure(resolvedModule.symbolGlobalGetterFunction),
        '()->',
        slot.name,
      ]);
    }
  }
}
