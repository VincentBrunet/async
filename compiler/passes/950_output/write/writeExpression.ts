import { AstCall } from "../../101_ast/data/AstCall.ts";
import {
  AstExpression,
  AstExpressionType,
} from "../../101_ast/data/AstExpression.ts";
import { AstFunction } from "../../101_ast/data/AstFunction.ts";
import { AstIdentifier } from "../../101_ast/data/AstIdentifier.ts";
import { AstLiteral } from "../../101_ast/data/AstLiteral.ts";
import { AstOperation } from "../../101_ast/data/AstOperation.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeFunction } from "./writeFunction.ts";
import { writeLiteral } from "./writeLiteral.ts";

export function writeExpression(
  module: OutputModule,
  statement: OutputStatement,
  astExpression: AstExpression,
) {
  switch (astExpression.type) {
    case AstExpressionType.Identifier: {
      const astData = astExpression.data as AstIdentifier;
      statement.pushPart(astData.name);
      break;
    }
    case AstExpressionType.Literal: {
      const astData = astExpression.data as AstLiteral;
      writeLiteral(module, statement, astData);
      break;
    }
    case AstExpressionType.Function: {
      const astData = astExpression.data as AstFunction;
      writeFunction(module, statement, astData);
      break;
    }
    case AstExpressionType.Call: {
      const astData = astExpression.data as AstCall;
      statement.pushPart("(");
      writeExpression(module, statement, astData.callee);
      statement.pushPart(")");
      statement.pushPart("()");
      break;
    }
    case AstExpressionType.Operation: {
      const astData = astExpression.data as AstOperation;
      statement.pushPart("(");
      writeExpression(module, statement, astData.left);
      statement.pushPart(astData.operator);
      writeExpression(module, statement, astData.right);
      statement.pushPart(")");
      break;
    }
  }
}
