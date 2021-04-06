import {
  AstExpression,
  AstExpressionCall,
  AstExpressionFunction,
  AstExpressionIdentifier,
  AstExpressionMath,
  AstExpressionType,
} from "../../101_ast/data/AstExpression.ts";

import { OutputCode } from "../util/OutputCode.ts";
import { writeFunction } from "./writeFunction.ts";

export function writeExpression(
  output: OutputCode,
  astExpression: AstExpression
) {
  switch (astExpression.type) {
    case AstExpressionType.Identifier: {
      const astValue = astExpression.value as AstExpressionIdentifier;
      output.writeToSource(astValue.name);
      break;
    }
    case AstExpressionType.Function: {
      const astValue = astExpression.value as AstExpressionFunction;
      writeFunction(output, astValue.function);
      break;
    }
    case AstExpressionType.Call: {
      const astValue = astExpression.value as AstExpressionCall;
      writeExpression(output, astValue.callee);
      output.writeToSource("()");
      break;
    }
    case AstExpressionType.Math: {
      const astValue = astExpression.value as AstExpressionMath;
      output.writeToSource("(");
      writeExpression(output, astValue.left);
      output.writeToSource(astValue.operator);
      writeExpression(output, astValue.right);
      output.writeToSource(")");
      break;
    }
  }
}
