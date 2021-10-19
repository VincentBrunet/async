import { AstExpressionFunction } from "../../../data/ast/AstExpressionFunction.ts";
import { AstTypeFunctionParam } from "../../../data/ast/AstTypeFunction.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { makeTypeFunction } from "../../../lib/typing/makeTypeFunction.ts";
import { makeTypeOrFromArray } from "../../../lib/typing/makeTypeOrFromArray.ts";
import { makeTypePrimitiveAny } from "../../../lib/typing/makeTypePrimitiveAny.ts";
import { makeTypePrimitiveUnknown } from "../../../lib/typing/makeTypePrimitiveUnknown.ts";
import { Scope } from "../util/Scope.ts";

export async function browseExpressionFunction(
  scope: Scope,
  ast: AstExpressionFunction,
  next: () => Promise<void>,
) {
  // Asserts
  const resolvedClosures = ensure(ast.resolvedClosures);
  const resolvedReturns = ensure(ast.resolvedReturns);

  // Prepare a simple original annotation-based type
  for (const param of ast.params) {
    param.resolvedType = param.annotation.type ??
      makeTypePrimitiveAny(param);
  }
  const typeParams: AstTypeFunctionParam[] = ast.params.map((param) => {
    return {
      name: param.name,
      type: param.resolvedType ?? makeTypePrimitiveUnknown(param),
    };
  });
  if (ast.ret.type) {
    ast.resolvedType = makeTypeFunction(typeParams, ast.ret.type, ast);
  }

  // Resolve closures types
  for (const closure of resolvedClosures) {
    closure.resolvedType = ensure(closure.resolvedReference).data.resolvedType;
  }

  // Recurse in function statements
  await next();

  // Find all return types
  const returns = makeTypeOrFromArray(
    resolvedReturns.map((resolvedReturn) =>
      ensure(resolvedReturn.resolvedType)
    ),
    ast,
  );

  const typeReturn = ast.ret.type ?? returns ??
    makeTypePrimitiveUnknown(ast.ret);

  ast.resolvedType = makeTypeFunction(typeParams, typeReturn, ast);
}
