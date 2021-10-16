import { AstModule } from "../../data/ast/AstModule.ts";
import { makeRecursorPassSimplified } from "../util/makeRecursorPassSimplified.ts";
import { browseExpressionFunction } from "./browse/browseExpressionFunction.ts";
import { browseStatementImport } from "./browse/browseStatementImport.ts";
import { browseStatementTypedef } from "./browse/browseStatementTypedef.ts";
import { browseTypeIdentifier } from "./browse/browseTypeIdentifier.ts";
import { Scope } from "./util/Scope.ts";

const pass = makeRecursorPassSimplified<Scope>((scope) => {
  return new Scope(scope);
}, {
  recurseExpressionFunction: browseExpressionFunction,
  recurseStatementImport: browseStatementImport,
  recurseStatementTypedef: browseStatementTypedef,
  recurseTypeIdentifier: browseTypeIdentifier,
});

export async function passShorthandResolve(ast: AstModule) {
  await pass.recurseModule(new Scope(), ast);
}
