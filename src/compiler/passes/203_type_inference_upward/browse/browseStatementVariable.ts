import { AstStatementVariable } from '../../../data/ast/AstStatementVariable.ts';
import { Tracker } from '../util/Tracker.ts';

export function browseStatementVariable(
  next: () => void,
  ast: AstStatementVariable,
  tracker: Tracker,
) {
  ast.resolvedType = ast.annotation.type;
  next();
  ast.resolvedType = ast.annotation.type ?? ast.value?.resolvedType;
}
