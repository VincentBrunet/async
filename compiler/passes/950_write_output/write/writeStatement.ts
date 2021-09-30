import { AstStatement } from "../../../data/ast/AstStatement.ts";
import { switchOnStatement } from "../../../data/ast/util/switchOnStatement.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { writeStatementCondition } from "./writeStatementCondition.ts";
import { writeStatementEmpty } from "./writeStatementEmpty.ts";
import { writeStatementExpression } from "./writeStatementExpression.ts";
import { writeStatementImport } from "./writeStatementImport.ts";
import { writeStatementReturn } from "./writeStatementReturn.ts";
import { writeStatementTypedef } from "./writeStatementTypedef.ts";
import { writeStatementUnsafe } from "./writeStatementUnsafe.ts";
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
  caseImport: makeCase(writeStatementImport),
  caseVariable: makeCase(writeStatementVariable),
  caseTypedef: makeCase(writeStatementTypedef),
  caseWhile: makeCase(writeStatementWhile),
  caseCondition: makeCase(writeStatementCondition),
  caseReturn: makeCase(writeStatementReturn),
  caseUnsafe: makeCase(writeStatementUnsafe),
  caseExpression: makeCase(writeStatementExpression),
  caseEmpty: makeCase(writeStatementEmpty),
};

export function writeStatement(
  module: OutputModule,
  scope: OutputScope,
  astStatement: AstStatement,
) {
  switchOnStatement(astStatement, { module, scope }, mapping);
}
