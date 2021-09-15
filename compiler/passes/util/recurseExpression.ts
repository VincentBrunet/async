import {
  AstExpression,
  AstExpressionKind,
} from "../../data/ast/expression/AstExpression.ts";
import { AstExpressionBinary } from "../../data/ast/expression/AstExpressionBinary.ts";
import { AstExpressionCall } from "../../data/ast/expression/AstExpressionCall.ts";
import { AstExpressionFunction } from "../../data/ast/expression/AstExpressionFunction.ts";
import { AstExpressionIdentifier } from "../../data/ast/expression/AstExpressionIdentifier.ts";
import { AstExpressionLiteral } from "../../data/ast/expression/AstExpressionLiteral.ts";
import { AstExpressionLookup } from "../../data/ast/expression/AstExpressionLookup.ts";
import { AstExpressionObject } from "../../data/ast/expression/AstExpressionObject.ts";
import { AstExpressionParenthesis } from "../../data/ast/expression/AstExpressionParenthesis.ts";
import { AstExpressionRun } from "../../data/ast/expression/AstExpressionRun.ts";
import { AstExpressionUnary } from "../../data/ast/expression/AstExpressionUnary.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseExpression<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstExpression,
) {
  const kind = ast.kind;
  const data = ast.data;
  switch (kind) {
    case AstExpressionKind.Call: {
      r.recurseExpressionCall(r, p, data as AstExpressionCall);
      break;
    }
    case AstExpressionKind.Identifier: {
      r.recurseExpressionIdentifier(r, p, data as AstExpressionIdentifier);
      break;
    }
    case AstExpressionKind.Literal: {
      r.recurseExpressionLiteral(r, p, data as AstExpressionLiteral);
      break;
    }
    case AstExpressionKind.Function: {
      r.recurseExpressionFunction(r, p, data as AstExpressionFunction);
      break;
    }
    case AstExpressionKind.Object: {
      r.recurseExpressionObject(r, p, data as AstExpressionObject);
      break;
    }
    case AstExpressionKind.Run: {
      r.recurseExpressionRun(r, p, data as AstExpressionRun);
      break;
    }
    case AstExpressionKind.Lookup: {
      r.recurseExpressionLookup(r, p, data as AstExpressionLookup);
      break;
    }
    case AstExpressionKind.Unary: {
      r.recurseExpressionUnary(r, p, data as AstExpressionUnary);
      break;
    }
    case AstExpressionKind.Binary: {
      r.recurseExpressionBinary(r, p, data as AstExpressionBinary);
      break;
    }
    case AstExpressionKind.Parenthesis: {
      r.recurseExpressionParenthesis(r, p, data as AstExpressionParenthesis);
      break;
    }
  }
}
