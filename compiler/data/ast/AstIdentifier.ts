import { AstVariable } from "./AstVariable.ts";

export interface AstIdentifier {
  name: string;
  target?: AstVariable;
}
