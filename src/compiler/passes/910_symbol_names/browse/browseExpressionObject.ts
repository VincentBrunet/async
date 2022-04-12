import { AstExpressionObject } from '../../../data/ast/AstExpressionObject.ts';
import { ensure } from '../../errors/ensure.ts';
import { hashFileSymbol } from '../util/hashFileSymbol.ts';
import { hashLocalSymbol } from '../util/hashLocalSymbol.ts';

export function browseExpressionObject(
  astExpressionObject: AstExpressionObject,
): void {
  for (const astReferenceClosure of ensure(astExpressionObject.referenceClosures)) {
    astReferenceClosure.symbolLocalValue = hashLocalSymbol('closure', astReferenceClosure.name);
  }
  for (const astExpressionObjectField of astExpressionObject.fields) {
    astExpressionObjectField.symbolLocalValue = hashLocalSymbol('field', astExpressionObjectField.name);
  }
  astExpressionObject.symbolFileCallableFunction = hashFileSymbol(astExpressionObject, 'obj_callable');
  astExpressionObject.symbolFileFieldsStatic = hashFileSymbol(astExpressionObject, 'obj_fields');
}
