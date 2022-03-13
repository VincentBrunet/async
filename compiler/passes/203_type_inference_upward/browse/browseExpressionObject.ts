import { AstExpressionObject } from "../../../data/ast/AstExpressionObject.ts";
import { AstTypeObjectField } from "../../../data/ast/AstTypeObject.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { makeTypeObject } from "../../../lib/typing/makeTypeObject.ts";
import { makeTypePrimitiveUnknown } from "../../../lib/typing/makeTypePrimitiveUnknown.ts";
import { computeResolvedClosureType } from "../util/computeResolvedClosureType.ts";
import { Scope } from "../util/Scope.ts";

export function browseExpressionObject(
  scope: Scope,
  ast: AstExpressionObject,
  next: () => void,
) {
  // Asserts
  const resolvedClosures = ensure(ast.resolvedClosures);

  // Resolve closures types
  for (const closure of resolvedClosures) {
    closure.resolvedType = computeResolvedClosureType(closure);
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
