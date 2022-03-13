import { AstExpressionFunction } from "../../../data/ast/AstExpressionFunction.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { hashGlobalSymbol } from "../../../lib/hash/hashGlobalSymbol.ts";
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
  const name = hashGlobalSymbol(
    transpiler.getOutput().sourceAst,
    ast,
    "function",
  );

  // Simply call the function factory
  const functionMakeLength = resolvedClosures.length.toString();
  const functionMakeVariadic = resolvedClosures.length > 9;
  transpiler.pushPart("function_make_");
  if (functionMakeVariadic) {
    transpiler.pushPart("x");
  } else {
    transpiler.pushPart(functionMakeLength);
  }
  transpiler.pushPart("(");
  transpiler.pushPart("type_function"); // TODO,
  transpiler.pushPart(", ");
  transpiler.pushPart("(void*)&");
  transpiler.pushPart(name);
  if (functionMakeVariadic) {
    transpiler.pushPart(", ");
    transpiler.pushPart(functionMakeLength);
  }
  for (const astClosure of resolvedClosures) {
    transpiler.pushPart(", ");
    transpileResolvedClosure(transpiler, astClosure);
  }
  transpiler.pushPart(")");

  // New function
  const params = [];
  params.push("t_ref **closure");
  for (let i = 0; i < ast.params.length; i++) {
    const astParam = ast.params[i];
    if (astParam.name) {
      params.push("t_value *_param_" + astParam.name);
    } else {
      params.push("t_value *_param" + i);
    }
  }
  transpiler.pushFunction("t_value *", name, params);

  // Push block statements
  transpiler.pushStatement(["/* function block */"]);
  pass.recurseBlock(transpiler, ast.block);

  // Backup return
  transpiler.pushStatement(["return", " ", "null_make()"]);

  // Done
  transpiler.popFunction();
}
