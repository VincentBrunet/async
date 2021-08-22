import { clamp } from "../../../utils/maths/clamp.ts";
import { repeat } from "../../../utils/strings/repeat.ts";
import { Token } from "../../001_tokens/data/Token.ts";
import { TokenType } from "../../001_tokens/data/TokenType.ts";
import { TokenImpasse } from "./TokenImpasse.ts";

export class TokenBrowser {
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

  recurse<T>(
    recurser: (stack: TokenBrowser) => T | TokenImpasse
  ): T | TokenImpasse {
    this.indexes.push(this.getCurrentIndex());
    const ast = recurser(this);
    const after = this.indexes.pop();
    if (ast !== undefined && after !== undefined) {
      this.indexes[this.getCurrentHeight()] = after;
    }
    return ast;
  }

  /*
  error(message: string, origin?: TokenImpasse) {
    // TODO - remove in favor of impasse?
    const indexCurrent = this.getCurrentIndex();
    const indexMin = clamp(indexCurrent - 4, 0, this.tokens.length);
    const indexMid = clamp(indexCurrent, 0, this.tokens.length);
    const indexMax = clamp(indexCurrent + 4, 0, this.tokens.length);

    const before = this.tokenString(this.tokens.slice(indexMin, indexMid));
    const center = this.tokens[indexMid].str;
    const after = this.tokenString(this.tokens.slice(indexMid + 1, indexMax));

    const lines = [];
    lines.push(message);
    lines.push(repeat("-", before.length + center.length + after.length));
    lines.push(before + center + after);
    lines.push(repeat(" ", before.length) + "^");
    lines.push(repeat("-", before.length + center.length + after.length));

    throw new Error(lines.join("\n"));
  }
  */

  impasse(message: string, origin?: TokenImpasse) {
    return new TokenImpasse(this.getCurrentIndex(), message, origin);
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

  private tokenString(tokens: Token[]) {
    return tokens.map((token) => token.str).join("");
  }
}
