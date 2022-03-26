import { AstReferenceValueClosure } from '../../../data/ast/AstReferenceValueClosure.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { utilTypeForReferenceValue } from './utilTypeForReferenceValue.ts';

export function utilTypeForReferenceValueClosure(ast: AstReferenceValueClosure) {
  const referenceValue = ensure(ast.resolvedReferenceValue, ast.name);
  return utilTypeForReferenceValue(referenceValue);
}
