import { AstExpressionObject } from '../../../data/ast/AstExpressionObject.ts';
import { AstModule } from '../../../data/ast/AstModule.ts';
import { ensure } from '../../errors/ensure.ts';
import { hashFileSymbol } from '../util/hashFileSymbol.ts';
import { hashGlobalSymbol } from '../util/hashGlobalSymbol.ts';
import { hashLocalSymbol } from '../util/hashLocalSymbol.ts';

export function browseExpressionObject(
  astExpressionObject: AstExpressionObject,
  astModule: AstModule,
): void {
  for (const astReferenceClosure of ensure(astExpressionObject.referenceClosures)) {
    astReferenceClosure.symbolLocalValue = hashLocalSymbol('closure', astReferenceClosure.name);
  }
  for (const astExpressionObjectField of astExpressionObject.fields) {
    astExpressionObjectField.symbolLocalValue = hashLocalSymbol('field', astExpressionObjectField.name);
  }
  astExpressionObject.symbolGlobalCallableFunction = hashGlobalSymbol(
    astModule.hash,
    astExpressionObject,
    'obj_callable',
  );
  astExpressionObject.symbolFileFieldsStatic = hashFileSymbol(
    astExpressionObject,
    'obj_fields',
  );
}
