import { TokenLocation } from './TokenLocation.ts';

export enum TokenKind {
  Whitespace = 'whitespace',
  Special = 'special',
  Text = 'text',
  Invalid = 'invalid',
}

export interface Token {
  kind: TokenKind;
  str: string;
  location: TokenLocation;
}

export function tokenIsText(token: Token): boolean {
  return token.kind === TokenKind.Text;
}
