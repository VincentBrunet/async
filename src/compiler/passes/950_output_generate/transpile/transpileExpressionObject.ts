import { AstExpressionObject, AstExpressionObjectField } from '../../../data/ast/AstExpressionObject.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';
import { utilTranspileReferenceValueClosure } from '../util/utilTranspileReferenceValueClosure.ts';
import { utilTranspileTypeAnnotation } from '../util/utilTranspileTypeAnnotation.ts';

export function transpileExpressionObject(
  pass: RecursorPass,
  astExpressionObject: AstExpressionObject,
  transpiler: Transpiler,
) {
  // Assert
  const referenceValueClosures = ensure(astExpressionObject.referenceValueClosures);

  const symbolGlobalCallableFunction = ensure(astExpressionObject.symbolGlobalCallableFunction);
  const symbolGlobalFieldsGlobal = ensure(astExpressionObject.symbolGlobalFieldsGlobal);

  transpiler.pushStatementPart(symbolGlobalCallableFunction);
  transpiler.pushStatementPart('(');
  for (const referenceValueClosure of referenceValueClosures) {
    if (referenceValueClosure.idx !== 0) {
      transpiler.pushStatementPart(', ');
    }
    utilTranspileReferenceValueClosure(referenceValueClosure, transpiler);
  }
  transpiler.pushStatementPart(')');

  // New scope
  const transpiledType = utilTranspileTypeAnnotation(ensure(astExpressionObject.resolvedType));
  transpiler.pushFunction(
    transpiledType,
    symbolGlobalCallableFunction,
    referenceValueClosures.map((referenceValueClosure) => {
      return {
        type: utilTranspileTypeAnnotation(ensure(referenceValueClosure.resolvedType)),
        name: ensure(referenceValueClosure.symbolLocalValue),
      };
    }),
  );

  // Fields
  const unsortedFields = astExpressionObject.fields;
  const sortedFields = [...unsortedFields].sort(
    (a: AstExpressionObjectField, b: AstExpressionObjectField) => {
      if (a.hash < b.hash) {
        return -1;
      } else if (a.hash > b.hash) {
        return 1;
      } else {
        return 0;
      }
    },
  );

  // Create the module object containing all declared fields
  const fieldLength = sortedFields.length.toString();

  transpiler.pushStatic(
    't_u64[]',
    symbolGlobalFieldsGlobal,
    [
      '{',
      sortedFields.map((field) => field.hash).join(', '),
      '}',
    ].join(' '),
  );

  const objectMakeParts = [];
  objectMakeParts.push('t_object object = object_make');
  objectMakeParts.push('(');
  objectMakeParts.push('type_object'); // TODO
  objectMakeParts.push(', ');
  objectMakeParts.push(fieldLength);
  objectMakeParts.push(', ');
  objectMakeParts.push(symbolGlobalFieldsGlobal);
  objectMakeParts.push(')');
  transpiler.pushStatement(objectMakeParts);

  // Read a variable field pointer
  if (sortedFields.length) {
    transpiler.pushStatement(['t_field fields = object->data.object.fields']);
  }

  // Make local references to created fields
  for (let i = 0; i < sortedFields.length; i++) {
    const sortedField = sortedFields[i];
    transpiler.pushStatement([
      't_field',
      ' ',
      ensure(sortedField.symbolLocalValue),
      ' = ',
      '(t_field)&(fields[',
      i.toString(),
      '])',
    ]);
  }

  // Do the assignation in the code's order (not the hash order)
  for (const unsortedField of unsortedFields) {
    transpiler.pushStatement([
      ensure(unsortedField.symbolLocalValue),
      '->value',
      ' = ',
    ]);
    pass.recurseExpression(unsortedField.expression);
  }

  // We simply return the object
  transpiler.pushStatement(['return', ' ', 'object']);

  // Done, push the newly created function
  transpiler.popFunction();
}
