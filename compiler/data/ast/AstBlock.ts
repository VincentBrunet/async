import { Ast } from "./Ast.ts";
import { AstStatement } from "./AstStatement.ts";

export interface AstBlock extends Ast {
  statements: Array<AstStatement>;
}
