import { AstUnary } from "../../../data/ast/AstUnary.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeExpression } from "./writeExpression.ts";

export function writeUnary(
  module: OutputModule,
  statement: OutputStatement,
  astUnary: AstUnary,
) {
  statement.pushPart("unary"); // TODO
  statement.pushPart("(");
  writeExpression(module, statement, astUnary.expression);
  statement.pushPart(")");
}
