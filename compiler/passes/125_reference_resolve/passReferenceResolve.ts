import { AstModule } from "../../data/ast/AstModule.ts";
import { UnitModule } from "../../data/unit/UnitModule.ts";
import { makeRecursorPassSimplified } from "../util/makeRecursorPassSimplified.ts";
import { browseExpressionFunction } from "./browse/browseExpressionFunction.ts";
import { browseExpressionIdentifier } from "./browse/browseExpressionIdentifier.ts";
import { browseExpressionObject } from "./browse/browseExpressionObject.ts";
import { browseExpressionRun } from "./browse/browseExpressionRun.ts";
import { browseStatementImport } from "./browse/browseStatementImport.ts";
import { browseStatementVariable } from "./browse/browseStatementVariable.ts";
import { Scope } from "./util/Scope.ts";

const pass = makeRecursorPassSimplified<Scope>((scope) => {
  return new Scope(scope);
}, {
  recurseStatementImport: browseStatementImport,
  recurseStatementVariable: browseStatementVariable,
  recurseExpressionFunction: browseExpressionFunction,
  recurseExpressionObject: browseExpressionObject,
  recurseExpressionRun: browseExpressionRun,
  recurseExpressionIdentifier: browseExpressionIdentifier,
});

export function passReferenceResolve(unit: UnitModule) {
  pass.recurseModule(new Scope(), unit.ast);
}
