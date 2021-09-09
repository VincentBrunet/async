import { repeat } from "../../../util/strings/repeat.ts";
import { Token } from "../../../data/token/Token.ts";
import { TokenKind } from "../../../data/token/Token.ts";
import { TokenImpasse } from "./TokenImpasse.ts";

export class TokenBrowser {
  private depth = 0;

  private tokens: Array<Token>;
  private indexes: Array<number>;

  constructor(tokens: Array<Token>) {
    this.tokens = tokens;
    this.indexes = [0];
    this.fastForward();
  }

  peek() {
    return this.readToken(0);
  }

  consume() {
    this.increment();
    this.fastForward();
  }

  recurse<T, V>(
    recurser: (stack: TokenBrowser, param?: V) => T | TokenImpasse,
    param?: V,
  ): T | TokenImpasse {
    this.indexes.push(this.getCurrentIndex());
    this.depth++;
    /*
    console.log(
      repeat("  ", this.depth),
      "+",
      recurser.name,
      "TRY",
      this.readToken().str,
    );
    */
    const ast = recurser(this, param);
    const success = !(ast instanceof TokenImpasse);
    /*
    console.log(
      repeat("  ", this.depth),
      "-",
      recurser.name,
      success ? "SUCCESS" : "FAIL",
      this.readToken().str,
    );
    */
    this.depth--;
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
    const height = this.getCurrentHeight();
    this.indexes[height] = this.indexes[height] + 1;
  }

  private readToken(offset: number) {
    const token = this.tokens[this.getCurrentIndex() + offset];
    if (token === undefined) {
      return {
        kind: TokenKind.Invalid,
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
      const curr = this.readToken(0);
      const next = this.readToken(1);
      if (curr.kind === TokenKind.Whitespace) {
        this.increment();
      } else if (curr.str === "/" && next.str === "/") {
        this.fastForwardLineComment();
      } else if (curr.str === "/" && next.str === "*") {
        this.fastForwardBlockComment();
      } else {
        return;
      }
    }
  }

  private fastForwardLineComment() {
    this.increment(); // consume first dash
    this.increment(); // consume second dash
    let it = this.readToken(0);
    while (
      it.str.indexOf("\n") === -1 &&
      it.kind !== TokenKind.Invalid
    ) {
      this.increment();
      it = this.readToken(0);
    }
    this.increment(); // consume line return
  }

  private fastForwardBlockComment() {
    this.increment(); // consume dash
    this.increment(); // consume dot
    let curr = this.readToken(0);
    let next = this.readToken(1);
    while (
      !(curr.str === "*" && next.str === "/") &&
      curr.kind !== TokenKind.Invalid
    ) {
      this.increment();
      curr = this.readToken(0);
      next = this.readToken(1);
    }
    this.increment(); // consume dot
    this.increment(); // consume dash
  }
}
