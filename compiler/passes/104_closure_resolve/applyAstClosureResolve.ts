import { AstModule } from "../../data/ast/AstModule.ts";
import { makeRecursor } from "../util/makeRecursor.ts";
import { browseExpressionFunction } from "./browse/browseExpressionFunction.ts";
import { browseExpressionIdentifier } from "./browse/browseExpressionIdentifier.ts";
import { browseExpressionObject } from "./browse/browseExpressionObject.ts";
import { browseExpressionRun } from "./browse/browseExpressionRun.ts";
import { browseModule } from "./browse/browseModule.ts";
import { browseVariable } from "./browse/browseVariable.ts";
import { BrowsedScope } from "./util/BrowsedScope.ts";

const recursor = makeRecursor<BrowsedScope>({
  recurseModule: browseModule,
  recurseVariable: browseVariable,
  recurseExpressionFunction: browseExpressionFunction,
  recurseExpressionObject: browseExpressionObject,
  recurseExpressionRun: browseExpressionRun,
  recurseExpressionIdentifier: browseExpressionIdentifier,
});

export function applyAstClosureResolve(astModule: AstModule) {
  recursor.recurseModule(recursor, new BrowsedScope(), astModule);
}
