import { AstModule } from "../../data/ast/AstModule.ts";
import { makeRecursorPassSimplified } from "../util/makeRecursorPassSimplified.ts";
import { browseStatementExport } from "./browse/browseStatementExport.ts";

const pass = makeRecursorPassSimplified((no) => no, {
  recurseStatementExport: browseStatementExport,
});

export function passExportRead(ast: AstModule) {
  pass.recurseModule(ast, ast);
}
