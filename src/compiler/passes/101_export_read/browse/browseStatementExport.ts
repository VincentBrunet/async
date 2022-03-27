import { astStatementAsStatementTypedef, astStatementAsStatementVariable } from '../../../data/ast/AstStatement.ts';
import { AstStatementExport } from '../../../data/ast/AstStatementExport.ts';

export function browseStatementExport(
  ast: AstStatementExport,
) {
  const variable = astStatementAsStatementVariable(ast.statement);
  if (variable) {
    ast.resolvedName = variable.name;
    return;
  }
  const typedef = astStatementAsStatementTypedef(ast.statement);
  if (typedef) {
    ast.resolvedName = typedef.name;
    return;
  }
}
