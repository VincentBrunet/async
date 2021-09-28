import {
  AstExpressionObject,
  AstExpressionObjectField,
} from "../../../data/ast/AstExpressionObject.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeExpression } from "./writeExpression.ts";
import { writeResolvedClosure } from "./writeResolvedClosure.ts";

let _id = 0;

export function writeExpressionObject(
  module: OutputModule,
  scope: OutputScope,
  statement: OutputStatement,
  ast: AstExpressionObject,
) {
  const resolvedClosures = ensure(ast.resolvedClosures);

  // TODO - Object name mangling
  const name = "o_0x" + (_id++).toString(16);

  // Simply call the object factory in the expression
  statement.pushPart("object_call_x(");
  statement.pushPart("&");
  statement.pushPart(name);
  statement.pushPart(", ");
  statement.pushPart(resolvedClosures.length.toString());
  for (const astClosure of resolvedClosures) {
    statement.pushPart(", ");
    writeResolvedClosure(statement, astClosure);
  }
  statement.pushPart(")");

  // New scope
  const child = new OutputScope(name);

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

  // Setup params
  child.pushParam("t_ref **closure");

  // Create the module object containing all declared fields
  const object = new OutputStatement();
  object.pushPart("t_value *object = object_make_x(");
  object.pushPart("type_object"); // TODO
  object.pushPart(", ");
  object.pushPart(sortedFields.length.toString());
  for (const field of sortedFields) {
    object.pushPart(", ");
    object.pushPart(field.hash);
  }
  object.pushPart(")");
  child.pushStatement(OutputOrder.Variables, object);

  // Read a variable field pointer
  const shortcut = new OutputStatement();
  shortcut.pushPart(
    "t_variable *fields = object->data.object.fields",
  );
  child.pushStatement(OutputOrder.Variables, shortcut);

  // Make local references to created fields
  for (let i = 0; i < sortedFields.length; i++) {
    const sortedField = sortedFields[i];
    const named = new OutputStatement();
    named.pushPart("t_ref *");
    named.pushPart("__");
    named.pushPart(sortedField.name);
    named.pushPart(" = ");
    named.pushPart("(t_ref *)&(fields[");
    named.pushPart(i.toString());
    named.pushPart("])");
    child.pushStatement(OutputOrder.Variables, named);
  }

  // Do the assignation
  for (const unsortedField of unsortedFields) {
    const assigned = new OutputStatement();
    assigned.pushPart("__");
    assigned.pushPart(unsortedField.name);
    assigned.pushPart("->value");
    assigned.pushPart(" = ");
    writeExpression(module, child, assigned, unsortedField.expression);
    assigned.pushPart("");
    child.pushStatement(OutputOrder.Logic, assigned);
  }

  // We simply return the object
  const done = new OutputStatement();
  done.pushPart("return object");
  child.pushStatement(OutputOrder.After, done);

  // Done, push the newly created function
  module.pushScope(child);
}
