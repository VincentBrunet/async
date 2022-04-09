import { Range } from '../../../data/util/Range.ts';

export class TokenImpasse {
  token?: Range;

  breadcrumb?: string;
  expected?: Array<string> | Set<string> | string;

  parent?: TokenImpasse;
  children?: Array<TokenImpasse> | TokenImpasse;
}
