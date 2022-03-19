import { AstStatementCondition } from '../../../data/ast/AstStatementCondition.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';

export function transpileStatementCondition(
  pass: RecursorPass,
  ast: AstStatementCondition,
  transpiler: Transpiler,
) {
  for (const branch of ast.branches) {
    // condition
    transpiler.pushStatement(['if (TO_BOOLEAN(']);
    pass.recurseExpression(branch.condition);
    transpiler.pushStatementPart('))');
    // content
    pass.recurseBlock(branch.block);
  }
}
