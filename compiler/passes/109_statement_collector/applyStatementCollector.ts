import { AstModule } from "../../data/ast/AstModule.ts";
import { makeRecursorPass } from "../util/makeRecursorPass.ts";
import { browseExpressionFunction } from "./browse/browseExpressionFunction.ts";
import { browseExpressionRun } from "./browse/browseExpressionRun.ts";
import { browseModule } from "./browse/browseModule.ts";
import { browseStatementReturn } from "./browse/browseStatementReturn.ts";
import { BrowsedScope } from "./util/BrowsedScope.ts";

const pass = makeRecursorPass<BrowsedScope>((scope) => {
  return new BrowsedScope(scope);
}, {
  recurseExpressionFunction: browseExpressionFunction,
  recurseExpressionRun: browseExpressionRun,
  recurseStatementReturn: browseStatementReturn,
  recurseModule: browseModule,
});

export function applyStatementCollector(astModule: AstModule) {
  pass.recurseModule(new BrowsedScope(), astModule);
}
