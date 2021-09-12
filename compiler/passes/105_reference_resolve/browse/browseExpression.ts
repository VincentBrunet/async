import { AstExpression } from "../../../data/ast/AstExpression.ts";
import { doBrowseExpression } from "../../../data/ast/util/doBrowseExpression.ts";
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

const browser = {
  browseCall: browseCall,
  browseIdentifier: browseIdentifier,
  browseLiteral: browseLiteral,
  browseFunction: browseFunction,
  browseObject: browseObject,
  browseRun: browseRun,
  browseLookup: browseLookup,
  browseUnary: browseUnary,
  browseBinary: browseBinary,
  browseParenthesis: browseParenthesis,
};

export function browseExpression(
  scope: BrowsedScope,
  astExpression: AstExpression,
) {
  doBrowseExpression(astExpression, scope, browser);
}
