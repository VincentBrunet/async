import { AstCall } from "../../../data/ast/AstCall.ts";
import {
  AstExpression,
  AstExpressionType,
} from "../../../data/ast/AstExpression.ts";
import { AstFunction } from "../../../data/ast/AstFunction.ts";
import { AstIdentifier } from "../../../data/ast/AstIdentifier.ts";
import { AstLiteral } from "../../../data/ast/AstLiteral.ts";
import { AstObject } from "../../../data/ast/AstObject.ts";
import { AstOperation } from "../../../data/ast/AstOperation.ts";
import { ResolveScope } from "../util/ResolveScope.ts";
import { computeCall } from "./computeCall.ts";
import { computeFunction } from "./computeFunction.ts";
import { computeIdentifier } from "./computeIdentifier.ts";
import { computeObject } from "./computeObject.ts";

export function computeExpression(
  scope: ResolveScope,
  astExpression: AstExpression,
) {
  switch (astExpression.type) {
    case AstExpressionType.Identifier: {
      const astData = astExpression.data as AstIdentifier;
      computeIdentifier(scope, astData);
      break;
    }
    case AstExpressionType.Literal: {
      const astData = astExpression.data as AstLiteral;
      //computeLiteral(scope, astData);
      break;
    }
    case AstExpressionType.Function: {
      const astData = astExpression.data as AstFunction;
      computeFunction(scope, astData);
      break;
    }
    case AstExpressionType.Call: {
      const astData = astExpression.data as AstCall;
      computeCall(scope, astData);
      break;
    }
    case AstExpressionType.Object: {
      const astData = astExpression.data as AstObject;
      computeObject(scope, astData);
      break;
    }
    case AstExpressionType.Operation: {
      const astData = astExpression.data as AstOperation;
      computeExpression(scope, astData.left);
      computeExpression(scope, astData.right);
      break;
    }
  }
}
