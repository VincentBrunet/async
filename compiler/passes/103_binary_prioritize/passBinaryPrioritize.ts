import { AstModule } from "../../data/ast/AstModule.ts";
import { makeRecursorPassSimplified } from "../util/makeRecursorPassSimplified.ts";
import { browseExpressionBinary } from "./browse/browseExpressionBinary.ts";

const pass = makeRecursorPassSimplified((no) => no, {
  recurseExpressionBinary: browseExpressionBinary,
});

export async function passBinaryPrioritize(ast: AstModule) {
  await pass.recurseModule(ast, ast);
}
