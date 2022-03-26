import { AstExpressionObject } from '../../../data/ast/AstExpressionObject.ts';
import { AstTypeObjectField } from '../../../data/ast/AstTypeObject.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { makeTypeObject } from '../../../lib/typing/makeTypeObject.ts';
import { makeTypePrimitiveUnknown } from '../../../lib/typing/makeTypePrimitiveUnknown.ts';
import { utilTypeForReferenceValueClosure } from '../util/utilTypeForReferenceValueClosure.ts';
import { Tracker } from '../util/Tracker.ts';

export function browseExpressionObject(
  next: () => void,
  ast: AstExpressionObject,
  tracker: Tracker,
) {
  // Asserts
  const referenceValueClosures = ensure(ast.referenceValueClosures);

  // Resolve closures types
  for (const referenceValueClosure of referenceValueClosures) {
    referenceValueClosure.resolvedType = utilTypeForReferenceValueClosure(referenceValueClosure);
  }

  // Prep type before recursion
  ast.resolvedType = ast.annotation.type;

  // Recurse in objects statements
  next();

  // Check all fields types
  const foundFields: AstTypeObjectField[] = [];
  for (const field of ast.fields) {
    foundFields.push({
      mutable: field.mutable,
      name: field.name,
      hash: field.hash,
      type: field.annotation.type ?? field.expression.resolvedType ??
        makeTypePrimitiveUnknown(field),
      token: field.token,
    });
  }

  ast.resolvedType = ast.annotation.type ?? makeTypeObject(foundFields, ast);
}
