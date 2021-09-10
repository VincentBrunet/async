import { AstBinary } from "../../../data/ast/AstBinary.ts";
import { AstCall } from "../../../data/ast/AstCall.ts";
import { AstDo } from "../../../data/ast/AstDo.ts";
import {
  AstExpression,
  AstExpressionKind,
} from "../../../data/ast/AstExpression.ts";
import { AstFunction } from "../../../data/ast/AstFunction.ts";
import { AstIdentifier } from "../../../data/ast/AstIdentifier.ts";
import { AstLiteral } from "../../../data/ast/AstLiteral.ts";
import { AstLookup } from "../../../data/ast/AstLookup.ts";
import { AstObject } from "../../../data/ast/AstObject.ts";
import { AstUnary } from "../../../data/ast/AstUnary.ts";
import { ResolveScope } from "../util/ResolveScope.ts";
import { computeBinary } from "./computeBinary.ts";
import { computeCall } from "./computeCall.ts";
import { computeDo } from "./computeDo.ts";
import { computeFunction } from "./computeFunction.ts";
import { computeIdentifier } from "./computeIdentifier.ts";
import { computeLiteral } from "./computeLiteral.ts";
import { computeLookup } from "./computeLookup.ts";
import { computeObject } from "./computeObject.ts";
import { computeUnary } from "./computeUnary.ts";

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
      const astData = astExpression.data as AstLiteral;
      computeLiteral(scope, astData);
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
    case AstExpressionKind.Do: {
      const astData = astExpression.data as AstDo;
      computeDo(scope, astData);
      break;
    }
    case AstExpressionKind.Unary: {
      const astData = astExpression.data as AstUnary;
      computeUnary(scope, astData);
      break;
    }
    case AstExpressionKind.Binary: {
      const astData = astExpression.data as AstBinary;
      computeBinary(scope, astData);
      break;
    }
  }
}
