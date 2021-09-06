import { AstCall } from "../../../data/ast/AstCall.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeExpression } from "./writeExpression.ts";

export function writeCall(
  module: OutputModule,
  statement: OutputStatement,
  astCall: AstCall,
) {
  statement.pushPart("function_call_");
  statement.pushPart(astCall.params.length.toString());
  statement.pushPart("(");
  writeExpression(module, statement, astCall.callee);
  for (const astParam of astCall.params) {
    statement.pushPart(", ");
    writeExpression(module, statement, astParam);
  }
  statement.pushPart(")");
}
