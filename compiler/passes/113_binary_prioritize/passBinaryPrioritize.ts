import { AstModule } from "../../data/ast/AstModule.ts";
import { makeRecursorPassSimplified } from "../util/makeRecursorPassSimplified.ts";
import { browseExpressionBinary } from "./browse/browseExpressionBinary.ts";

const pass = makeRecursorPassSimplified((no) => no, {
  recurseExpressionBinary: browseExpressionBinary,
});

export function passBinaryPrioritize(ast: AstModule) {
  pass.recurseModule(ast, ast);
}
