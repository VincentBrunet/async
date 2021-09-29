import { Token } from "../token/Token.ts";
import { Ast } from "./Ast.ts";
import { AstStatement } from "./AstStatement.ts";

export interface AstModule extends Ast {
  hash: string;
  tokens: Array<Token>;

  statements: Array<AstStatement>;
}
