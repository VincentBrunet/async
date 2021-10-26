import { Ast } from "./Ast.ts";
import { AstExpression } from "./AstExpression.ts";
import { AstModule } from "./AstModule.ts";
import { AstStatementTypedef } from "./AstStatementTypedef.ts";
import { AstStatementVariable } from "./AstStatementVariable.ts";
import { AstType } from "./AstType.ts";

export interface AstStatementImportSlot extends Ast {
  name: string;

  resolvedStatementVariable?: AstStatementVariable;
  resolvedStatementTypedef?: AstStatementTypedef;
  resolvedType?: AstType;
}

export interface AstStatementImport extends Ast {
  slots: Array<AstStatementImportSlot>;
  url: AstExpression;

  resolvedModule?: AstModule;
}
