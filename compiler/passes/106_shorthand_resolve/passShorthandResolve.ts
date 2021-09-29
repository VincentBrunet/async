import { AstModule } from "../../data/ast/AstModule.ts";
import { makeRecursorPass } from "../util/makeRecursorPass.ts";
import { browseExpressionFunction } from "./browse/browseExpressionFunction.ts";
import { browseStatementTypedef } from "./browse/browseStatementTypedef.ts";
import { browseTypeIdentifier } from "./browse/browseTypeIdentifier.ts";
import { BrowsedScope } from "./util/BrowsedScope.ts";

const pass = makeRecursorPass<BrowsedScope>((scope) => {
  return new BrowsedScope(scope);
}, {
  recurseExpressionFunction: browseExpressionFunction,
  recurseStatementTypedef: browseStatementTypedef,
  recurseTypeIdentifier: browseTypeIdentifier,
});

export async function passShorthandResolve(ast: AstModule) {
  await pass.recurseModule(new BrowsedScope(), ast);
}
