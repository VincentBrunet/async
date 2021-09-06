import { AstModule } from "../../101_ast/data/AstModule.ts";
import { OutputFunc } from "../util/OutputFunc.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { OutputVariable } from "../util/OutputVariable.ts";
import { writeStatement } from "./writeStatement.ts";

export function writeModule(module: OutputModule, astModule: AstModule) {
  // Do the recursion
  const func = new OutputFunc("module_load");
  for (const astStatement of astModule.statements) {
    writeStatement(module, func, astStatement);
  }

  // Read the variables declared in the function
  const variables = func.getVariables();
  variables.sort((a: OutputVariable, b: OutputVariable) => {
    return a.getHash() - b.getHash();
  });

  // Create the module object containing all declared variables
  var moduleInstantiate = new OutputStatement();
  moduleInstantiate.pushPart("t_value *module = value_factory_object(");
  moduleInstantiate.pushPart("type_object"); // TODO
  moduleInstantiate.pushPart(", ");
  moduleInstantiate.pushPart(variables.length.toString());
  for (const variable of variables) {
    moduleInstantiate.pushPart(",");
    moduleInstantiate.pushPart(" /* ");
    moduleInstantiate.pushPart(variable.getName().toString());
    moduleInstantiate.pushPart(" */ ");
    moduleInstantiate.pushPart(variable.getHash().toString());
  }
  moduleInstantiate.pushPart(")");
  func.pushStatement(OutputOrder.Variables, moduleInstantiate);

  // Needed to compile // TODO
  var postReturn = new OutputStatement();
  postReturn.pushPart("return module");
  func.pushStatement(OutputOrder.After, postReturn);

  // Done
  module.pushFunc(func);
}
