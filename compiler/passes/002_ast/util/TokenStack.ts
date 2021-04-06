import { Token } from "../../001_tokens/data/Token.ts";
import { TokenType } from "../../001_tokens/data/TokenType.ts";

export class TokenStack {
  private tokens: Token[];
  private indexes: number[] = [];

  constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.indexes = [0];
    this.fastForward();
  }

  peek() {
    return this.getCurrentToken();
  }
  consume() {
    this.increment();
    this.fastForward();
  }

  parse<T>(parser: (stack: TokenStack) => T | undefined): T | undefined {
    this.indexes.push(this.getCurrentIndex());
    const ast = parser(this);
    const after = this.indexes.pop();
    if (ast !== undefined && after !== undefined) {
      this.indexes[this.getCurrentHeight()] = after;
    }
    return ast;
  }

  error(message: string) {
    console.log(
      "token",
      this.tokens.slice(this.getCurrentIndex(), this.getCurrentIndex() + 4)
    );
    throw new Error(message + " -> " + this.peek().str);
  }

  ended() {
    return this.getCurrentIndex() >= this.tokens.length;
  }

  private increment() {
    this.indexes[this.getCurrentHeight()] =
      this.indexes[this.getCurrentHeight()] + 1;
  }

  private getCurrentToken() {
    const token = this.tokens[this.getCurrentIndex()];
    if (token === undefined) {
      return {
        type: TokenType.Invalid,
        str: "",
      };
    }
    return token;
  }
  private getCurrentIndex() {
    return this.indexes[this.getCurrentHeight()];
  }
  private getCurrentHeight() {
    return this.indexes.length - 1;
  }

  private fastForward() {
    while (true) {
      const token = this.getCurrentToken();
      if (token.type === TokenType.Whitespace) {
        this.increment();
      } else {
        return;
      }
    }
  }
}
