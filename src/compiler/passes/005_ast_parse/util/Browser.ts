import { Ast } from '../../../data/ast/Ast.ts';
import { Token, TokenKind } from '../../../data/token/Token.ts';
import { repeat } from '../../../lib/core/strings/repeat.ts';
import { parseUtilArray, UtilArrayAst, UtilArraySetup } from './parseUtilArray.ts';
import { TokenImpasse } from './TokenImpasse.ts';

export class Browser {
  private id = 0;
  private depth = 0;

  private log = false;

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

  recurseArray<T extends Ast>(
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
    const after = this.indexes.pop() ?? Infinity;
    result.token = {
      begin: before,
      end: after,
    };
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
      this.indexes[this.getCurrentHeight()] = after;
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
    const result = this.recurseWithParam<UtilArrayAst<T>, UtilArraySetup<T, Param>>(
      breadcrumb,
      parseUtilArray,
      {
        mandatory: mandatory,
        validOpen: validOpen,
        validClose: validClose,
        validDelim: validDelim,
        recurseItem: recurseItem,
        param: param,
      },
    );
    if (result instanceof TokenImpasse) {
      return result;
    }
    return result.items;
  }

  impasseNode(children: Array<TokenImpasse> | TokenImpasse) {
    const impasse = new TokenImpasse();
    impasse.children = children;
    if (children instanceof TokenImpasse) {
      children.parent = impasse;
    } else {
      for (const child of children) {
        child.parent = impasse;
      }
    }
    return impasse;
  }
  impasseLeaf(breadcrumb: string, expected: Array<string> | Set<string> | string) {
    const impasse = new TokenImpasse();
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
