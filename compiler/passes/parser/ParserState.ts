import { Token } from "../../data/Token.ts";
import { TokenType } from "../../data/TokenType.ts";

export class ParserState {
  private tokens: Token[];
  private idxCurrent: number;
  private idxMax: number;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.idxCurrent = 0;
    this.idxMax = tokens.length;
    this.consumeWhitespaces();
  }

  empty(): boolean {
    return this.idxCurrent >= this.idxMax;
  }

  peek(): Token {
    return this.tokens[this.idxCurrent];
  }

  pop(): Token {
    const token = this.peek();
    this.consume();
    return token;
  }

  consume() {
    this.idxCurrent++;
    this.consumeWhitespaces();
  }

  consumeWhitespaces() {
    while (!this.empty()) {
      const token = this.peek();
      if (token.type === TokenType.Whitespace) {
        this.idxCurrent++;
      } else {
        return;
      }
    }
  }
}
