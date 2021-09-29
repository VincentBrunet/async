import { AstModule } from "../../data/ast/AstModule.ts";
import { makeRecursorPass } from "../util/makeRecursorPass.ts";
import { browseExpressionBinary } from "./browse/browseExpressionBinary.ts";

const pass = makeRecursorPass<undefined>((param) => {
  return param;
}, {
  recurseExpressionBinary: browseExpressionBinary,
});

export async function passBinaryPrioritize(ast: AstModule) {
  pass.recurseModule(undefined, ast);
  return ast;
}
