import { astExpressionMakeLiteral } from '../../../data/ast/AstExpression.ts';
import { AstStatementCondition, AstStatementConditionBranch } from '../../../data/ast/AstStatementCondition.ts';
import { AstTypePrimitiveNative } from '../../../data/ast/AstTypePrimitive.ts';
import { Browser } from '../util/Browser.ts';
import { TokenImpasse } from '../util/TokenImpasse.ts';
import { parseBlock } from './parseBlock.ts';
import { parseExpression } from './parseExpression.ts';

function parseStatementConditionBranch(
  browser: Browser,
  first: boolean,
): AstStatementConditionBranch | TokenImpasse {
  // keyword else (required for non-first)
  if (!first) {
    const keywordElse = browser.peek();
    if (keywordElse.str !== 'else') {
      return browser.impasseLeaf('Keyword(Else)', 'else');
    }
    browser.consume();
  }
  // keyword if (optional if last)
  const keyword = browser.peek();
  if (keyword.str !== 'if') {
    // block
    const block = browser.recurse('Block', parseBlock);
    if (block instanceof TokenImpasse) {
      return browser.impasseNode(block);
    }
    // It's an else
    return {
      condition: astExpressionMakeLiteral({
        native: AstTypePrimitiveNative.Boolean,
        value: 'true',
      }),
      block: block,
    };
  } else {
    browser.consume();
  }
  // expression
  const astCondition = browser.recurse('Expression', parseExpression);
  if (astCondition instanceof TokenImpasse) {
    return browser.impasseNode(astCondition);
  }
  // block
  const astBlock = browser.recurse('Block', parseBlock);
  if (astBlock instanceof TokenImpasse) {
    return browser.impasseNode(astBlock);
  }
  // done
  return {
    condition: astCondition,
    block: astBlock,
  };
}

export function parseStatementCondition(
  browser: Browser,
): AstStatementCondition | TokenImpasse {
  const branches = new Array<AstStatementConditionBranch>();
  while (true) {
    const astConditionBranch = browser.recurseWithParam('Branch', parseStatementConditionBranch, branches.length === 0);
    if (astConditionBranch instanceof TokenImpasse) {
      if (branches.length === 0) {
        return astConditionBranch;
      } else {
        break;
      }
    } else {
      branches.push(astConditionBranch);
      if (astConditionBranch.condition === undefined) {
        break;
      }
    }
  }
  return {
    branches: branches,
  };
}
