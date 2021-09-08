import { AstReference } from "./AstReference.ts";

export interface AstIdentifier {
  name: string;
  reference?: AstReference;
}
