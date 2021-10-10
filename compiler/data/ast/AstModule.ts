import { TokenModule } from "../token/TokenModule.ts";
import { Ast } from "./Ast.ts";
import { AstStatement } from "./AstStatement.ts";
import { AstStatementExport } from "./AstStatementExport.ts";
import { AstStatementImport } from "./AstStatementImport.ts";
import { AstStatementVariable } from "./AstStatementVariable.ts";

export interface AstModule extends Ast {
  sourceToken: TokenModule;

  statements: Array<AstStatement>;

  resolvedImports?: Array<AstStatementImport>;
  resolvedExports?: Array<AstStatementExport>;
  resolvedVariables?: Array<AstStatementVariable>;
}
