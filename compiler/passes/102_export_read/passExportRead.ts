import { AstModule } from "../../data/ast/AstModule.ts";
import { makeRecursorPassSimplified } from "../util/makeRecursorPassSimplified.ts";
import { browseStatementExport } from "./browse/browseStatementExport.ts";
import { browseStatementImport } from "./browse/browseStatementImport.ts";

const pass = makeRecursorPassSimplified((no) => no, {
  recurseStatementExport: browseStatementExport,
  recurseStatementImport: browseStatementImport,
});

export async function passExportRead(ast: AstModule) {
  await pass.recurseModule(ast, ast);
}
