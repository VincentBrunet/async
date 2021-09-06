import { AstCall } from "../../../data/ast/AstCall.ts";
import {
  AstExpression,
  AstExpressionType,
} from "../../../data/ast/AstExpression.ts";
import { AstFunction } from "../../../data/ast/AstFunction.ts";
import { AstIdentifier } from "../../../data/ast/AstIdentifier.ts";
import { AstLiteral } from "../../../data/ast/AstLiteral.ts";
import { AstObject } from "../../../data/ast/AstObject.ts";
import { AstOperation } from "../../../data/ast/AstOperation.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeCall } from "./writeCall.ts";
import { writeFunction } from "./writeFunction.ts";
import { writeIdentifier } from "./writeIdentifier.ts";
import { writeLiteral } from "./writeLiteral.ts";
import { writeObject } from "./writeObject.ts";

export function writeExpression(
  module: OutputModule,
  statement: OutputStatement,
  astExpression: AstExpression,
) {
  switch (astExpression.type) {
    case AstExpressionType.Identifier: {
      const astData = astExpression.data as AstIdentifier;
      writeIdentifier(module, statement, astData);
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
      writeCall(module, statement, astData);
      break;
    }
    case AstExpressionType.Object: {
      const astData = astExpression.data as AstObject;
      writeObject(module, statement, astData);
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
