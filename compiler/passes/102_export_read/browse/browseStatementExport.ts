import { AstModule } from "../../../data/ast/AstModule.ts";
import { AstStatementKind } from "../../../data/ast/AstStatement.ts";
import { AstStatementExport } from "../../../data/ast/AstStatementExport.ts";
import { AstStatementTypedef } from "../../../data/ast/AstStatementTypedef.ts";
import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";
import { never } from "../../../lib/errors/never.ts";

export async function browseStatementExport(
  scope: AstModule,
  ast: AstStatementExport,
  next: () => Promise<void>,
) {
  await next();

  const kind = ast.statement.kind;
  const data = ast.statement.data;
  switch (kind) {
    case AstStatementKind.Variable:
      ast.resolvedStatementVariable = (data as AstStatementVariable);
      ast.resolvedName = ast.resolvedStatementVariable.name;
      break;
    case AstStatementKind.Typedef:
      ast.resolvedStatementTypedef = (data as AstStatementTypedef);
      ast.resolvedName = ast.resolvedStatementTypedef.name;
      break;
    default:
      never();
  }
}
