import { AstExpression } from "../../../data/ast/expression/AstExpression.ts";
import { switchOnExpression } from "../../../data/ast/util/switchOnExpression.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseBinary } from "./browseBinary.ts";
import { browseCall } from "./browseCall.ts";
import { browseFunction } from "./browseFunction.ts";
import { browseIdentifier } from "./browseIdentifier.ts";
import { browseLiteral } from "./browseLiteral.ts";
import { browseLookup } from "./browseLookup.ts";
import { browseObject } from "./browseObject.ts";
import { browseParenthesis } from "./browseParenthesis.ts";
import { browseRun } from "./browseRun.ts";
import { browseUnary } from "./browseUnary.ts";

const mapping = {
  caseCall: browseCall,
  caseIdentifier: browseIdentifier,
  caseLiteral: browseLiteral,
  caseFunction: browseFunction,
  caseObject: browseObject,
  caseRun: browseRun,
  caseLookup: browseLookup,
  caseUnary: browseUnary,
  caseBinary: browseBinary,
  caseParenthesis: browseParenthesis,
};

export function browseExpression(
  scope: BrowsedScope,
  astExpression: AstExpression,
) {
  switchOnExpression(astExpression, scope, mapping);
}
