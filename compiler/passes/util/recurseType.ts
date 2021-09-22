import { AstType, AstTypeKind } from "../../data/ast/AstType.ts";
import { AstTypeBinary } from "../../data/ast/AstTypeBinary.ts";
import { AstTypeFunction } from "../../data/ast/AstTypeFunction.ts";
import { AstTypeIdentifier } from "../../data/ast/AstTypeIdentifier.ts";
import { AstTypeObject } from "../../data/ast/AstTypeObject.ts";

export function recurseType<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstType,
) {
  const kind = ast.kind;
  const data = ast.data;
  switch (kind) {
    case AstTypeKind.Identifier: {
      r.recurseTypeIdentifier(p, data as AstTypeIdentifier);
      break;
    }
    case AstTypeKind.Function: {
      r.recurseTypeFunction(p, data as AstTypeFunction);
      break;
    }
    case AstTypeKind.Object: {
      r.recurseTypeObject(p, data as AstTypeObject);
      break;
    }
    case AstTypeKind.Binary: {
      r.recurseTypeBinary(p, data as AstTypeBinary);
      break;
    }
  }
}
