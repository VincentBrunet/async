import { AstReference } from "../AstReference.ts";

export interface AstExpressionIdentifier {
  name: string;
  reference?: AstReference;
}
