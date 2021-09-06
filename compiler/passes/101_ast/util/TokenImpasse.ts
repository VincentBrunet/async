export class TokenImpasse {
  constructor(
    readonly index: number,
    readonly message: string,
    readonly children?: Array<TokenImpasse>,
  ) {}
}
