import { AstModule } from "../../data/ast/AstModule.ts";
import { makeRecursorPassSimplified } from "../util/makeRecursorPassSimplified.ts";
import { browseStatementImport } from "./browse/browseStatementImport.ts";

const pass = makeRecursorPassSimplified((no) => no, {
  recurseStatementImport: browseStatementImport,
});

export function passImportLink(ast: AstModule) {
  pass.recurseModule(ast, ast);
}
