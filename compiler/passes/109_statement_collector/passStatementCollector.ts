import { AstModule } from "../../data/ast/AstModule.ts";
import { makeRecursorPass } from "../util/makeRecursorPass.ts";
import { browseExpressionFunction } from "./browse/browseExpressionFunction.ts";
import { browseExpressionRun } from "./browse/browseExpressionRun.ts";
import { browseModule } from "./browse/browseModule.ts";
import { browseStatementExport } from "./browse/browseStatementExport.ts";
import { browseStatementImport } from "./browse/browseStatementImport.ts";
import { browseStatementReturn } from "./browse/browseStatementReturn.ts";
import { browseStatementVariable } from "./browse/browseStatementVariable.ts";
import { BrowsedScope } from "./util/BrowsedScope.ts";

const pass = makeRecursorPass<BrowsedScope>((scope) => {
  return new BrowsedScope(scope);
}, {
  recurseExpressionFunction: browseExpressionFunction,
  recurseExpressionRun: browseExpressionRun,
  recurseStatementImport: browseStatementImport,
  recurseStatementExport: browseStatementExport,
  recurseStatementReturn: browseStatementReturn,
  recurseStatementVariable: browseStatementVariable,
  recurseModule: browseModule,
});

export async function passStatementCollector(ast: AstModule) {
  await pass.recurseModule(new BrowsedScope(), ast);
}
