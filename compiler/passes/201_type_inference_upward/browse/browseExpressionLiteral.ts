import {
  AstExpressionLiteral,
  AstExpressionLiteralKind,
} from "../../../data/ast/AstExpressionLiteral.ts";
import { AstTypeKind } from "../../../data/ast/AstType.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionLiteral(
  scope: BrowsedScope,
  ast: AstExpressionLiteral,
  next: () => void,
) {
  next();
  let name: string | undefined;
  switch (ast.kind) {
    case AstExpressionLiteralKind.Boolean:
      name = "bool";
      break;
    case AstExpressionLiteralKind.Float32:
      name = "f32";
      break;
    case AstExpressionLiteralKind.Float64:
      name = "f64";
      break;
    case AstExpressionLiteralKind.Integer8:
      name = "i8";
      break;
    case AstExpressionLiteralKind.Integer16:
      name = "i16";
      break;
    case AstExpressionLiteralKind.Integer32:
      name = "i32";
      break;
    case AstExpressionLiteralKind.Integer64:
      name = "i64";
      break;
    case AstExpressionLiteralKind.Unsigned16:
      name = "u8";
      break;
    case AstExpressionLiteralKind.Unsigned16:
      name = "u16";
      break;
    case AstExpressionLiteralKind.Unsigned32:
      name = "u32";
      break;
    case AstExpressionLiteralKind.Unsigned64:
      name = "u64";
      break;
    case AstExpressionLiteralKind.Null:
      name = "null";
      break;
    case AstExpressionLiteralKind.String:
      name = "str";
      break;
  }
  if (!name) {
    throw new Error("Unknown literal type:" + ast.kind);
  }
  ast.resolvedType = {
    kind: AstTypeKind.Identifier,
    data: {
      name: name,
      params: [],
    },
  };
}
