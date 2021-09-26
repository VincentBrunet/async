import { AstExpressionObject } from "../../../data/ast/AstExpressionObject.ts";
import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeBlock } from "./writeBlock.ts";
import { writeResolvedClosure } from "./writeResolvedClosure.ts";

let _id = 0;

export function writeExpressionObject(
  module: OutputModule,
  scope: OutputScope,
  statement: OutputStatement,
  ast: AstExpressionObject,
) {
  // Asserts
  if (!ast.resolvedClosures) {
    throw new Error("Unresolved Closures");
  }
  if (!ast.resolvedVariables) {
    throw new Error("Unresolved Variables");
  }

  // TODO - Object name mangling
  const name = "o_0x" + (_id++).toString(16);

  // Simply call the object factory in the expression
  statement.pushPart("object_call_x(");
  statement.pushPart("&");
  statement.pushPart(name);
  statement.pushPart(", ");
  statement.pushPart(ast.resolvedClosures.length.toString());
  for (const astClosure of ast.resolvedClosures) {
    statement.pushPart(", ");
    writeResolvedClosure(statement, astClosure);
  }
  statement.pushPart(")");

  // New scope
  const child = new OutputScope(name);

  // Do the recursive writing
  writeBlock(module, child, ast.block);

  // Setup params
  child.pushParam("t_ref **closure");

  // Read the variables declared in the function
  const variables = ast.resolvedVariables;
  variables.sort((a: AstStatementVariable, b: AstStatementVariable) => {
    if (a.hash < b.hash) {
      return -1;
    } else if (a.hash > b.hash) {
      return 1;
    } else {
      return 0;
    }
  });

  // Create the module object containing all declared variables
  const object = new OutputStatement();
  object.pushPart("t_value *object = object_make_x(");
  object.pushPart("type_object"); // TODO
  object.pushPart(", ");
  object.pushPart(variables.length.toString());
  for (const variable of variables) {
    object.pushPart(", ");
    object.pushPart(variable.hash);
  }
  object.pushPart(")");
  child.pushStatement(OutputOrder.Variables, object);

  // Read a variable field pointer
  const shortcut = new OutputStatement();
  shortcut.pushPart("t_variable *variables = object->data.object.variables");
  child.pushStatement(OutputOrder.Variables, shortcut);

  // Make local references to created variables
  for (let i = 0; i < variables.length; i++) {
    const variable = variables[i];
    const named = new OutputStatement();
    named.pushPart("t_ref *");
    named.pushPart("__");
    named.pushPart(variable.name);
    named.pushPart(" = ");
    named.pushPart("&(variables[");
    named.pushPart(i.toString());
    named.pushPart("])");
    child.pushStatement(OutputOrder.Variables, named);
  }

  // We simply return the object
  const done = new OutputStatement();
  done.pushPart("return object");
  child.pushStatement(OutputOrder.After, done);

  // Done, push the newly created function
  module.pushScope(child);
}
