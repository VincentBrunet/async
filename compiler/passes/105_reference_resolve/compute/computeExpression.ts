import { AstExpression } from "../../../data/ast/AstExpression.ts";
import { browseExpression } from "../../../data/ast/util/browseExpression.ts";
import { ResolveScope } from "../util/ResolveScope.ts";
import { computeBinary } from "./computeBinary.ts";
import { computeCall } from "./computeCall.ts";
import { computeFunction } from "./computeFunction.ts";
import { computeIdentifier } from "./computeIdentifier.ts";
import { computeLiteral } from "./computeLiteral.ts";
import { computeLookup } from "./computeLookup.ts";
import { computeObject } from "./computeObject.ts";
import { computeRun } from "./computeRun.ts";
import { computeUnary } from "./computeUnary.ts";

const browser = {
  browseCall: computeCall,
  browseIdentifier: computeIdentifier,
  browseLiteral: computeLiteral,
  browseFunction: computeFunction,
  browseObject: computeObject,
  browseRun: computeRun,
  browseLookup: computeLookup,
  browseUnary: computeUnary,
  browseBinary: computeBinary,
};

export function computeExpression(
  scope: ResolveScope,
  astExpression: AstExpression,
) {
  browseExpression(astExpression, scope, browser);
}
