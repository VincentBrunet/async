import {
  AstExpressionObject,
  AstExpressionObjectField,
} from "../../../data/ast/AstExpressionObject.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { hashAstKey } from "../../../lib/hash/hashAstKey.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";
import { transpileResolvedClosure } from "./transpileResolvedClosure.ts";

export async function transpileExpressionObject(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstExpressionObject,
) {
  // Assert
  const resolvedClosures = ensure(ast.resolvedClosures);

  // Generate a stable unique name
  const name = hashAstKey(transpiler.getOutput().sourceAst, ast, "object");

  // Simply call the object factory in the expression
  const objectCallLength = resolvedClosures.length.toString();
  const objectCallVariadic = resolvedClosures.length > 9;
  transpiler.pushPart("object_call_");
  if (objectCallVariadic) {
    transpiler.pushPart("x");
  } else {
    transpiler.pushPart(objectCallLength);
  }
  transpiler.pushPart("(");
  transpiler.pushPart("&");
  transpiler.pushPart(name);
  if (objectCallVariadic) {
    transpiler.pushPart(", ");
    transpiler.pushPart(objectCallLength);
  }
  for (const astClosure of resolvedClosures) {
    transpiler.pushPart(", ");
    transpileResolvedClosure(transpiler, astClosure);
  }
  transpiler.pushPart(")");

  // New scope
  transpiler.pushFunction("t_value *", name, [
    "t_ref **closure",
  ]);

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
  const objectMakeLength = sortedFields.length.toString();
  const objectMakeVariadic = sortedFields.length > 9;
  const objectMakeParts = [];
  objectMakeParts.push("t_value *object = object_make_");
  if (objectMakeVariadic) {
    objectMakeParts.push("x");
  } else {
    objectMakeParts.push(objectMakeLength);
  }
  objectMakeParts.push("(");
  objectMakeParts.push("type_object"); // TODO
  if (objectMakeVariadic) {
    objectMakeParts.push(", ");
    objectMakeParts.push(objectMakeLength);
  }
  for (const field of sortedFields) {
    objectMakeParts.push(", ");
    objectMakeParts.push(field.hash);
  }
  objectMakeParts.push(")");
  transpiler.pushStatement(objectMakeParts);

  // Read a variable field pointer
  transpiler.pushStatement([
    "t_field *fields = object->data.object.fields",
  ]);

  // Make local references to created fields
  for (let i = 0; i < sortedFields.length; i++) {
    const sortedField = sortedFields[i];
    transpiler.pushStatement([
      "t_ref *",
      "__",
      sortedField.name,
      " = ",
      "(t_ref *)&(fields[",
      i.toString(),
      "])",
    ]);
  }

  // Do the assignation
  for (const unsortedField of unsortedFields) {
    transpiler.pushStatement([
      "__",
      unsortedField.name,
      "->value",
      " = ",
    ]);
    await pass.recurseExpression(transpiler, unsortedField.expression);
  }

  // We simply return the object
  transpiler.pushStatement(["return", " ", "object"]);

  // Done, push the newly created function
  transpiler.popFunction();
}
