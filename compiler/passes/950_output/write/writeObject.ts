import { AstObject } from "../../../data/ast/AstObject.ts";
import { OutputFunc } from "../util/OutputFunc.ts";
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
  if (!astObject.closures) {
    throw new Error("Invalid closure setup");
  }

  // TODO - Object name mangling
  const name = "o_0x" + (_id++).toString(16);

  // Simply call the object factory in the expression
  statement.pushPart("object_call_x(");
  statement.pushPart(name);
  statement.pushPart(", ");
  statement.pushPart(astObject.closures.length.toString());
  for (const astClosure of astObject.closures) {
    statement.pushPart(", ");
    writeClosure(module, statement, astClosure);
  }
  statement.pushPart(")");

  // New function
  const func = new OutputFunc(name);

  // Setup params
  func.pushParam("t_closure *closure");

  // Do the recursive writing
  if (astObject.block) {
    writeBlock(module, func, astObject.block);
  }

  // Read the variables declared in the function
  const variables = func.readVariables();

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
  func.pushStatement(OutputOrder.Variables, object);

  // Read a variable field pointer
  const shortcut = new OutputStatement();
  shortcut.pushPart("t_variable *variables = object->content.object.variables");
  func.pushStatement(OutputOrder.Variables, shortcut);

  // Make local references to created variables
  for (let i = 0; i < variables.length; i++) {
    const variable = variables[i];
    const named = new OutputStatement();
    named.pushPart("t_variable *");
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
    func.pushStatement(OutputOrder.Variables, named);
  }

  // We simply return the object
  const done = new OutputStatement();
  done.pushPart("return object");
  func.pushStatement(OutputOrder.After, done);

  // Done
  module.pushFunc(func);
}
