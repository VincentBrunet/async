import {
  AstExpression,
  AstExpressionCall,
  AstExpressionFunction,
  AstExpressionIdentifier,
  AstExpressionLiteral,
  AstExpressionMath,
  AstExpressionType,
} from "../../101_ast/data/AstExpression.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeFunction } from "./writeFunction.ts";

export function writeExpression(
  module: OutputModule,
  statement: OutputStatement,
  astExpression: AstExpression,
) {
  switch (astExpression.type) {
    case AstExpressionType.Identifier: {
      const astData = astExpression.data as AstExpressionIdentifier;
      statement.pushPart(astData.name);
      break;
    }
    case AstExpressionType.Literal: {
      const astData = astExpression.data as AstExpressionLiteral;
      statement.pushPart("value_factory_i32(");
      statement.pushPart(astData.value);
      statement.pushPart(")");
      break;
    }
    case AstExpressionType.Function: {
      const astData = astExpression.data as AstExpressionFunction;
      writeFunction(module, statement, astData.function);
      break;
    }
    case AstExpressionType.Call: {
      const astData = astExpression.data as AstExpressionCall;
      statement.pushPart("(");
      writeExpression(module, statement, astData.callee);
      statement.pushPart(")");
      statement.pushPart("()");
      break;
    }
    case AstExpressionType.Math: {
      const astData = astExpression.data as AstExpressionMath;
      statement.pushPart("(");
      writeExpression(module, statement, astData.left);
      statement.pushPart(astData.operator);
      writeExpression(module, statement, astData.right);
      statement.pushPart(")");
      break;
    }
  }
}
