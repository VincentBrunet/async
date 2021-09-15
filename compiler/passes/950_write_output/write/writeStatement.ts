import { AstExpression } from "../../../data/ast/AstExpression.ts";
import { AstStatement } from "../../../data/ast/AstStatement.ts";
import { switchOnStatement } from "../../../data/ast/util/switchOnStatement.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeExpression } from "./writeExpression.ts";
import { writeVariable } from "./writeVariable.ts";
import { writeWhile } from "./writeWhile.ts";

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
  caseVariable: makeCase(writeVariable),
  caseWhile: makeCase(writeWhile),
  caseExpression: makeCase(
    (module: OutputModule, scope: OutputScope, expression: AstExpression) => {
      const statement = new OutputStatement();
      writeExpression(module, scope, statement, expression);
      scope.pushStatement(OutputOrder.Logic, statement);
    },
  ),
};

export function writeStatement(
  module: OutputModule,
  scope: OutputScope,
  astStatement: AstStatement,
) {
  switchOnStatement(astStatement, { module, scope }, mapping);
}
