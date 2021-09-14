import { AstExpression } from "../../../data/ast/expression/AstExpression.ts";
import { doBrowseExpression } from "../../../data/ast/util/doBrowseExpression.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeBinary } from "./writeBinary.ts";
import { writeCall } from "./writeCall.ts";
import { writeFunction } from "./writeFunction.ts";
import { writeIdentifier } from "./writeIdentifier.ts";
import { writeLiteral } from "./writeLiteral.ts";
import { writeLookup } from "./writeLookup.ts";
import { writeObject } from "./writeObject.ts";
import { writeParenthesis } from "./writeParenthesis.ts";
import { writeRun } from "./writeRun.ts";
import { writeUnary } from "./writeUnary.ts";

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
  browseCall: makeBrowser(writeCall),
  browseIdentifier: makeBrowser(writeIdentifier),
  browseLiteral: makeBrowser(writeLiteral),
  browseFunction: makeBrowser(writeFunction),
  browseObject: makeBrowser(writeObject),
  browseRun: makeBrowser(writeRun),
  browseLookup: makeBrowser(writeLookup),
  browseUnary: makeBrowser(writeUnary),
  browseBinary: makeBrowser(writeBinary),
  browseParenthesis: makeBrowser(writeParenthesis),
};

export function writeExpression(
  module: OutputModule,
  scope: OutputScope,
  statement: OutputStatement,
  astExpression: AstExpression,
) {
  doBrowseExpression(astExpression, { module, scope, statement }, browser);
}
