import { AstType, AstTypeKind } from '../../data/ast/AstType.ts';
import { AstTypeBinary } from '../../data/ast/AstTypeBinary.ts';
import { AstTypeFunction } from '../../data/ast/AstTypeFunction.ts';
import { AstTypeIdentifier } from '../../data/ast/AstTypeIdentifier.ts';
import { AstTypeObject } from '../../data/ast/AstTypeObject.ts';
import { AstTypePrimitive } from '../../data/ast/AstTypePrimitive.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseType(r: RecursorPass, ast: AstType) {
  const kind = ast.kind;
  const data = ast.data;
  switch (kind) {
    case AstTypeKind.Identifier: {
      r.recurseTypeIdentifier(data as AstTypeIdentifier);
      break;
    }
    case AstTypeKind.Primitive: {
      r.recurseTypePrimitive(data as AstTypePrimitive);
      break;
    }
    case AstTypeKind.Function: {
      r.recurseTypeFunction(data as AstTypeFunction);
      break;
    }
    case AstTypeKind.Object: {
      r.recurseTypeObject(data as AstTypeObject);
      break;
    }
    case AstTypeKind.Binary: {
      r.recurseTypeBinary(data as AstTypeBinary);
      break;
    }
  }
}
