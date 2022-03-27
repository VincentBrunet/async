import { AstExpressionRun } from '../../../data/ast/AstExpressionRun.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { utilBrowseReferenceValueClosure } from '../util/utilBrowseReferenceValueClosure.ts';

export function browseExpressionRun(expressionRun: AstExpressionRun) {
  const referenceValueClosures = ensure(expressionRun.referenceValueClosures);
  for (const referenceValueClosure of referenceValueClosures) {
    utilBrowseReferenceValueClosure(referenceValueClosure);
  }
}
