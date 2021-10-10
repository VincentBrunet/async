import { AstModule } from "../../data/ast/AstModule.ts";
import { makeRecursorPassSimplified } from "../util/makeRecursorPassSimplified.ts";
import { browseExpressionBinary } from "./browse/browseExpressionBinary.ts";

const pass = makeRecursorPassSimplified<undefined>((param) => {
  return param;
}, {
  recurseExpressionBinary: browseExpressionBinary,
});

export async function passBinaryPrioritize(ast: AstModule) {
  await pass.recurseModule(undefined, ast);
}
