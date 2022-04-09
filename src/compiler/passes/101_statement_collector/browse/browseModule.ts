import { AstModule } from '../../../data/ast/AstModule.ts';
import { astStatementAsStatementTypedef, astStatementAsStatementVariable } from '../../../data/ast/AstStatement.ts';
import { AstStatementExport } from '../../../data/ast/AstStatementExport.ts';
import { AstStatementImport } from '../../../data/ast/AstStatementImport.ts';
import { MapArray } from '../../../lib/core/data/MapArray.ts';
import { assert } from '../../../passes/errors/assert.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { never } from '../../errors/never.ts';
import { Scope } from '../util/Scope.ts';

function toMapArray<K, V>(array: Array<V>, keyer: (v: V) => K): MapArray<K, V> {
  const map = new MapArray<K, V>();
  for (const item of array) {
    map.push(keyer(item), item);
  }
  return map;
}

function toMap<K, V>(array: Array<V>, keyer: (v: V) => K): Map<K, V> {
  const map = new Map<K, V>();
  for (const item of array) {
    map.set(keyer(item), item);
  }
  return map;
}

function importModuleHash(ast: AstStatementImport) {
  return ensure(ast.resolvedModule).hash;
}

function exportName(astStatementExport: AstStatementExport) {
  const variable = astStatementAsStatementVariable(astStatementExport.statement);
  if (variable) {
    return variable.name;
  }
  const typedef = astStatementAsStatementTypedef(astStatementExport.statement);
  if (typedef) {
    return typedef.name;
  }
  never();
}

export function browseModule(
  next: () => void,
  ast: AstModule,
  scope: Scope,
) {
  scope.markCollectorStatementReturn();
  scope.markCollectorStatementImport();
  scope.markCollectorStatementExport();

  next();

  assert(scope.getStatementReturns().length === 0);
  ast.collectedImportsByModuleHash = toMapArray(scope.getStatementImports(), importModuleHash);
  ast.collectedExportsByName = toMap(scope.getStatementExports(), exportName);
}
