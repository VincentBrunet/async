import { AstExpressionFunction } from '../../../data/ast/AstExpressionFunction.ts';
import { AstTypeFunctionParam } from '../../../data/ast/AstTypeFunction.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { makeTypeFunction } from '../../../lib/typing/makeTypeFunction.ts';
import { makeTypeOrFromArray } from '../../../lib/typing/makeTypeOrFromArray.ts';
import { makeTypePrimitiveAny } from '../../../lib/typing/makeTypePrimitiveAny.ts';
import { makeTypePrimitiveUnknown } from '../../../lib/typing/makeTypePrimitiveUnknown.ts';
import { utilTypeForReferenceClosure } from '../util/utilTypeForReferenceClosure.ts';
import { Tracker } from '../util/Tracker.ts';
import { makeAnnotationType } from '../../../lib/typing/makeAnnotationType.ts';

export function browseExpressionFunction(
  next: () => void,
  expressionFunction: AstExpressionFunction,
  tracker: Tracker,
) {
  // Asserts
  const referenceClosures = ensure(expressionFunction.referenceClosures);
  const resolvedReturns = ensure(expressionFunction.resolvedReturns);

  // Prepare a simple original annotation-based type
  for (const param of expressionFunction.params) {
    param.resolvedType = param.annotation.type ??
      makeTypePrimitiveAny(param);
  }
  const typeParams: AstTypeFunctionParam[] = expressionFunction.params.map((param) => {
    return {
      name: param.name,
      annotation: makeAnnotationType(param.resolvedType),
    };
  });

  const returnAnnotationType = expressionFunction.ret.annotation.type;
  if (returnAnnotationType) {
    expressionFunction.ret.resolvedType = returnAnnotationType;
  }

  // Resolve closures types
  for (const referenceClosure of referenceClosures) {
    referenceClosure.resolvedType = utilTypeForReferenceClosure(referenceClosure);
  }

  // Recurse in function statements (to compute returns statements)
  next();

  // Compute the final return type by finding all returns
  const returnResolvedType = makeTypeOrFromArray(
    resolvedReturns.map((resolvedReturn) => ensure(resolvedReturn.resolvedType)),
    expressionFunction,
  );
  expressionFunction.ret.resolvedType = expressionFunction.ret.resolvedType ?? returnResolvedType;

  // Compute the final function type based on params and return type
  expressionFunction.resolvedType = makeTypeFunction(
    typeParams,
    {
      annotation: makeAnnotationType(ensure(expressionFunction.ret.resolvedType)),
    },
    expressionFunction,
  );
}
