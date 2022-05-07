import { Ast } from './Ast.ts';
import { AstExpressionBinary } from './AstExpressionBinary.ts';
import { AstExpressionCall } from './AstExpressionCall.ts';
import { AstExpressionFunction } from './AstExpressionFunction.ts';
import { AstExpressionIdentifier } from './AstExpressionIdentifier.ts';
import { AstExpressionLiteral } from './AstExpressionLiteral.ts';
import { AstExpressionLookup } from './AstExpressionLookup.ts';
import { AstExpressionObject } from './AstExpressionObject.ts';
import { AstExpressionParenthesis } from './AstExpressionParenthesis.ts';
import { AstExpressionRun } from './AstExpressionRun.ts';
import { AstExpressionTyping } from './AstExpressionTyping.ts';
import { AstExpressionUnary } from './AstExpressionUnary.ts';
import { AstType } from './AstType.ts';

export enum AstExpressionKind {
  Call = 'Call',
  Identifier = 'Identifier',
  Literal = 'Literal',
  Function = 'Function',
  Object = 'Object',
  Run = 'Run',
  Lookup = 'Lookup',
  Unary = 'Unary',
  Binary = 'Binary',
  Typing = 'Typing',
  Parenthesis = ' Parenthesis',
}

export type AstExpressionData =
  | AstExpressionCall
  | AstExpressionIdentifier
  | AstExpressionLiteral
  | AstExpressionFunction
  | AstExpressionObject
  | AstExpressionRun
  | AstExpressionLookup
  | AstExpressionUnary
  | AstExpressionBinary
  | AstExpressionTyping
  | AstExpressionParenthesis;

export interface AstExpression extends Ast {
  kind: AstExpressionKind;
  data: AstExpressionData;

  resolvedType?: AstType;
}

export function astExpressionMakeLiteral(expressionLiteral: AstExpressionLiteral): AstExpression {
  return {
    kind: AstExpressionKind.Literal,
    data: expressionLiteral,
    token: expressionLiteral.token,
  };
}

export function astExpressionMakeBinary(expressionBinary: AstExpressionBinary): AstExpression {
  return {
    kind: AstExpressionKind.Binary,
    data: expressionBinary,
    token: expressionBinary.token,
  };
}

function astExpressionRecurseParenthesis(expression: AstExpression): AstExpression {
  if (expression.kind === AstExpressionKind.Parenthesis) {
    return (expression.data as AstExpressionParenthesis).expression;
  } else {
    return expression;
  }
}

export function astExpressionAsExpressionLiteral(expression: AstExpression): AstExpressionLiteral | undefined {
  expression = astExpressionRecurseParenthesis(expression);
  if (expression.kind === AstExpressionKind.Literal) {
    return expression.data as AstExpressionLiteral;
  }
  return undefined;
}

export function astExpressionAsExpressionBinary(expression: AstExpression): AstExpressionBinary | undefined {
  expression = astExpressionRecurseParenthesis(expression);
  if (expression.kind === AstExpressionKind.Binary) {
    return expression.data as AstExpressionBinary;
  }
  return undefined;
}
