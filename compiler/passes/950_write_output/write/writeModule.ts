import { AstModule } from "../../../data/ast/AstModule.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeStatement } from "./writeStatement.ts";

export function writeModule(module: OutputModule, astModule: AstModule) {
  // New Scope
  const scope = new OutputScope("module_load");

  // Recurse in module content
  for (const astStatement of astModule.statements) {
    writeStatement(module, scope, astStatement);
  }

  // Read the variables declared in the function
  const variables = scope.readVariables();

  // Create the module object containing all declared variables
  const object = new OutputStatement();
  object.pushPart("t_value *module = object_make_x(");
  object.pushPart("type_object"); // TODO
  object.pushPart(", ");
  object.pushPart(variables.length.toString());
  for (const variable of variables) {
    object.pushPart(", ");
    object.pushPart(variable.hash);
  }
  object.pushPart(")");
  scope.pushStatement(OutputOrder.Variables, object);

  // Read a variable field pointer
  const shortcut = new OutputStatement();
  shortcut.pushPart("t_variable *variables = module->data.object.variables");
  scope.pushStatement(OutputOrder.Variables, shortcut);

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
    scope.pushStatement(OutputOrder.Variables, named);
  }

  // We simply return the object
  var done = new OutputStatement();
  done.pushPart("return module");
  scope.pushStatement(OutputOrder.After, done);

  // Done
  module.pushScope(scope);
}
