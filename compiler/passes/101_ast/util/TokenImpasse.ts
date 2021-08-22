import { TokenBrowser } from "./TokenBrowser.ts";

export class TokenImpasse {
  constructor(
    readonly index: number,
    readonly message: string,
    readonly children?: TokenImpasse[],
  ) {}
}
