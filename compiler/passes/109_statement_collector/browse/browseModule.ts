import { AstModule } from "../../../data/ast/AstModule.ts";
import { AstStatementExport } from "../../../data/ast/AstStatementExport.ts";
import { AstStatementImport } from "../../../data/ast/AstStatementImport.ts";
import { MapArray } from "../../../lib/core/data/MapArray.ts";
import { assert } from "../../../lib/errors/assert.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { Scope } from "../util/Scope.ts";

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

function importKey(ast: AstStatementImport) {
  return ensure(ast.resolvedModule).sourceToken.sourceCode.hash;
}
function exportKey(ast: AstStatementExport) {
  return ensure(ast.resolvedName);
}

export async function browseModule(
  scope: Scope,
  ast: AstModule,
  next: () => Promise<void>,
) {
  scope.markCollectorStatementReturn();
  scope.markCollectorStatementImport();
  scope.markCollectorStatementExport();

  await next();

  assert(scope.getStatementReturns().length === 0);
  ast.resolvedImports = toMapArray(scope.getStatementImports(), importKey);
  ast.resolvedExports = toMap(scope.getStatementExports(), exportKey);
}
