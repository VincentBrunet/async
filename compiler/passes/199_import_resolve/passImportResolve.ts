import { AstModule } from "../../data/ast/AstModule.ts";
import { makeRecursorPass } from "../util/makeRecursorPass.ts";
import { browseStatementImport } from "./browse/browseStatementImport.ts";

const pass = makeRecursorPass((scope) => {
  return scope;
}, {
  recurseStatementImport: browseStatementImport,
});

export async function passImportResolve(ast: AstModule) {
  await pass.recurseModule(null, ast);
}
