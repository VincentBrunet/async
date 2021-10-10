import { AstModule } from "../../data/ast/AstModule.ts";
import { makeRecursorPassSimplified } from "../util/makeRecursorPassSimplified.ts";
import { browseExpressionFunction } from "./browse/browseExpressionFunction.ts";
import { browseExpressionIdentifier } from "./browse/browseExpressionIdentifier.ts";
import { browseExpressionObject } from "./browse/browseExpressionObject.ts";
import { browseExpressionRun } from "./browse/browseExpressionRun.ts";
import { browseStatementImport } from "./browse/browseStatementImport.ts";
import { browseStatementVariable } from "./browse/browseStatementVariable.ts";
import { BrowsedScope } from "./util/BrowsedScope.ts";

const pass = makeRecursorPassSimplified<BrowsedScope>((scope) => {
  return new BrowsedScope(scope);
}, {
  recurseStatementImport: browseStatementImport,
  recurseStatementVariable: browseStatementVariable,
  recurseExpressionFunction: browseExpressionFunction,
  recurseExpressionObject: browseExpressionObject,
  recurseExpressionRun: browseExpressionRun,
  recurseExpressionIdentifier: browseExpressionIdentifier,
});

export async function passReferenceResolve(ast: AstModule) {
  await pass.recurseModule(new BrowsedScope(), ast);
}
