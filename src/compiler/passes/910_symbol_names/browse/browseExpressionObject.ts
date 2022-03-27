import { AstExpressionObject } from '../../../data/ast/AstExpressionObject.ts';
import { AstModule } from '../../../data/ast/AstModule.ts';
import { ensure } from '../../errors/ensure.ts';
import { hashGlobalSymbol } from '../util/hashGlobalSymbol.ts';
import { hashLocalSymbol } from '../util/hashLocalSymbol.ts';

export function browseExpressionObject(
  astExpressionObject: AstExpressionObject,
  astModule: AstModule,
): void {
  for (const astReferenceValueClosure of ensure(astExpressionObject.referenceValueClosures)) {
    astReferenceValueClosure.symbolLocalValue = hashLocalSymbol('closure', astReferenceValueClosure.name);
  }
  for (const astExpressionObjectField of astExpressionObject.fields) {
    astExpressionObjectField.symbolLocalValue = hashLocalSymbol('field', astExpressionObjectField.name);
  }
  astExpressionObject.symbolGlobalCallableFunction = hashGlobalSymbol(
    astModule.hash,
    astExpressionObject,
    'obj_callable',
  );
  astExpressionObject.symbolGlobalFieldsGlobal = hashGlobalSymbol(
    astModule.hash,
    astExpressionObject,
    'obj_fields',
  );
}
