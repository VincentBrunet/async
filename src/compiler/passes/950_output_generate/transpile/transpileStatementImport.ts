import { AstStatementImport } from '../../../data/ast/AstStatementImport.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { cacheFileFromHash } from '../../../lib/io/cacheFileFromHash.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';

export function transpileStatementImport(
  pass: RecursorPass,
  ast: AstStatementImport,
  transpiler: Transpiler,
) {
  // Asserts
  const resolvedModule = ensure(ast.resolvedModule);
  const resolvedExports = ensure(resolvedModule.resolvedExports);

  // Include
  transpiler.pushInclude(
    cacheFileFromHash(
      resolvedModule.hash,
      'output.hpp',
    ),
  );

  // Which keys can be imported
  const resolvedExportKeys = [...resolvedExports.keys()];

  // Imported keys
  for (const slot of ast.slots) {
    transpiler.pushStatement([
      't_ref *',
      ensure(slot.symbolLocalValue),
      ' = ',
      ensure(resolvedModule.symbolGlobalFactoryPointer),
      '()',
      '[',
      resolvedExportKeys.indexOf(slot.name).toString(),
      ']',
    ]);
  }
}
