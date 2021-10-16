import {
  AstExpressionObject,
  AstExpressionObjectField,
} from "../../../data/ast/AstExpressionObject.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { hashAstKey } from "../../../lib/hash/hashAstKey.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";
import { transpileResolvedClosure } from "./transpileResolvedClosure.ts";

export function transpileExpressionObject(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstExpressionObject,
) {
  // Assert
  const resolvedClosures = ensure(ast.resolvedClosures);

  // Generate a stable unique name
  const name = hashAstKey(transpiler.getOutput().sourceAst, ast, "object");

  // Simply call the object factory in the expression
  const callLength = resolvedClosures.length.toString();
  const callVariadic = resolvedClosures.length > 9;
  transpiler.pushPart("object_call_");
  if (callVariadic) {
    transpiler.pushPart("x");
  } else {
    transpiler.pushPart(callLength);
  }
  transpiler.pushPart("(");
  transpiler.pushPart("&");
  transpiler.pushPart(name);
  if (callVariadic) {
    transpiler.pushPart(", ");
    transpiler.pushPart(resolvedClosures.length.toString());
  }
  for (const astClosure of resolvedClosures) {
    transpiler.pushPart(", ");
    transpileResolvedClosure(pass, transpiler, astClosure);
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
  transpiler.pushStatement([]);
  transpiler.pushPart("t_value *object = object_make_x(");
  transpiler.pushPart("type_object"); // TODO
  transpiler.pushPart(", ");
  transpiler.pushPart(sortedFields.length.toString());
  for (const field of sortedFields) {
    transpiler.pushPart(", ");
    transpiler.pushPart(field.hash);
  }
  transpiler.pushPart(")");

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
    transpiler.pushStatement([]);
    transpiler.pushPart("__");
    transpiler.pushPart(unsortedField.name);
    transpiler.pushPart("->value");
    transpiler.pushPart(" = ");
    await pass.recurseExpression(transpiler, unsortedField.expression);
    transpiler.pushPart("");
  }

  // We simply return the object
  transpiler.pushStatement(["return", " ", "object"]);

  // Done, push the newly created function
  transpiler.popFunction();
}
