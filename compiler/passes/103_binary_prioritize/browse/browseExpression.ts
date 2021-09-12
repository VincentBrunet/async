import { AstBinary, AstBinaryOperator } from "../../../data/ast/AstBinary.ts";
import {
  AstExpression,
  AstExpressionKind,
} from "../../../data/ast/AstExpression.ts";
import { doBrowseExpression } from "../../../data/ast/util/doBrowseExpression.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseCall } from "./browseCall.ts";
import { browseFunction } from "./browseFunction.ts";
import { browseIdentifier } from "./browseIdentifier.ts";
import { browseLiteral } from "./browseLiteral.ts";
import { browseLookup } from "./browseLookup.ts";
import { browseObject } from "./browseObject.ts";
import { browseParenthesis } from "./browseParenthesis.ts";
import { browseRun } from "./browseRun.ts";
import { browseUnary } from "./browseUnary.ts";

/**
 * Supported symbol priority map
 */
const precedenceMap = new Map<AstBinaryOperator, number>();

precedenceMap.set(AstBinaryOperator.Multiplication, 20);
precedenceMap.set(AstBinaryOperator.Division, 20);
precedenceMap.set(AstBinaryOperator.Modulo, 20);

precedenceMap.set(AstBinaryOperator.Addition, 10);
precedenceMap.set(AstBinaryOperator.Substraction, 10);

precedenceMap.set(AstBinaryOperator.Less, 5);
precedenceMap.set(AstBinaryOperator.LessOrEqual, 5);
precedenceMap.set(AstBinaryOperator.More, 5);
precedenceMap.set(AstBinaryOperator.MoreOrEqual, 5);

precedenceMap.set(AstBinaryOperator.Equal, 3);
precedenceMap.set(AstBinaryOperator.NotEqual, 3);

precedenceMap.set(AstBinaryOperator.And, 2);
precedenceMap.set(AstBinaryOperator.Or, 2);

precedenceMap.set(AstBinaryOperator.Assign, 1);

/**
 * Recursor tooling for the binary chain
 */
function getBinary(expression: AstExpression): AstBinary | undefined {
  if (expression.kind === AstExpressionKind.Binary) {
    return expression.data as AstBinary;
  }
  return undefined;
}
function listBinaryLeafs(
  expression: AstExpression,
  leafs: Array<AstExpression>,
) {
  const binary = getBinary(expression);
  if (!binary) {
    leafs.push(expression);
    return;
  }
  listBinaryLeafs(binary.expression1, leafs);
  listBinaryLeafs(binary.expression2, leafs);
}
function listBinaryNodes(
  expression: AstExpression,
  nodes: Array<AstBinary>,
) {
  const binary = getBinary(expression);
  if (!binary) {
    return;
  }
  listBinaryNodes(binary.expression1, nodes);
  nodes.push(binary);
  listBinaryNodes(binary.expression2, nodes);
}

/**
 * Build a new binary operation tree by reading the inputs and operators
 */
export function reflowBinaries(
  scope: BrowsedScope,
  astExpression: AstExpression,
) {
  // existing state of ast
  const leafs = new Array<AstExpression>();
  const nodes = new Array<AstBinary>();
  listBinaryLeafs(astExpression, leafs);
  listBinaryNodes(astExpression, nodes);

  // find the actual prioritized steps
  interface ChainStep {
    idx: number;
    priority: number;
  }
  const steps = new Array<ChainStep>();
  for (let idx = 0; idx < nodes.length; idx++) {
    const node = nodes[idx];
    const precedence = precedenceMap.get(node.operator) ?? 0;
    const priority = precedence * 100000 - idx;
    steps.push({ idx: idx, priority: priority });
  }
  steps.sort((a, b) => {
    return b.priority - a.priority;
  });

  // Build the new operation graph from the step list
  const expressions = [...leafs];
  let expression: AstExpression | undefined;
  for (const step of steps) {
    let idx1 = step.idx;
    let idx2 = step.idx + 1;
    const node = nodes[step.idx];
    const expression1 = expressions[idx1];
    const expression2 = expressions[idx2];
    expression = {
      kind: AstExpressionKind.Binary,
      data: {
        operator: node.operator,
        expression1: expression1,
        expression2: expression2,
      },
    };
    while (expressions[idx1] === expression1) {
      expressions[idx1] = expression;
      idx1 -= 1;
    }
    while (expressions[idx2] === expression2) {
      expressions[idx2] = expression;
      idx2 += 1;
    }
  }

  // Read the result of the new graph
  if (expression === undefined) {
    throw new Error("Could not build the binary graph");
  }
  astExpression.kind = expression.kind;
  astExpression.data = expression.data;

  // Recurse on the leafs only
  for (const leaf of leafs) {
    browseExpression(scope, leaf);
  }
}

/**
 * Normal browsing code
 */
const browser = {
  browseCall: browseCall,
  browseIdentifier: browseIdentifier,
  browseLiteral: browseLiteral,
  browseFunction: browseFunction,
  browseObject: browseObject,
  browseRun: browseRun,
  browseLookup: browseLookup,
  browseUnary: browseUnary,
  browseBinary: () => {
    throw new Error("Should be handled manually");
  },
  browseParenthesis: browseParenthesis,
};

export function browseExpression(
  scope: BrowsedScope,
  astExpression: AstExpression,
) {
  if (astExpression.kind === AstExpressionKind.Binary) {
    reflowBinaries(scope, astExpression);
    return;
  }
  doBrowseExpression(astExpression, scope, browser);
}
