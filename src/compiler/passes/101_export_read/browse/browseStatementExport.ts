import { AstStatementKind } from '../../../data/ast/AstStatement.ts';
import { AstStatementExport } from '../../../data/ast/AstStatementExport.ts';
import { AstStatementTypedef } from '../../../data/ast/AstStatementTypedef.ts';
import { AstStatementVariable } from '../../../data/ast/AstStatementVariable.ts';

export function browseStatementExport(
  ast: AstStatementExport,
) {
  const kind = ast.statement.kind;
  const data = ast.statement.data;
  switch (kind) {
    case AstStatementKind.Variable: {
      ast.resolvedStatementVariable = data as AstStatementVariable;
      ast.resolvedName = ast.resolvedStatementVariable.name;
      break;
    }
    case AstStatementKind.Typedef: {
      ast.resolvedStatementTypedef = data as AstStatementTypedef;
      ast.resolvedName = ast.resolvedStatementTypedef.name;
      break;
    }
  }
}
