import { AstStatement } from "./AstStatement.ts";

export interface AstModule {
  statements: Array<AstStatement>;
}
