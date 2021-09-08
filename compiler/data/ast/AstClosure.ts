import { AstReference } from "./AstReference.ts";

export interface AstClosure {
  idx: number;
  name: string;
  reference?: AstReference;
}
