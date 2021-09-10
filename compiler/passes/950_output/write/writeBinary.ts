import { AstBinary } from "../../../data/ast/AstBinary.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeExpression } from "./writeExpression.ts";

export function writeBinary(
  module: OutputModule,
  statement: OutputStatement,
  astBinary: AstBinary,
) {
  statement.pushPart("binary"); // TODO
  statement.pushPart("(");
  writeExpression(module, statement, astBinary.expression1);
  statement.pushPart(", ");
  writeExpression(module, statement, astBinary.expression2);
  statement.pushPart(")");
}
