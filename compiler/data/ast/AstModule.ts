import { TokenModule } from "../token/TokenModule.ts";
import { Ast } from "./Ast.ts";
import { AstStatement } from "./AstStatement.ts";
import { AstStatementImport } from "./AstStatementImport.ts";

export interface AstModule extends Ast {
  meta: TokenModule;

  statements: Array<AstStatement>;

  resolvedImports?: Array<AstStatementImport>;
  resolvedExports?: Array<AstStatementImport>;
}
