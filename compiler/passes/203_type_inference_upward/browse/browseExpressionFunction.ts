import { AstExpressionFunction } from "../../../data/ast/AstExpressionFunction.ts";
import { makeTypeFunction } from "../../../lib/typing/makeTypeFunction.ts";
import { makeTypeOr } from "../../../lib/typing/makeTypeOr.ts";
import { makeTypePrimitiveAny } from "../../../lib/typing/makeTypePrimitiveAny.ts";
import { makeTypePrimitiveUnknown } from "../../../lib/typing/makeTypePrimitiveUnknown.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export async function browseExpressionFunction(
  scope: BrowsedScope,
  ast: AstExpressionFunction,
  next: () => Promise<void>,
) {
  for (const param of ast.params) {
    param.resolvedType = param.annotation.type ??
      makeTypePrimitiveAny(param);
  }
  const typeParams = ast.params.map((param) => {
    return {
      name: param.name,
      type: param.resolvedType!,
    };
  });

  if (ast.ret.type) {
    ast.resolvedType = makeTypeFunction(typeParams, ast.ret.type, ast);
  }

  if (ast.resolvedClosures) {
    for (const closure of ast.resolvedClosures) {
      closure.resolvedType = closure.resolvedReference?.data.resolvedType;
    }
  }

  await next();

  const returns = ast.resolvedReturns ?? [];
  let currentReturn = returns[0]?.expression.resolvedType;
  for (let i = 1; i < returns.length; i++) {
    const nextReturn = returns[i].expression.resolvedType;
    if (currentReturn && nextReturn) {
      currentReturn = makeTypeOr(currentReturn, nextReturn, ast);
    }
  }

  const typeReturn = ast.ret.type ?? currentReturn ??
    makeTypePrimitiveUnknown(ast.ret);

  /*
  if (typeReturn === undefined) {
    throw new Error("cannot resolve return type");
  }
  */

  ast.resolvedType = makeTypeFunction(typeParams, typeReturn, ast);
}
