import { AstStatementCondition } from '../../../data/ast/AstStatementCondition.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';

export function transpileStatementCondition(
  pass: RecursorPass,
  astCondition: AstStatementCondition,
  transpiler: Transpiler,
) {
  const astConditionBranches = astCondition.branches;
  for (let i = 0; i < astConditionBranches.length; i++) {
    const astConditionBranch = astConditionBranches[i];
    if (i === 0) {
      transpiler.pushStatement(['if ('], false);
      pass.recurseExpression(astConditionBranch.condition);
      transpiler.pushStatementPart(')');
    } else {
      transpiler.pushStatement(['else if ('], false);
      pass.recurseExpression(astConditionBranch.condition);
      transpiler.pushStatementPart(')');
    }
    pass.recurseBlock(astConditionBranch.block);
  }
}
