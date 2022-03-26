import { AstStatementImport } from '../../../data/ast/AstStatementImport.ts';
import { Tracker } from '../util/Tracker.ts';

export function browseStatementImport(
  next: () => void,
  ast: AstStatementImport,
  tracker: Tracker,
) {
  next();
}
