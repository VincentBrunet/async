import { AstModule } from "../../data/ast/AstModule.ts";
import { makeRecursorPass } from "../util/makeRecursorPass.ts";
import { browseModule } from "./browse/browseModule.ts";
import { browseStatementTypedef } from "./browse/browseStatementTypedef.ts";
import { browseTypeIdentifier } from "./browse/browseTypeIdentifier.ts";
import { BrowsedScope } from "./util/BrowsedScope.ts";

const recursor = makeRecursorPass((scope) => {
  return new BrowsedScope(scope);
}, {
  recurseModule: browseModule,
  recurseStatementTypedef: browseStatementTypedef,
  recurseTypeIdentifier: browseTypeIdentifier,
});

export function applyAstShorthandResolve(astModule: AstModule) {
  recursor.recurseModule(recursor, new BrowsedScope(), astModule);
}
