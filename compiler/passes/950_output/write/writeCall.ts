import { AstCall } from "../../101_ast/data/AstCall.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeExpression } from "./writeExpression.ts";

export function writeCall(
  module: OutputModule,
  statement: OutputStatement,
  astCall: AstCall,
) {
  statement.pushPart("function_call((t_function *)");
  writeExpression(module, statement, astCall.callee);
  statement.pushPart(")");
}
