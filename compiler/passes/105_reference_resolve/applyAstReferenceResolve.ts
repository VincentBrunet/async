import { AstModule } from "../../data/ast/AstModule.ts";
import { makeRecursor } from "../util/makeRecursor.ts";
import { browseExpressionFunction } from "./browse/browseExpressionFunction.ts";
import { browseExpressionIdentifier } from "./browse/browseExpressionIdentifier.ts";
import { browseExpressionObject } from "./browse/browseExpressionObject.ts";
import { browseExpressionRun } from "./browse/browseExpressionRun.ts";
import { browseModule } from "./browse/browseModule.ts";
import { browseStatementVariable } from "./browse/browseStatementVariable.ts";
import { BrowsedScope } from "./util/BrowsedScope.ts";

const recursor = makeRecursor<BrowsedScope>({
  recurseModule: browseModule,
  recurseStatementVariable: browseStatementVariable,
  recurseExpressionFunction: browseExpressionFunction,
  recurseExpressionObject: browseExpressionObject,
  recurseExpressionRun: browseExpressionRun,
  recurseExpressionIdentifier: browseExpressionIdentifier,
});

export function applyAstReferenceResolve(astModule: AstModule) {
  recursor.recurseModule(recursor, new BrowsedScope(), astModule);
}
