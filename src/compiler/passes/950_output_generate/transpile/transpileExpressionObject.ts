import { AstExpressionObject, AstExpressionObjectField } from '../../../data/ast/AstExpressionObject.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { hashGlobalSymbol } from '../../../passes/hash/hashGlobalSymbol.ts';
import { hashLocalSymbol } from '../../hash/hashLocalSymbol.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';
import { utilTranspileReferenceValueClosure } from '../util/utilTranspileReferenceValueClosure.ts';
import { utilTranspileType } from '../util/utilTranspileType.ts';

export function transpileExpressionObject(
  pass: RecursorPass,
  ast: AstExpressionObject,
  transpiler: Transpiler,
) {
  // Assert
  const referenceValueClosures = ensure(ast.referenceValueClosures);

  // Generate a stable unique name
  const name = hashGlobalSymbol(
    transpiler.getUnit().ast.hash,
    ast,
    'object',
  );

  // Simply call the object factory in the expression
  const objectCallLength = referenceValueClosures.length.toString();
  const objectCallVariadic = referenceValueClosures.length > 9;
  transpiler.pushStatementPart('object_call_');
  if (objectCallVariadic) {
    transpiler.pushStatementPart('x');
  } else {
    transpiler.pushStatementPart(objectCallLength);
  }
  transpiler.pushStatementPart('(');
  transpiler.pushStatementPart('&');
  transpiler.pushStatementPart(name);
  if (objectCallVariadic) {
    transpiler.pushStatementPart(', ');
    transpiler.pushStatementPart(objectCallLength);
  }
  for (const referenceValueClosure of referenceValueClosures) {
    transpiler.pushStatementPart(', ');
    utilTranspileReferenceValueClosure(referenceValueClosure, transpiler);
  }
  transpiler.pushStatementPart(')');

  // New scope
  const transpiledType = utilTranspileType(ensure(ast.resolvedType), false);
  transpiler.pushFunction(transpiledType, name, [{ type: 't_closure', name: 'closure' }]);

  // Fields
  const unsortedFields = ast.fields;
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
  const fieldLocal = hashLocalSymbol('fields', 'object');

  const objectFieldsParts = [];
  objectFieldsParts.push('static t_u64');
  objectFieldsParts.push(' ');
  objectFieldsParts.push(fieldLocal);
  objectFieldsParts.push('[');
  objectFieldsParts.push(fieldLength);
  objectFieldsParts.push(']');
  objectFieldsParts.push(' = ');
  objectFieldsParts.push('{');
  objectFieldsParts.push(' ');
  objectFieldsParts.push(sortedFields.map((field) => field.hash).join(', '));
  objectFieldsParts.push(' ');
  objectFieldsParts.push('}');
  transpiler.pushStatement(objectFieldsParts);

  const objectMakeParts = [];
  objectMakeParts.push('t_object object = object_make');
  objectMakeParts.push('(');
  objectMakeParts.push('type_object'); // TODO
  objectMakeParts.push(', ');
  objectMakeParts.push(fieldLength);
  objectMakeParts.push(', ');
  objectMakeParts.push(fieldLocal);
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
      '_field_',
      sortedField.name,
      ' = ',
      '(t_field)&(fields[',
      i.toString(),
      '])',
    ]);
  }

  // Do the assignation in the code's order (not the hash order)
  for (const unsortedField of unsortedFields) {
    transpiler.pushStatement([
      '_field_',
      unsortedField.name,
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
