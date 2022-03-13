import { AstStatementImport } from "../../../data/ast/AstStatementImport.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { hashGlobalSymbol } from "../../../lib/hash/hashGlobalSymbol.ts";
import { hashLocalSymbol } from "../../../lib/hash/hashLocalSymbol.ts";
import { cacheFileFromHash } from "../../../lib/io/cacheFileFromHash.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export function transpileStatementImport(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstStatementImport,
) {
  // Asserts
  const resolvedModule = ensure(ast.resolvedModule);
  const resolvedExports = ensure(resolvedModule.resolvedExports);

  // Include
  transpiler.pushInclude(
    cacheFileFromHash(
      resolvedModule.sourceToken.sourceCode.hash,
      "output.h",
    ),
  );

  // Which keys can be imported
  const resolvedExportKeys = [...resolvedExports.keys()];

  // Imported keys
  for (const slot of ast.slots) {
    transpiler.pushStatement([
      "t_ref *",
      hashLocalSymbol("import", slot.name),
      " = ",
      hashGlobalSymbol(resolvedModule, resolvedModule, "getter"),
      "()",
      "[",
      resolvedExportKeys.indexOf(slot.name).toString(),
      "]",
    ]);
  }
}
