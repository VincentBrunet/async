import { AstModule } from "../../data/ast/AstModule.ts";
import { makeRecursorPass } from "../util/makeRecursorPass.ts";
import { browseExpressionFunction } from "./browse/browseExpressionFunction.ts";
import { browseStatementReturn } from "./browse/browseStatementReturn.ts";
import { browseStatementTypedef } from "./browse/browseStatementTypedef.ts";
import { browseStatementVariable } from "./browse/browseStatementVariable.ts";
import { browseTypeIdentifier } from "./browse/browseTypeIdentifier.ts";
import { BrowsedScope } from "./util/BrowsedScope.ts";

const pass = makeRecursorPass<BrowsedScope>((scope) => {
  return new BrowsedScope(scope);
}, {
  recurseExpressionFunction: browseExpressionFunction,
  recurseStatementTypedef: browseStatementTypedef,
  recurseStatementReturn: browseStatementReturn,
  recurseStatementVariable: browseStatementVariable,
  recurseTypeIdentifier: browseTypeIdentifier,
});

export function applyTypeInferenceUpward(astModule: AstModule) {
  pass.recurseModule(new BrowsedScope(), astModule);
}
