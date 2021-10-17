import { AstModule } from "../../../data/ast/AstModule.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { hashAstKey } from "../../../lib/hash/hashAstKey.ts";
import { cacheFileFromHash } from "../../../lib/io/cacheFileFromHash.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export async function transpileModule(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstModule,
) {
  // Asserts
  const resolvedExports = ensure(ast.resolvedExports);

  // Name
  const name = hashAstKey(ast, ast, "module");

  // Include
  transpiler.pushInclude(
    await cacheFileFromHash(
      ast.sourceToken.sourceCode.hash,
      "output.h",
    ),
  );

  // New Function
  transpiler.pushFunction("t_ref **", name, []);

  // Setup local exports
  for (const resolvedExport of resolvedExports) {
    transpiler.pushStatement([
      "t_ref *",
      "_export_",
      resolvedExport.name,
      " = ",
      "ref_make(NULL)",
    ]);
  }

  // Recurse in module content
  transpiler.pushStatement(["/* module block */ "]);
  await pass.recurseBlock(transpiler, ast.block);

  // We simply return the module
  const moduleMakeLength = resolvedExports.length.toString();
  const moduleMakeVariadic = resolvedExports.length > 9;
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
  for (let i = 0; i < resolvedExports.length; i++) {
    if (i != 0) {
      moduleMakeParts.push(", ");
    }
    moduleMakeParts.push("_export_");
    moduleMakeParts.push(resolvedExports[i].name);
  }
  moduleMakeParts.push(")");
  transpiler.pushStatement(moduleMakeParts);

  // New Function (getter)
  transpiler.pushFunction("t_ref **", hashAstKey(ast, ast, "getter"), []);
  transpiler.pushStatement(["static t_ref **exports = NULL"]);
  transpiler.pushStatement(["if (exports == NULL)"]);
  transpiler.pushBlock();
  transpiler.pushStatement(["exports = ", name, "()"]);
  transpiler.popBlock();
  transpiler.pushStatement(["return exports"]);
}
