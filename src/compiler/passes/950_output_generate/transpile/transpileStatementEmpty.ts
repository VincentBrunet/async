import { AstStatementEmpty } from '../../../data/ast/AstStatementEmpty.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';

export function transpileStatementEmpty(
  pass: RecursorPass,
  ast: AstStatementEmpty,
  transpiler: Transpiler,
) {
  transpiler.pushStatement([]);
}
