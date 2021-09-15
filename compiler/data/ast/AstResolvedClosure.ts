import { AstResolvedReference } from "./AstResolvedReference.ts";

export interface AstResolvedClosure {
  idx: number;
  name: string;
  reference?: AstResolvedReference;
}
