import { AstStatement } from "./AstStatement.ts";

export interface AstBlock {
  statements: Array<AstStatement>;
}
