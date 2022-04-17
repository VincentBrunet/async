import { AstStatementVariable } from '../../../data/ast/AstStatementVariable.ts';
import { hashLocalSymbol } from '../util/hashLocalSymbol.ts';

export function browseStatementVariable(
  astStatementVariable: AstStatementVariable,
) {
  astStatementVariable.symbolLocalVariable = hashLocalSymbol('variable', astStatementVariable.name);
}
