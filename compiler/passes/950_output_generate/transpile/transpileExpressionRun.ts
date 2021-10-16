import { AstExpressionRun } from "../../../data/ast/AstExpressionRun.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { hashAstKey } from "../../../lib/hash/hashAstKey.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";
import { transpileResolvedClosure } from "./transpileResolvedClosure.ts";

export async function transpileExpressionRun(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstExpressionRun,
) {
  const resolvedClosures = ensure(ast.resolvedClosures);

  // Generate a stable unique name
  const name = hashAstKey(transpiler.getOutput().sourceAst, ast, "run");

  // Simply call the run function in the expression
  const runCallLength = resolvedClosures.length.toString();
  const runCallVariadic = resolvedClosures.length > 9;
  transpiler.pushPart("run_call_");
  if (runCallVariadic) {
    transpiler.pushPart("x");
  } else {
    transpiler.pushPart(runCallLength);
  }
  transpiler.pushPart("(");
  transpiler.pushPart("&");
  transpiler.pushPart(name);
  if (runCallVariadic) {
    transpiler.pushPart(", ");
    transpiler.pushPart(resolvedClosures.length.toString());
  }
  for (const astClosure of resolvedClosures) {
    transpiler.pushPart(", ");
    transpileResolvedClosure(pass, transpiler, astClosure);
  }
  transpiler.pushPart(")");

  // New scope
  transpiler.pushFunction("t_value *", name, [
    "t_ref **closure",
  ]);

  // Run the recursive writing
  await pass.recurseBlock(transpiler, ast.block);

  // Backup return
  transpiler.pushStatement(["return", " ", "null_make()"]);

  // Done
  transpiler.popFunction();
}
