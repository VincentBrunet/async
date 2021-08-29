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
  astExpression: AstExpression,
) {
  switch (astExpression.type) {
    case AstExpressionType.Identifier: {
      const astValue = astExpression.value as AstExpressionIdentifier;
      output.addContent(astValue.name);
      break;
    }
    case AstExpressionType.Function: {
      const astValue = astExpression.value as AstExpressionFunction;
      writeFunction(output, astValue.function);
      break;
    }
    case AstExpressionType.Call: {
      const astValue = astExpression.value as AstExpressionCall;
      output.addContent("(");
      writeExpression(output, astValue.callee);
      output.addContent(")");
      output.addContent("()");
      break;
    }
    case AstExpressionType.Math: {
      const astValue = astExpression.value as AstExpressionMath;
      output.addContent("(");
      writeExpression(output, astValue.left);
      output.addContent(astValue.operator);
      writeExpression(output, astValue.right);
      output.addContent(")");
      break;
    }
  }
}
