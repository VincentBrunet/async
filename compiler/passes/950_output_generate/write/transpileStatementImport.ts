import { AstStatementImport } from "../../../data/ast/AstStatementImport.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { hashAstKey } from "../../../lib/hash/hashAstKey.ts";
import { hashLocalKey } from "../../../lib/hash/hashLocalKey.ts";
import { cacheFileFromHash } from "../../../lib/io/cacheFileFromHash.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export async function transpileStatementImport(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstStatementImport,
) {
  // Asserts
  const resolvedModule = ensure(ast.resolvedModule);

  // Include
  transpiler.pushInclude(
    await cacheFileFromHash(
      resolvedModule.sourceToken.sourceCode.hash,
      "output.h",
    ),
  );

  // Import lines
  for (const slot of ast.slots) {
    transpiler.pushStatement([
      "t_ref *",
      hashLocalKey("import", slot.name),
      " = ",
      "module_import",
      "(",
      hashAstKey(resolvedModule, resolvedModule, "module"),
      ", ",
      ast.slots.indexOf(slot).toString(), // TODO - not correct
      ")",
    ]);
  }
}
