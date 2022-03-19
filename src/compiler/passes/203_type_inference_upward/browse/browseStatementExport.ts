import { AstStatementExport } from '../../../data/ast/AstStatementExport.ts';
import { Tracker } from '../util/Tracker.ts';

export function browseStatementExport(
  next: () => void,
  ast: AstStatementExport,
  tracker: Tracker,
) {
  next();
}
