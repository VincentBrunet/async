import { AstCall } from "../../../data/ast/AstCall.ts";
import {
  AstExpression,
  AstExpressionKind,
} from "../../../data/ast/AstExpression.ts";
import { AstFunction } from "../../../data/ast/AstFunction.ts";
import { AstIdentifier } from "../../../data/ast/AstIdentifier.ts";
import { AstLookup } from "../../../data/ast/AstLookup.ts";
import { AstObject } from "../../../data/ast/AstObject.ts";
import { AstOperation } from "../../../data/ast/AstOperation.ts";
import { ResolveScope } from "../util/ResolveScope.ts";
import { computeCall } from "./computeCall.ts";
import { computeFunction } from "./computeFunction.ts";
import { computeIdentifier } from "./computeIdentifier.ts";
import { computeLookup } from "./computeLookup.ts";
import { computeObject } from "./computeObject.ts";

export function computeExpression(
  scope: ResolveScope,
  astExpression: AstExpression,
) {
  switch (astExpression.kind) {
    case AstExpressionKind.Identifier: {
      const astData = astExpression.data as AstIdentifier;
      computeIdentifier(scope, astData);
      break;
    }
    case AstExpressionKind.Literal: {
      break;
    }
    case AstExpressionKind.Function: {
      const astData = astExpression.data as AstFunction;
      computeFunction(scope, astData);
      break;
    }
    case AstExpressionKind.Lookup: {
      const astData = astExpression.data as AstLookup;
      computeLookup(scope, astData);
      break;
    }
    case AstExpressionKind.Call: {
      const astData = astExpression.data as AstCall;
      computeCall(scope, astData);
      break;
    }
    case AstExpressionKind.Object: {
      const astData = astExpression.data as AstObject;
      computeObject(scope, astData);
      break;
    }
    case AstExpressionKind.Operation: {
      const astData = astExpression.data as AstOperation;
      computeExpression(scope, astData.left);
      computeExpression(scope, astData.right);
      break;
    }
  }
}
