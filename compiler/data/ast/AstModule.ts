import { Token } from "../token/Token.ts";
import { Ast } from "./Ast.ts";
import { AstStatement } from "./AstStatement.ts";
import { AstStatementImport } from "./AstStatementImport.ts";

export interface AstModule extends Ast {
  url: string;
  hash: string;
  tokens: Array<Token>;
  statements: Array<AstStatement>;

  resolvedImports?: Array<AstStatementImport>;
  resolvedExports?: Array<AstStatementImport>;
}
