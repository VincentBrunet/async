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

export function astExpressionMakeBinary(astExpressionBinary: AstExpressionBinary): AstExpression {
  return {
    kind: AstExpressionKind.Binary,
    data: astExpressionBinary,
    token: astExpressionBinary.token,
  };
}

function astExpressionRecurseParenthesis(astExpression: AstExpression): AstExpression {
  if (astExpression.kind === AstExpressionKind.Parenthesis) {
    return (astExpression.data as AstExpressionParenthesis).expression;
  } else {
    return astExpression;
  }
}

export function astExpressionAsLiteral(astExpression: AstExpression): AstExpressionLiteral | undefined {
  astExpression = astExpressionRecurseParenthesis(astExpression);
  if (astExpression.kind === AstExpressionKind.Literal) {
    return astExpression.data as AstExpressionLiteral;
  }
  return undefined;
}

export function astExpressionAsBinary(astExpression: AstExpression): AstExpressionBinary | undefined {
  astExpression = astExpressionRecurseParenthesis(astExpression);
  if (astExpression.kind === AstExpressionKind.Binary) {
    return astExpression.data as AstExpressionBinary;
  }
  return undefined;
}
