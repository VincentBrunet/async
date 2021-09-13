import { AstBinary, AstBinaryOperator } from "../../../data/ast/AstBinary.ts";
import {
  AstExpression,
  AstExpressionKind,
} from "../../../data/ast/AstExpression.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseExpression } from "./browseExpression.ts";

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
  binary: AstBinary,
  leafs: Array<AstExpression>,
) {
  const left = getBinary(binary.expression1);
  if (left) {
    listBinaryLeafs(left, leafs);
  } else {
    leafs.push(binary.expression1);
  }
  const right = getBinary(binary.expression2);
  if (right) {
    listBinaryLeafs(right, leafs);
  } else {
    leafs.push(binary.expression2);
  }
}
function listBinaryNodes(
  binary: AstBinary,
  nodes: Array<AstBinary>,
) {
  const left = getBinary(binary.expression1);
  if (left) {
    listBinaryNodes(left, nodes);
  }
  nodes.push(binary);
  const right = getBinary(binary.expression2);
  if (right) {
    listBinaryNodes(right, nodes);
  }
}

/**
 * Build a new binary operation tree by reading the inputs and operators
 */
export function browseBinary(
  scope: BrowsedScope,
  astBinary: AstBinary,
) {
  // existing state of ast
  const leafs = new Array<AstExpression>();
  const nodes = new Array<AstBinary>();
  listBinaryLeafs(astBinary, leafs);
  listBinaryNodes(astBinary, nodes);

  // find the actual prioritized steps
  interface Step {
    idx: number;
    priority: number;
  }
  const steps = new Array<Step>();
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
  const binary = getBinary(expression);
  if (binary === undefined) {
    throw new Error("binary graph result was not binary");
  }
  astBinary.operator = binary.operator;
  astBinary.expression1 = binary.expression1;
  astBinary.expression2 = binary.expression2;

  // Recurse on the leafs only
  for (const leaf of leafs) {
    browseExpression(scope, leaf);
  }
}
