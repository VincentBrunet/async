import { AstExpressionCall } from '../../../data/ast/AstExpressionCall.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';

export function transpileExpressionCall(
  pass: RecursorPass,
  expressionCall: AstExpressionCall,
  transpiler: Transpiler,
) {
  pass.recurseExpression(expressionCall.callee);
  transpiler.pushStatementPart('->call(');
  expressionCall.params.forEach((param, index) => {
    if (index > 0) {
      transpiler.pushStatementPart(', ');
    }
    pass.recurseExpression(param);
  });
  transpiler.pushStatementPart(')');
}
