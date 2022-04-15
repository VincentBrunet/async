import { AstExpressionObject, AstExpressionObjectField } from '../../../data/ast/AstExpressionObject.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';
import { utilTranspileReferenceClosureToAnnotation } from '../util/utilTranspileReferenceClosureToAnnotation.ts';
import { utilTranspileReferenceClosureToExpression } from '../util/utilTranspileReferenceClosureToExpression.ts';
import { utilTranspileTypeToAnnotation } from '../util/utilTranspileTypeToAnnotation.ts';

export function transpileExpressionObject(
  pass: RecursorPass,
  astExpressionObject: AstExpressionObject,
  transpiler: Transpiler,
) {
  // Assert
  const referenceClosures = ensure(astExpressionObject.referenceClosures);

  const symbolFileImplementationFunction = ensure(astExpressionObject.symbolFileImplementationFunction);
  const symbolFileFieldsStatic = ensure(astExpressionObject.symbolFileFieldsStatic);

  transpiler.pushStatementPart(symbolFileImplementationFunction);
  transpiler.pushStatementPart('(');
  referenceClosures.forEach((referenceClosure, index) => {
    if (index !== 0) {
      transpiler.pushStatementPart(', ');
    }
    transpiler.pushStatementPart(utilTranspileReferenceClosureToExpression(referenceClosure));
  });
  transpiler.pushStatementPart(')');

  // New scope
  const transpiledType = utilTranspileTypeToAnnotation(
    ensure(astExpressionObject.resolvedType),
    false,
  );
  transpiler.pushFunction(
    false,
    transpiledType,
    symbolFileImplementationFunction,
    referenceClosures.map((referenceClosure) => {
      return {
        name: ensure(referenceClosure.symbolLocalParam),
        type: utilTranspileReferenceClosureToAnnotation(referenceClosure) + '&',
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
    'ac::u64',
    symbolFileFieldsStatic + '[]',
    [
      '{',
      sortedFields.map((field) => field.hash).join(', '),
      '}',
    ].join(' '),
  );

  const objectMakeParts = [];
  objectMakeParts.push('ac::object object = object_make');
  objectMakeParts.push('(');
  objectMakeParts.push('type_object'); // TODO
  objectMakeParts.push(', ');
  objectMakeParts.push(fieldLength);
  objectMakeParts.push(', ');
  objectMakeParts.push(symbolFileFieldsStatic);
  objectMakeParts.push(')');
  transpiler.pushStatement(objectMakeParts);

  // Read a variable field pointer
  //if (sortedFields.length) {
  //transpiler.pushStatement(['ac::field fields = object->data.object.fields']);
  //}

  // Make local references to created fields
  for (let i = 0; i < sortedFields.length; i++) {
    const sortedField = sortedFields[i];
    transpiler.pushStatement([
      'ac::field',
      ' ',
      ensure(sortedField.symbolLocalValue),
      ' = ',
      '(ac::field)&(fields[',
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
