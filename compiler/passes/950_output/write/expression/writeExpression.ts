import { AstExpression } from "../../../../data/ast/expression/AstExpression.ts";
import { switchOnExpression } from "../../../../data/ast/util/switchOnExpression.ts";
import { OutputModule } from "../../util/OutputModule.ts";
import { OutputScope } from "../../util/OutputScope.ts";
import { OutputStatement } from "../../util/OutputStatement.ts";
import { writeExpressionBinary } from "./writeExpressionBinary.ts";
import { writeExpressionCall } from "./writeExpressionCall.ts";
import { writeExpressionFunction } from "./writeExpressionFunction.ts";
import { writeExpressionIdentifier } from "./writeExpressionIdentifier.ts";
import { writeExpressionLiteral } from "./writeExpressionLiteral.ts";
import { writeExpressionLookup } from "./writeExpressionLookup.ts";
import { writeExpressionObject } from "./writeExpressionObject.ts";
import { writeExpressionParenthesis } from "./writeExpressionParenthesis.ts";
import { writeExpressionRun } from "./writeExpressionRun.ts";
import { writeExpressionUnary } from "./writeExpressionUnary.ts";

interface ExpressionParam {
  module: OutputModule;
  scope: OutputScope;
  statement: OutputStatement;
}

function makeCase<T>(
  call: (
    module: OutputModule,
    scope: OutputScope,
    statement: OutputStatement,
    ast: T,
  ) => void,
) {
  return (param: ExpressionParam, ast: T) => {
    return call(param.module, param.scope, param.statement, ast);
  };
}

const mapping = {
  caseCall: makeCase(writeExpressionCall),
  caseIdentifier: makeCase(writeExpressionIdentifier),
  caseLiteral: makeCase(writeExpressionLiteral),
  caseFunction: makeCase(writeExpressionFunction),
  caseObject: makeCase(writeExpressionObject),
  caseRun: makeCase(writeExpressionRun),
  caseLookup: makeCase(writeExpressionLookup),
  caseUnary: makeCase(writeExpressionUnary),
  caseBinary: makeCase(writeExpressionBinary),
  caseParenthesis: makeCase(writeExpressionParenthesis),
};

export function writeExpression(
  module: OutputModule,
  scope: OutputScope,
  statement: OutputStatement,
  astExpression: AstExpression,
) {
  switchOnExpression(astExpression, { module, scope, statement }, mapping);
}
