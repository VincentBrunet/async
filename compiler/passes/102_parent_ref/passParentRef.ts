import { AstModule } from "../../data/ast/AstModule.ts";
import { makeRecursorPassSimplified } from "../util/makeRecursorPassSimplified.ts";
import { browseStatementImport } from "./browse/browseStatementImport.ts";

const pass = makeRecursorPassSimplified((no) => no, {
  recurseStatementImport: browseStatementImport,
});

export async function passParentRef(ast: AstModule) {
  await pass.recurseModule(ast, ast);
}
