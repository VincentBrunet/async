import { AstResolvedReference } from "./AstResolvedReference.ts";

export interface AstExpressionIdentifier {
  name: string;
  reference?: AstResolvedReference;
}
