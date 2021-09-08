import { AstObject } from "../../../data/ast/AstObject.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeBlock } from "./writeBlock.ts";
import { writeClosure } from "./writeClosure.ts";

let _id = 0;

export function writeObject(
  module: OutputModule,
  statement: OutputStatement,
  astObject: AstObject,
) {
  // Asserts
  if (!astObject.closures) {
    throw new Error("Invalid closure setup");
  }

  // TODO - Object name mangling
  const name = "o_0x" + (_id++).toString(16);

  // Simply call the object factory in the expression
  statement.pushPart("object_call_x(");
  statement.pushPart("&");
  statement.pushPart(name);
  statement.pushPart(", ");
  statement.pushPart(astObject.closures.length.toString());
  for (const astClosure of astObject.closures) {
    statement.pushPart(", ");
    writeClosure(module, statement, astClosure);
  }
  statement.pushPart(")");

  // New scope
  const scope = new OutputScope(name);

  // Do the recursive writing
  if (astObject.block) {
    writeBlock(module, scope, astObject.block);
  }

  // Setup params
  scope.pushParam("t_ref **closure");

  // Read the variables declared in the function
  const variables = scope.readVariables();

  // Create the module object containing all declared variables
  const object = new OutputStatement();
  object.pushPart("t_value *object = object_make_x(");
  object.pushPart("type_object"); // TODO
  object.pushPart(", ");
  object.pushPart(variables.length.toString());
  for (const variable of variables) {
    object.pushPart(",");
    object.pushPart(" /*");
    object.pushPart(variable.getName().toString());
    object.pushPart("*/ ");
    object.pushPart(variable.getHash().toString());
  }
  object.pushPart(")");
  scope.pushStatement(OutputOrder.Variables, object);

  // Read a variable field pointer
  const shortcut = new OutputStatement();
  shortcut.pushPart("t_variable *variables = object->data.object.variables");
  scope.pushStatement(OutputOrder.Variables, shortcut);

  // Make local references to created variables
  for (let i = 0; i < variables.length; i++) {
    const variable = variables[i];
    const named = new OutputStatement();
    named.pushPart("t_ref *");
    named.pushPart("__");
    named.pushPart(variable.getName());
    named.pushPart(" = ");
    named.pushPart("&(variables[");
    named.pushPart(i.toString());
    named.pushPart("])");
    named.pushPart(" ");
    named.pushPart("/*");
    named.pushPart(variable.getHash().toString());
    named.pushPart("*/");
    scope.pushStatement(OutputOrder.Variables, named);
  }

  // We simply return the object
  const done = new OutputStatement();
  done.pushPart("return object");
  scope.pushStatement(OutputOrder.After, done);

  // Done, push the newly created function
  module.pushScope(scope);
}
