import { AstResolvedReference } from "./AstResolvedReference.ts";
import { AstType } from "./AstType.ts";

export interface AstExpressionIdentifier {
  name: string;

  resolvedType?: AstType;
  resolvedReference?: AstResolvedReference;
}
