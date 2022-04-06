import { AstStatement, AstStatementData, AstStatementKind } from '../../../data/ast/AstStatement.ts';
import { Browser } from '../util/Browser.ts';
import { TokenImpasse } from '../util/TokenImpasse.ts';
import { parseStatementBlock } from './parseStatementBlock.ts';
import { parseStatementCondition } from './parseStatementCondition.ts';
import { parseStatementEmpty } from './parseStatementEmpty.ts';
import { parseStatementExport } from './parseStatementExport.ts';
import { parseStatementExpression } from './parseStatementExpression.ts';
import { parseStatementImport } from './parseStatementImport.ts';
import { parseStatementReturn } from './parseStatementReturn.ts';
import { parseStatementTypedef } from './parseStatementTypedef.ts';
import { parseStatementUnsafe } from './parseStatementUnsafe.ts';
import { parseStatementVariable } from './parseStatementVariable.ts';
import { parseStatementWhile } from './parseStatementWhile.ts';

function makeStatement(kind: AstStatementKind, data: AstStatementData) {
  return { kind: kind, data: data };
}

const possibilities = new Array<[AstStatementKind, (b: Browser) => AstStatementData | TokenImpasse]>();
possibilities.push([AstStatementKind.Empty, parseStatementEmpty]);
possibilities.push([AstStatementKind.Import, parseStatementImport]);
possibilities.push([AstStatementKind.Export, parseStatementExport]);
possibilities.push([AstStatementKind.Variable, parseStatementVariable]);
possibilities.push([AstStatementKind.Typedef, parseStatementTypedef]);
possibilities.push([AstStatementKind.Block, parseStatementBlock]);
possibilities.push([AstStatementKind.While, parseStatementWhile]);
possibilities.push([AstStatementKind.Condition, parseStatementCondition]);
possibilities.push([AstStatementKind.Return, parseStatementReturn]);
possibilities.push([AstStatementKind.Unsafe, parseStatementUnsafe]);
possibilities.push([AstStatementKind.Expression, parseStatementExpression]);

export function parseStatement(
  browser: Browser,
): AstStatement | TokenImpasse {
  const tokenImpasses = new Array<TokenImpasse>();
  let astStatement: AstStatement | undefined;
  for (const possibility of possibilities) {
    const result = browser.recurse(possibility[0], possibility[1]);
    if (result instanceof TokenImpasse) {
      tokenImpasses.push(result);
    } else {
      astStatement = makeStatement(possibility[0], result);
      const next = browser.peek();
      if (next.str === ';') {
        browser.consume();
      }
      break;
    }
  }
  if (astStatement === undefined) {
    return browser.impasseNode(tokenImpasses);
  }
  return astStatement;
}
