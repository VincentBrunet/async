import { AstExpressionFunction } from "../../../data/ast/AstExpressionFunction.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { hashAstKey } from "../../../lib/hash/hashAstKey.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";
import { transpileResolvedClosure } from "./transpileResolvedClosure.ts";

export function transpileExpressionFunction(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstExpressionFunction,
) {
  const resolvedClosures = ensure(ast.resolvedClosures);

  // Generate a stable unique name
  const name = hashAstKey(transpiler.getOutput().sourceAst, ast, "function");

  // Simply call the function factory
  const callLength = resolvedClosures.length.toString();
  const callVariadic = resolvedClosures.length > 9;
  transpiler.pushPart("function_make_");
  if (callVariadic) {
    transpiler.pushPart("x");
  } else {
    transpiler.pushPart(callLength);
  }
  transpiler.pushPart("(");
  transpiler.pushPart("type_function"); // TODO,
  transpiler.pushPart(", ");
  transpiler.pushPart("(void*)&");
  transpiler.pushPart(name);
  if (callVariadic) {
    transpiler.pushPart(", ");
    transpiler.pushPart(resolvedClosures.length.toString());
  }
  for (const astClosure of resolvedClosures) {
    transpiler.pushPart(", ");
    transpileResolvedClosure(pass, transpiler, astClosure);
  }
  transpiler.pushPart(")");

  // New function
  const params = [];
  params.push("t_ref **closure");
  for (const astParam of ast.params) {
    params.push("t_value *__" + astParam.name);
  }
  transpiler.pushFunction("t_value *", name, params);

  // Push statements
  await pass.recurseBlock(transpiler, ast.block);

  // Backup return
  transpiler.pushStatement(["return", " ", "null_make()"]);

  // Done
  transpiler.popFunction();
}
