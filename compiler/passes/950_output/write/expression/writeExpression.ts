import { AstExpression } from "../../../../data/ast/expression/AstExpression.ts";
import { doBrowseExpression } from "../../../../data/ast/util/doBrowseExpression.ts";
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

function makeBrowser<T>(
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

const browser = {
  browseCall: makeBrowser(writeExpressionCall),
  browseIdentifier: makeBrowser(writeExpressionIdentifier),
  browseLiteral: makeBrowser(writeExpressionLiteral),
  browseFunction: makeBrowser(writeExpressionFunction),
  browseObject: makeBrowser(writeExpressionObject),
  browseRun: makeBrowser(writeExpressionRun),
  browseLookup: makeBrowser(writeExpressionLookup),
  browseUnary: makeBrowser(writeExpressionUnary),
  browseBinary: makeBrowser(writeExpressionBinary),
  browseParenthesis: makeBrowser(writeExpressionParenthesis),
};

export function writeExpression(
  module: OutputModule,
  scope: OutputScope,
  statement: OutputStatement,
  astExpression: AstExpression,
) {
  doBrowseExpression(astExpression, { module, scope, statement }, browser);
}
