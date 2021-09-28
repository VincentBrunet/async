import { AstExpressionObject } from "../../../data/ast/AstExpressionObject.ts";
import { AstTypeObjectField } from "../../../data/ast/AstTypeObject.ts";
import { makeTypeObject } from "../../../lib/typing/makeTypeObject.ts";
import { makeTypePrimitiveUnknown } from "../../../lib/typing/makeTypePrimitiveUnknown.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionObject(
  scope: BrowsedScope,
  ast: AstExpressionObject,
  next: () => void,
) {
  if (ast.resolvedClosures) {
    for (const closure of ast.resolvedClosures) {
      closure.resolvedType = closure.resolvedReference?.data.resolvedType;
    }
  }

  next();

  const foundFields: AstTypeObjectField[] = [];
  for (const field of ast.fields) {
    foundFields.push({
      mutable: field.mutable,
      name: field.name,
      hash: field.hash,
      type: field.expression.resolvedType ?? makeTypePrimitiveUnknown(field),
      token: field.token,
    });
  }

  ast.resolvedType = makeTypeObject(foundFields, ast);
}
