import { AstType, AstTypeKind } from "../../data/ast/AstType.ts";
import { AstTypeBinary } from "../../data/ast/AstTypeBinary.ts";
import { AstTypeFunction } from "../../data/ast/AstTypeFunction.ts";
import { AstTypeIdentifier } from "../../data/ast/AstTypeIdentifier.ts";
import { AstTypeObject } from "../../data/ast/AstTypeObject.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseType<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstType,
) {
  const kind = ast.kind;
  const data = ast.data;
  switch (kind) {
    case AstTypeKind.Identifier: {
      r.recurseTypeIdentifier(r, p, data as AstTypeIdentifier);
      break;
    }
    case AstTypeKind.Function: {
      r.recurseTypeFunction(r, p, data as AstTypeFunction);
      break;
    }
    case AstTypeKind.Object: {
      r.recurseTypeObject(r, p, data as AstTypeObject);
      break;
    }
    case AstTypeKind.Binary: {
      r.recurseTypeBinary(r, p, data as AstTypeBinary);
      break;
    }
  }
}
