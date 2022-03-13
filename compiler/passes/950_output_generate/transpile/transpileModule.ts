import { AstModule } from "../../../data/ast/AstModule.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { hashGlobalSymbol } from "../../../lib/hash/hashGlobalSymbol.ts";
import { hashLocalSymbol } from "../../../lib/hash/hashLocalSymbol.ts";
import { cacheFileFromHash } from "../../../lib/io/cacheFileFromHash.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export function transpileModule(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstModule,
) {
  // Asserts
  const resolvedExports = ensure(ast.resolvedExports);

  // Name
  const name = hashGlobalSymbol(ast, ast, "module");

  // Include
  transpiler.pushInclude(
    cacheFileFromHash(
      ast.sourceToken.sourceCode.hash,
      "output.h",
    ),
  );

  // New Function
  transpiler.pushFunction("t_ref **", name, []);

  // Setup local exports
  const resolvedExportNames = [...resolvedExports.keys()];
  for (const resolvedExportName of resolvedExportNames) {
    transpiler.pushStatement([
      "t_ref *",
      hashLocalSymbol("export", resolvedExportName),
      " = ",
      "NULL",
    ]);
  }

  // Recurse in module content
  transpiler.pushStatement(["/* module block */"]);
  pass.recurseBlock(transpiler, ast.block);

  // We simply return the module
  const moduleMakeLength = resolvedExportNames.length.toString();
  const moduleMakeVariadic = resolvedExportNames.length > 9;
  const moduleMakeParts = [];
  moduleMakeParts.push("return ");
  moduleMakeParts.push("module_make_");
  if (moduleMakeVariadic) {
    moduleMakeParts.push("x");
  } else {
    moduleMakeParts.push(moduleMakeLength);
  }
  moduleMakeParts.push("(");
  if (moduleMakeVariadic) {
    moduleMakeParts.push(moduleMakeLength);
    moduleMakeParts.push(", ");
  }
  for (let i = 0; i < resolvedExportNames.length; i++) {
    if (i != 0) {
      moduleMakeParts.push(", ");
    }
    moduleMakeParts.push(hashLocalSymbol("export", resolvedExportNames[i]));
  }
  moduleMakeParts.push(")");
  transpiler.pushStatement(moduleMakeParts);

  // New Function (getter)
  transpiler.pushFunction("t_ref **", hashGlobalSymbol(ast, ast, "getter"), []);
  transpiler.pushStatement(["static t_ref **exports = NULL"]);
  transpiler.pushStatement(["if (exports == NULL)"]);
  transpiler.pushBlock();
  transpiler.pushStatement(["exports = ", name, "()"]);
  transpiler.popBlock();
  transpiler.pushStatement(["return exports"]);
}
