import { Ast } from '../../../data/ast/Ast.ts';
import { Token, TokenKind } from '../../../data/token/Token.ts';
import { repeat } from '../../../lib/core/strings/repeat.ts';
import { TokenImpasse } from './TokenImpasse.ts';

export class Browser {
  private id = 0;
  private depth = 0;

  private log = true;

  private tokens: Array<Token>;
  private indexes: Array<number>;

  constructor(tokens: Array<Token>) {
    this.tokens = tokens;
    this.indexes = [0];
    this.forward();
  }

  peek(offset?: number): Token {
    return this.readToken(offset);
  }

  consume() {
    this.increment();
    this.forward();
  }

  recurse<T extends Ast>(
    breadcrumb: string,
    recurse: (stack: Browser) => T | TokenImpasse,
  ): T | TokenImpasse {
    return this.recurseWithParam(
      breadcrumb,
      recurse,
      undefined,
    );
  }

  recurseArray<T extends Ast, Param>(
    breadcrumb: string,
    mandatory: boolean,
    validOpen: Set<string>,
    validClose: Set<string>,
    validDelim: Set<string>,
    recurseItem: (stack: Browser) => T | TokenImpasse,
  ): Array<T> | TokenImpasse {
    return this.recurseArrayWithParam(
      breadcrumb,
      mandatory,
      validOpen,
      validClose,
      validDelim,
      recurseItem,
      undefined,
    );
  }

  recurseWithParam<T extends Ast, Param>(
    breadcrumb: string,
    recurser: (stack: Browser, param: Param) => T | TokenImpasse,
    param: Param,
  ): T | TokenImpasse {
    const before = this.getCurrentIndex();
    this.indexes.push(before);
    this.depth++;
    if (this.log) {
      console.log(
        repeat('  ', this.depth),
        '->',
        recurser.name,
        'TRY',
        this.readToken().str,
      );
    }
    const result = recurser(this, param);
    // on failure
    if (result instanceof TokenImpasse) {
      if (result.breadcrumb) {
        result.breadcrumb = breadcrumb + '.' + result.breadcrumb;
      } else {
        result.breadcrumb = breadcrumb;
      }
      if (this.log) {
        console.log(
          repeat('  ', this.depth),
          '<-',
          recurser.name,
          'FAIL',
          result.breadcrumb,
          this.readToken().str,
        );
      }
      this.indexes.pop();
    }
    // on success
    if (!(result instanceof TokenImpasse)) {
      if (this.log) {
        console.log(
          repeat('  ', this.depth),
          '<-',
          recurser.name,
          'SUCCESS',
          this.readToken().str,
        );
      }
      const after = this.indexes.pop() ?? Infinity;
      result.token = {
        begin: before,
        end: after,
      };
      if (after !== undefined) {
        this.indexes[this.getCurrentHeight()] = after;
      }
    }
    this.depth--;
    return result;
  }

  recurseArrayWithParam<T extends Ast, Param>(
    breadcrumb: string,
    mandatory: boolean,
    validOpen: Set<string>,
    validClose: Set<string>,
    validDelim: Set<string>,
    recurseItem: (stack: Browser, param: Param) => T | TokenImpasse,
    param: Param,
  ): Array<T> | TokenImpasse {
    // initial open
    const tokenOpen = this.peek();
    if (!validOpen.has(tokenOpen.str)) {
      if (mandatory) {
        return this.impasseLeaf(breadcrumb + '.Open', validOpen);
      } else {
        return [];
      }
    }
    this.consume();
    // until close
    const items = new Array<T>();
    while (true) {
      // failed
      if (this.ended()) {
        return this.impasseLeaf(breadcrumb + '.EOF', '');
      }
      // initial close
      const tokenClose = this.peek();
      if (validClose.has(tokenClose.str)) {
        this.consume();
        break;
      }
      // item
      const item = this.recurseWithParam(breadcrumb + '[' + items.length + ']', recurseItem, param);
      if (item instanceof TokenImpasse) {
        return item;
      }
      items.push(item);
      // delim
      const tokenDelim = this.peek();
      if (validDelim.has(tokenDelim.str)) {
        this.consume();
      } else if (validClose.has(tokenDelim.str)) {
        this.consume();
        break;
      } else {
        return this.impasseLeaf(breadcrumb + '.Close', validClose);
      }
    }
    return items;
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

  impasseNode(children: Array<TokenImpasse> | TokenImpasse) {
    const impasse = new TokenImpasse(this.getCurrentIndex());
    impasse.children = children;
    return impasse;
  }
  impasseLeaf(breadcrumb: string, expected: Array<string> | Set<string> | string) {
    const impasse = new TokenImpasse(this.getCurrentIndex());
    impasse.breadcrumb = breadcrumb;
    impasse.expected = expected;
    return impasse;
  }

  ended() {
    return this.getCurrentIndex() >= this.tokens.length;
  }

  increment() {
    const height = this.getCurrentHeight();
    this.indexes[height] = this.indexes[height] + 1;
  }

  private readToken(offset?: number): Token {
    const token = this.tokens[this.getCurrentIndex() + (offset ?? 0)];
    if (token === undefined) {
      return {
        kind: TokenKind.Invalid,
        str: '',
        location: {
          index: { begin: -1, end: -1 },
          line: { begin: -1, end: -1 },
          column: { begin: -1, end: -1 },
        },
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

  forward() {
    while (true) {
      const curr = this.readToken(0);
      const next = this.readToken(1);
      if (curr.kind === TokenKind.Whitespace) {
        this.increment();
      } else if (curr.str === '/' && next.str === '/') {
        this.forwardLineComment();
      } else if (curr.str === '/' && next.str === '*') {
        this.forwardBlockComment();
      } else {
        return;
      }
    }
  }

  private forwardLineComment() {
    this.increment(); // consume first dash
    this.increment(); // consume second dash
    let it = this.readToken();
    while (
      it.str.indexOf('\n') === -1 &&
      it.kind !== TokenKind.Invalid
    ) {
      this.increment();
      it = this.readToken();
    }
    this.increment(); // consume line return
  }

  private forwardBlockComment() {
    this.increment(); // consume dash
    this.increment(); // consume dot
    let curr = this.readToken(0);
    let next = this.readToken(1);
    while (
      !(curr.str === '*' && next.str === '/') &&
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
