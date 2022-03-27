import { AstExpressionObject } from '../../../data/ast/AstExpressionObject.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { utilBrowseReferenceValueClosure } from '../util/utilBrowseReferenceValueClosure.ts';

export function browseExpressionObject(ast: AstExpressionObject) {
  const referenceValueClosures = ensure(ast.referenceValueClosures);
  for (const referenceValueClosure of referenceValueClosures) {
    utilBrowseReferenceValueClosure(referenceValueClosure);
  }
}
