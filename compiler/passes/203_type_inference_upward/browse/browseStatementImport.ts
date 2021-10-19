import { AstStatementImport } from "../../../data/ast/AstStatementImport.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { makeTypeOrFromArray } from "../../../lib/typing/makeTypeOrFromArray.ts";
import { Scope } from "../util/Scope.ts";

export async function browseStatementImport(
  scope: Scope,
  ast: AstStatementImport,
  next: () => Promise<void>,
) {
  // Asserts
  const resolvedModule = ensure(ast.resolvedModule);
  const resolvedExportsMap = ensure(resolvedModule.resolvedExports);

  await next();

  // Resolve each slot from the module loaded before
  for (const slot of ast.slots) {
    const resolvedExports = ensure(resolvedExportsMap.list(slot.name));
    slot.resolvedType = makeTypeOrFromArray(
      resolvedExports.map((resolvedExport) =>
        ensure(resolvedExport.resolvedType)
      ),
      slot,
    );
  }
}
