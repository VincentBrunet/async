import { AstExpression, AstExpressionKind } from '../../../data/ast/AstExpression.ts';
import { AstExpressionBinary, AstExpressionBinaryOperator } from '../../../data/ast/AstExpressionBinary.ts';

/**
 * Supported symbol priority map
 */
const precedenceMap = new Map<AstExpressionBinaryOperator, number>();

precedenceMap.set(AstExpressionBinaryOperator.Multiplication, 20);
precedenceMap.set(AstExpressionBinaryOperator.Division, 20);
precedenceMap.set(AstExpressionBinaryOperator.Modulo, 20);

precedenceMap.set(AstExpressionBinaryOperator.Addition, 10);
precedenceMap.set(AstExpressionBinaryOperator.Substraction, 10);

precedenceMap.set(AstExpressionBinaryOperator.Less, 5);
precedenceMap.set(AstExpressionBinaryOperator.LessOrEqual, 5);
precedenceMap.set(AstExpressionBinaryOperator.More, 5);
precedenceMap.set(AstExpressionBinaryOperator.MoreOrEqual, 5);

precedenceMap.set(AstExpressionBinaryOperator.Equal, 3);
precedenceMap.set(AstExpressionBinaryOperator.NotEqual, 3);

precedenceMap.set(AstExpressionBinaryOperator.And, 2);
precedenceMap.set(AstExpressionBinaryOperator.Or, 2);

precedenceMap.set(AstExpressionBinaryOperator.Assign, 1);

/**
 * Recursor tooling for the binary chain
 */
function getBinary(expression: AstExpression): AstExpressionBinary | undefined {
  if (expression.kind === AstExpressionKind.Binary) {
    return expression.data as AstExpressionBinary;
  }
  return undefined;
}
function listBinaryLeafs(
  binary: AstExpressionBinary,
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
  binary: AstExpressionBinary,
  nodes: Array<AstExpressionBinary>,
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
export function browseExpressionBinary(
  next: () => void,
  ast: AstExpressionBinary,
) {
  // Skip if already resolved prioritization
  if (ast.resolvedPrioritization) {
    next();
    return;
  }

  // existing state of ast
  const leafs = new Array<AstExpression>();
  const nodes = new Array<AstExpressionBinary>();
  listBinaryLeafs(ast, leafs);
  listBinaryNodes(ast, nodes);

  // find the actual resolvedPrioritization steps
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
        resolvedPrioritization: true,
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
    throw new Error('Could not build the binary graph');
  }
  const binary = getBinary(expression);
  if (binary === undefined) {
    throw new Error('binary graph result was not binary');
  }
  ast.operator = binary.operator;
  ast.expression1 = binary.expression1;
  ast.expression2 = binary.expression2;

  // done
  next();
}
