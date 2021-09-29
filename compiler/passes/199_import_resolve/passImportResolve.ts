import { AstModule } from "../../data/ast/AstModule.ts";
import { makeRecursorPass } from "../util/makeRecursorPass.ts";
import { browseExpressionImport } from "./browse/browseExpressionImport.ts";

const pass = makeRecursorPass((scope) => {
  return scope;
}, {
  recurseExpressionImport: browseExpressionImport,
});

export async function passImportResolve(ast: AstModule) {
  pass.recurseModule(null, ast);
}
