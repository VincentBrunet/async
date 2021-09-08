import { AstModule } from "../../../data/ast/AstModule.ts";
import { OutputFunc } from "../util/OutputFunc.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { OutputVariable } from "../util/OutputVariable.ts";
import { writeStatement } from "./writeStatement.ts";

export function writeModule(module: OutputModule, astModule: AstModule) {
  // Do the recursive writing
  const func = new OutputFunc("module_load");
  for (const astStatement of astModule.statements) {
    writeStatement(module, func, astStatement);
  }

  // Read the variables declared in the function
  const variables = func.readVariables();

  // Create the module object containing all declared variables
  const object = new OutputStatement();
  object.pushPart("t_value *module = object_make_x(");
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
  shortcut.pushPart("t_variable *variables = module->content.object.variables");
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

  // Needed to compile // TODO
  var postReturn = new OutputStatement();
  postReturn.pushPart("return module");
  func.pushStatement(OutputOrder.After, postReturn);

  // Done
  module.pushFunc(func);
}
