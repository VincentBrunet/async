import { AstExpressionIdentifier } from '../../../data/ast/AstExpressionIdentifier.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';
import { utilTranspileReferenceValueToExpression } from '../util/utilTranspileReferenceValueToExpression.ts';

export function transpileExpressionIdentifier(
  pass: RecursorPass,
  astIdentifier: AstExpressionIdentifier,
  transpiler: Transpiler,
) {
  transpiler.pushStatementPart(utilTranspileReferenceValueToExpression(
    ensure(astIdentifier.resolvedReferenceValue),
    true,
  ));
}
