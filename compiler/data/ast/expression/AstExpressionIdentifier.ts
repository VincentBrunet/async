import { AstResolvedReference } from "../resolved/AstResolvedReference.ts";

export interface AstExpressionIdentifier {
  name: string;
  reference?: AstResolvedReference;
}
