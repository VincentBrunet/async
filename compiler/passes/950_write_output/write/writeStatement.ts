import { AstStatement } from "../../../data/ast/AstStatement.ts";
import { switchOnStatement } from "../../../data/ast/util/switchOnStatement.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { writeStatementExpression } from "./writeStatementExpression.ts";
import { writeStatementVariable } from "./writeStatementVariable.ts";
import { writeStatementWhile } from "./writeStatementWhile.ts";

interface StatementParam {
  module: OutputModule;
  scope: OutputScope;
}

function makeCase<T>(
  call: (module: OutputModule, scope: OutputScope, ast: T) => void,
) {
  return (param: StatementParam, ast: T) => {
    return call(param.module, param.scope, ast);
  };
}

const mapping = {
  caseVariable: makeCase(writeStatementVariable),
  caseWhile: makeCase(writeStatementWhile),
  caseExpression: makeCase(writeStatementExpression),
};

export function writeStatement(
  module: OutputModule,
  scope: OutputScope,
  astStatement: AstStatement,
) {
  switchOnStatement(astStatement, { module, scope }, mapping);
}
