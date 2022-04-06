export class TokenImpasse {
  index: number;
  breadcrumb?: string;
  expected?: Array<string> | Set<string> | string;
  children?: Array<TokenImpasse> | TokenImpasse;

  constructor(index: number) {
    this.index = index;
  }
}
