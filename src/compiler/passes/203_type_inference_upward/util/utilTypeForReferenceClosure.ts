import { AstReferenceClosure } from '../../../data/ast/AstReferenceClosure.ts';
import { AstType } from '../../../data/ast/AstType.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { utilTypeForReferenceValue } from './utilTypeForReferenceValue.ts';

export function utilTypeForReferenceClosure(ast: AstReferenceClosure): AstType | undefined {
  const referenceValue = ensure(ast.resolvedReferenceValue, ast.name);
  return utilTypeForReferenceValue(referenceValue);
}
