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
  ast.resolvedType = ast.annotation.type;
  if (ast.resolvedClosures) {
    for (const closure of ast.resolvedClosures) {
      closure.resolvedType = closure.resolvedReference?.data.resolvedType;
    }
  }

  next();

  const foundFields: AstTypeObjectField[] = [];
  if (ast.resolvedVariables) {
    for (const variable of ast.resolvedVariables) {
      foundFields.push({
        mutable: variable.mutable,
        name: variable.name,
        hash: variable.hash,
        type: variable.resolvedType ?? makeTypePrimitiveUnknown(variable),
        token: variable.token,
      });
    }
  }

  ast.resolvedType = ast.annotation.type ?? makeTypeObject(foundFields, ast);
}
