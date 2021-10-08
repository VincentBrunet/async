import { AstModule } from "../../../data/ast/AstModule.ts";
import { AstStatementImport } from "../../../data/ast/AstStatementImport.ts";

export async function browseStatementImport(
  scope: AstModule,
  ast: AstStatementImport,
  next: () => Promise<void>,
) {
  for (const slot of ast.slots) {
    slot.resolvedImport = ast;
  }
  await next();
}
