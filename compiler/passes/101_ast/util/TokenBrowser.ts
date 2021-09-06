import { repeat } from "../../../utils/strings/repeat.ts";
import { Token } from "../../001_tokens/data/Token.ts";
import { TokenType } from "../../../data/token/TokenType.ts";
import { TokenImpasse } from "./TokenImpasse.ts";

export class TokenBrowser {
  private tokens: Array<Token>;
  private indexes: Array<number>;

  constructor(tokens: Array<Token>) {
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

  private id = 0;

  recurse<T, V>(
    recurser: (stack: TokenBrowser, param?: V) => T | TokenImpasse,
    param?: V,
  ): T | TokenImpasse {
    this.indexes.push(this.getCurrentIndex());
    this.id++;
    console.log(
      repeat("  ", this.id),
      "+",
      recurser.name,
      "TRY",
      this.getCurrentToken().str,
    );
    const ast = recurser(this, param);
    const success = !(ast instanceof TokenImpasse);
    console.log(
      repeat("  ", this.id),
      "-",
      recurser.name,
      success ? "SUCCESS" : "FAIL",
      this.getCurrentToken().str,
    );
    this.id--;
    const after = this.indexes.pop();
    if (success && after !== undefined) {
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

  impasse(message: string, children?: Array<TokenImpasse>) {
    return new TokenImpasse(this.getCurrentIndex(), message, children);
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
