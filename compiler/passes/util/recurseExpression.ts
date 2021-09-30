import {
  AstExpression,
  AstExpressionKind,
} from "../../data/ast/AstExpression.ts";
import { AstExpressionBinary } from "../../data/ast/AstExpressionBinary.ts";
import { AstExpressionCall } from "../../data/ast/AstExpressionCall.ts";
import { AstExpressionFunction } from "../../data/ast/AstExpressionFunction.ts";
import { AstExpressionIdentifier } from "../../data/ast/AstExpressionIdentifier.ts";
import { AstExpressionLiteral } from "../../data/ast/AstExpressionLiteral.ts";
import { AstExpressionLookup } from "../../data/ast/AstExpressionLookup.ts";
import { AstExpressionObject } from "../../data/ast/AstExpressionObject.ts";
import { AstExpressionParenthesis } from "../../data/ast/AstExpressionParenthesis.ts";
import { AstExpressionRun } from "../../data/ast/AstExpressionRun.ts";
import { AstExpressionTyping } from "../../data/ast/AstExpressionTyping.ts";
import { AstExpressionUnary } from "../../data/ast/AstExpressionUnary.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseExpression<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstExpression,
) {
  const kind = ast.kind;
  const data = ast.data;
  switch (kind) {
    case AstExpressionKind.Call: {
      await r.recurseExpressionCall(p, data as AstExpressionCall);
      break;
    }
    case AstExpressionKind.Identifier: {
      await r.recurseExpressionIdentifier(p, data as AstExpressionIdentifier);
      break;
    }
    case AstExpressionKind.Literal: {
      await r.recurseExpressionLiteral(p, data as AstExpressionLiteral);
      break;
    }
    case AstExpressionKind.Function: {
      await r.recurseExpressionFunction(p, data as AstExpressionFunction);
      break;
    }
    case AstExpressionKind.Object: {
      await r.recurseExpressionObject(p, data as AstExpressionObject);
      break;
    }
    case AstExpressionKind.Run: {
      await r.recurseExpressionRun(p, data as AstExpressionRun);
      break;
    }
    case AstExpressionKind.Lookup: {
      await r.recurseExpressionLookup(p, data as AstExpressionLookup);
      break;
    }
    case AstExpressionKind.Unary: {
      await r.recurseExpressionUnary(p, data as AstExpressionUnary);
      break;
    }
    case AstExpressionKind.Binary: {
      await r.recurseExpressionBinary(p, data as AstExpressionBinary);
      break;
    }
    case AstExpressionKind.Typing: {
      await r.recurseExpressionTyping(p, data as AstExpressionTyping);
      break;
    }
    case AstExpressionKind.Parenthesis: {
      await r.recurseExpressionParenthesis(p, data as AstExpressionParenthesis);
      break;
    }
  }
}
