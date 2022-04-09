import { Token } from '../../../data/token/Token.ts';
import { clamp } from '../../../lib/core/numbers/clamp.ts';
import { repeat } from '../../../lib/core/strings/repeat.ts';
import { TokenImpasse } from './TokenImpasse.ts';

export class TokenDebugger {
  private log = false;

  constructor(private readonly tokens: Array<Token>) {}

  error(impasse: TokenImpasse) {
    const flattened: Array<TokenImpasse> = [];
    this.errorRec(0, impasse, flattened);

    const best = flattened.sort((a, b) => {
      return (b.token?.end ?? 0) - (a.token?.end ?? 0);
    })[0]!;

    const chain = [];
    let current: TokenImpasse | undefined = best;
    while (current) {
      chain.push(current.breadcrumb);
      current = current.parent;
    }
    chain.reverse();

    console.log('chain', chain.join(' -> '));

    const token = best.token!;

    const lineBefore = this.strBeforeIndexToBeforeLine(token.end, 0);
    const lineError = this.strAtIndex(token.end);
    const lineAfter = this.strAfterIndexToAfterLine(token.end, 0);

    console.log('Parse error: Unespected token:');
    console.log(' > ', lineBefore + lineError + lineAfter);
    console.log(' > ', repeat(' ', lineBefore.length) + '^');
    console.log('Expected ', best.expected);
  }

  private errorRec(depth: number, impasse: TokenImpasse, flattened: Array<TokenImpasse>) {
    flattened.push(impasse);

    if (this.log) {
      const indent = repeat('  ', depth);
      if (impasse.expected && impasse.token) {
        console.log(indent, impasse.breadcrumb, [this.strAtIndex(impasse.token.end)], 'expected:', impasse.expected);
      } else {
        console.log(indent, impasse.breadcrumb);
      }
    }

    const children = impasse.children;
    if (children) {
      if (children instanceof TokenImpasse) {
        this.errorRec(depth + 1, children, flattened);
      } else {
        for (const child of children) {
          this.errorRec(depth + 1, child, flattened);
        }
      }
    }
  }

  /*
  private smallContext(impasse: TokenImpasse, lineBefore?: number, lineAfter?: number) {
    const token = this.tokens[impasse.index];
    const line = token.location.line;
    const lineBegin = line.begin;
    const lineEnd = line.end;

    const idx = impasse.index;

    const before = this.tokenString(this.slice(idx - 10, idx));
    const middle = this.tokenString(this.slice(idx, idx + 1));
    const after = this.tokenString(this.slice(idx + 1, idx + 10));

    return [
      before,
      middle,
      after,
    ].join('');
  }
  */

  private strIndexToIndex(begin: number, end: number) {
    const parts = [];
    for (let index = begin; index <= end; index++) {
      parts.push(this.tokenAtIndex(index).str);
    }
    return parts.join('');
  }

  private strBeforeIndexToBeforeLine(index: number, offset: number) {
    const parts = [];
    const original = this.tokenAtIndex(index);
    index--;
    const targetLine = original.location.line.begin - offset;
    while (true) {
      const current = this.tokenAtIndex(index);
      if (current.location.line.begin < targetLine) {
        break;
      }
      index--;
      parts.push(current.str);
    }
    parts.reverse();
    return parts.join('');
  }

  private strAfterIndexToAfterLine(index: number, offset: number) {
    const parts = [];
    const original = this.tokenAtIndex(index);
    index++;
    const targetLine = original.location.line.end + offset;
    while (true) {
      const current = this.tokenAtIndex(index);
      if (current.location.line.end > targetLine) {
        break;
      }
      index++;
      parts.push(current.str);
    }
    return parts.join('');
  }

  private strAtIndex(index: number) {
    return this.tokenAtIndex(index)?.str;
  }

  private tokenAtIndex(index: number) {
    return this.tokens[index];
  }

  private tokenString(tokens: Array<Token>) {
    return tokens.map((token) => token.str).join('');
  }

  private readStringFromTokenIndex(index: number) {
  }

  private slice(start: number, end: number) {
    const length = this.tokens.length;
    const min = clamp(start, 0, length - 1);
    const max = clamp(end, min, length - 1);
    return this.tokens.slice(min, max);
  }
}
