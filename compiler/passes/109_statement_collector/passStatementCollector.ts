import { AstModule } from "../../data/ast/AstModule.ts";
import { makeRecursorPassSimplified } from "../util/makeRecursorPassSimplified.ts";
import { browseBlock } from "./browse/browseBlock.ts";
import { browseExpressionFunction } from "./browse/browseExpressionFunction.ts";
import { browseExpressionRun } from "./browse/browseExpressionRun.ts";
import { browseModule } from "./browse/browseModule.ts";
import { browseStatementExport } from "./browse/browseStatementExport.ts";
import { browseStatementImport } from "./browse/browseStatementImport.ts";
import { browseStatementReturn } from "./browse/browseStatementReturn.ts";
import { browseStatementVariable } from "./browse/browseStatementVariable.ts";
import { BrowsedScope } from "./util/BrowsedScope.ts";

const pass = makeRecursorPassSimplified<BrowsedScope>((scope) => {
  return new BrowsedScope(scope);
}, {
  recurseBlock: browseBlock,
  recurseExpressionFunction: browseExpressionFunction,
  recurseExpressionRun: browseExpressionRun,
  recurseModule: browseModule,
  recurseStatementImport: browseStatementImport,
  recurseStatementExport: browseStatementExport,
  recurseStatementReturn: browseStatementReturn,
  recurseStatementVariable: browseStatementVariable,
});

export async function passStatementCollector(ast: AstModule) {
  await pass.recurseModule(new BrowsedScope(), ast);
}
