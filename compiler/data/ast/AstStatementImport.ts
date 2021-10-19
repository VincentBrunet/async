import { Ast } from "./Ast.ts";
import { AstExpression } from "./AstExpression.ts";
import { AstModule } from "./AstModule.ts";
import { AstType } from "./AstType.ts";

export interface AstStatementImportSlot extends Ast {
  name: string;
  hash: string;

  resolvedType?: AstType;
}

export interface AstStatementImport extends Ast {
  slots: Array<AstStatementImportSlot>;
  url: AstExpression;

  resolvedModule?: AstModule;
}
