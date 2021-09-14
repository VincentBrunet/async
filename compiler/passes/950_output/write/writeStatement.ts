import { AstStatement } from "../../../data/ast/AstStatement.ts";
import { AstExpression } from "../../../data/ast/expression/AstExpression.ts";
import { doBrowseStatement } from "../../../data/ast/util/doBrowseStatement.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeExpression } from "./expression/writeExpression.ts";
import { writeVariable } from "./writeVariable.ts";
import { writeWhile } from "./writeWhile.ts";

interface StatementParam {
  module: OutputModule;
  scope: OutputScope;
}

function makeBrowser<T>(
  call: (module: OutputModule, scope: OutputScope, ast: T) => void,
) {
  return (param: StatementParam, ast: T) => {
    return call(param.module, param.scope, ast);
  };
}

const browser = {
  browseVariable: makeBrowser(writeVariable),
  browseWhile: makeBrowser(writeWhile),
  browseExpression: makeBrowser(
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
  doBrowseStatement(astStatement, { module, scope }, browser);
}
