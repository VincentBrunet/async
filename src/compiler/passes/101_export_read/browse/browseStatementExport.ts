import { astStatementAsTypedef, astStatementAsVariable } from '../../../data/ast/AstStatement.ts';
import { AstStatementExport } from '../../../data/ast/AstStatementExport.ts';

export function browseStatementExport(
  ast: AstStatementExport,
) {
  const variable = astStatementAsVariable(ast.statement);
  if (variable) {
    ast.resolvedName = variable.name;
    return;
  }
  const typedef = astStatementAsTypedef(ast.statement);
  if (typedef) {
    ast.resolvedName = typedef.name;
    return;
  }
}
