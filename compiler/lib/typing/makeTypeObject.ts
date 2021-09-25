import { Ast } from "../../data/ast/Ast.ts";
import { AstType, AstTypeKind } from "../../data/ast/AstType.ts";
import { AstTypeObjectField } from "../../data/ast/AstTypeObject.ts";

export function makeTypeObject(
  fields: Array<AstTypeObjectField>,
  source?: Ast,
): AstType {
  return {
    kind: AstTypeKind.Object,
    data: {
      fields: fields,
      token: source?.token,
    },
    token: source?.token,
  };
}
