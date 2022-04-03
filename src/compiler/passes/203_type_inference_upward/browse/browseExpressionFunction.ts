import { AstExpressionFunction } from '../../../data/ast/AstExpressionFunction.ts';
import { AstTypeFunctionParam } from '../../../data/ast/AstTypeFunction.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { makeTypeFunction } from '../../../lib/typing/makeTypeFunction.ts';
import { makeTypeOrFromArray } from '../../../lib/typing/makeTypeOrFromArray.ts';
import { makeTypePrimitiveAny } from '../../../lib/typing/makeTypePrimitiveAny.ts';
import { makeTypePrimitiveUnknown } from '../../../lib/typing/makeTypePrimitiveUnknown.ts';
import { utilTypeForReferenceClosure } from '../util/utilTypeForReferenceClosure.ts';
import { Tracker } from '../util/Tracker.ts';

export function browseExpressionFunction(
  next: () => void,
  ast: AstExpressionFunction,
  tracker: Tracker,
) {
  // Asserts
  const referenceClosures = ensure(ast.referenceClosures);
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
    ast.resolvedTypeRet = ast.ret.type;
  }

  // Resolve closures types
  for (const referenceClosure of referenceClosures) {
    referenceClosure.resolvedType = utilTypeForReferenceClosure(referenceClosure);
  }

  // Recurse in function statements
  next();

  // Find all return types
  const returns = makeTypeOrFromArray(
    resolvedReturns.map((resolvedReturn) => ensure(resolvedReturn.resolvedType)),
    ast,
  );
  console.log('returns', returns);
  const typeReturn = ast.ret.type ?? returns ??
    makeTypePrimitiveUnknown(ast.ret);

  console.log('returnType', typeReturn);

  ast.resolvedType = makeTypeFunction(typeParams, typeReturn, ast);
  ast.resolvedTypeRet = typeReturn;
}
