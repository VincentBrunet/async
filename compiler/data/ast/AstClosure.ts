import { AstReference } from "./AstReference.ts";

export interface AstClosure {
  name: string;
  reference?: AstReference;
}
