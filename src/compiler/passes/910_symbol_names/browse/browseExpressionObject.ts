import { AstExpressionObject } from '../../../data/ast/AstExpressionObject.ts';
import { ensure } from '../../errors/ensure.ts';
import { hashFileSymbol } from '../util/hashFileSymbol.ts';
import { hashLocalSymbol } from '../util/hashLocalSymbol.ts';

export function browseExpressionObject(
  astExpressionObject: AstExpressionObject,
): void {
  for (const astReferenceClosure of ensure(astExpressionObject.referenceClosures)) {
    astReferenceClosure.symbolLocalParam = hashLocalSymbol('closure', astReferenceClosure.name);
    astReferenceClosure.symbolLocalValue = astReferenceClosure.symbolLocalParam;
  }
  for (const astExpressionObjectField of astExpressionObject.fields) {
    astExpressionObjectField.symbolLocalValue = hashLocalSymbol('field', astExpressionObjectField.name);
  }
  astExpressionObject.symbolFileImplementationFunction = hashFileSymbol(astExpressionObject, 'obj_implementation');
  astExpressionObject.symbolFileFieldsStatic = hashFileSymbol(astExpressionObject, 'obj_fields');
}
