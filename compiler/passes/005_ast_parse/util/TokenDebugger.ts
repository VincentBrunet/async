import { Token } from "../../../data/token/Token.ts";
import { clamp } from "../../../lib/numbers/clamp.ts";
import { repeat } from "../../../lib/strings/repeat.ts";
import { TokenImpasse } from "./TokenImpasse.ts";

export class TokenDebugger {
  constructor(private readonly tokens: Array<Token>) {}

  error(impasse: TokenImpasse) {
    console.log("impasse");
    this.errorRec(impasse, 0);
  }

  private errorRec(impasse: TokenImpasse, depth: number) {
    const indent = repeat("  ", depth);
    console.log(indent, impasse.message, "->", this.smallContext(impasse));

    if (impasse.children) {
      for (const child of impasse.children) {
        this.errorRec(child, depth + 1);
      }
    }
  }

  private smallContext(impasse: TokenImpasse) {
    const idx = impasse.index;

    const before = this.tokenString(this.slice(idx - 10, idx));
    const middle = this.tokenString(this.slice(idx, idx + 1));
    const after = this.tokenString(this.slice(idx + 1, idx + 10));

    return [
      before,
      middle,
      after,
    ];
  }

  private tokenString(tokens: Array<Token>) {
    return tokens.map((token) => token.str).join("");
  }

  private slice(start: number, end: number) {
    const length = this.tokens.length;
    const min = clamp(start, 0, length - 1);
    const max = clamp(end, min, length - 1);
    return this.tokens.slice(min, max);
  }
}
