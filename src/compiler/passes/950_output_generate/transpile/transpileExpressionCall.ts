import { AstExpression } from '../../../data/ast/AstExpression.ts';
import { AstExpressionCall } from '../../../data/ast/AstExpressionCall.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';

export function transpileExpressionCall(
  pass: RecursorPass,
  expressionCall: AstExpressionCall,
  transpiler: Transpiler,
) {
  const expressionCallParams = expressionCall.params;

  pass.recurseExpression(expressionCall.callee);
  transpiler.pushStatementPart('(');
  for (let i = 0; i < expressionCallParams.length; i++) {
    const expressionCallParam = expressionCallParams[i];
    if (i > 0) {
      transpiler.pushStatementPart(', ');
    }
    pass.recurseExpression(expressionCallParam);
  }
  transpiler.pushStatementPart(')');
}
