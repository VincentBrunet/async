import { AstType, AstTypeKind } from "../../data/ast/AstType.ts";
import { AstTypeBinary } from "../../data/ast/AstTypeBinary.ts";
import { AstTypeFunction } from "../../data/ast/AstTypeFunction.ts";
import { AstTypeIdentifier } from "../../data/ast/AstTypeIdentifier.ts";
import { AstTypeObject } from "../../data/ast/AstTypeObject.ts";
import { AstTypePrimitive } from "../../data/ast/AstTypePrimitive.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseType<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstType,
) {
  const kind = ast.kind;
  const data = ast.data;
  switch (kind) {
    case AstTypeKind.Identifier: {
      await r.recurseTypeIdentifier(p, data as AstTypeIdentifier);
      break;
    }
    case AstTypeKind.Primitive: {
      await r.recurseTypePrimitive(p, data as AstTypePrimitive);
      break;
    }
    case AstTypeKind.Function: {
      await r.recurseTypeFunction(p, data as AstTypeFunction);
      break;
    }
    case AstTypeKind.Object: {
      await r.recurseTypeObject(p, data as AstTypeObject);
      break;
    }
    case AstTypeKind.Binary: {
      await r.recurseTypeBinary(p, data as AstTypeBinary);
      break;
    }
  }
}
