import { AstBinary } from "../../../data/ast/AstBinary.ts";
import { AstCall } from "../../../data/ast/AstCall.ts";
import { AstDo } from "../../../data/ast/AstDo.ts";
import {
  AstExpression,
  AstExpressionKind,
} from "../../../data/ast/AstExpression.ts";
import { AstFunction } from "../../../data/ast/AstFunction.ts";
import { AstIdentifier } from "../../../data/ast/AstIdentifier.ts";
import { AstLiteral } from "../../../data/ast/AstLiteral.ts";
import { AstLookup } from "../../../data/ast/AstLookup.ts";
import { AstObject } from "../../../data/ast/AstObject.ts";
import { AstUnary } from "../../../data/ast/AstUnary.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeBinary } from "./writeBinary.ts";
import { writeCall } from "./writeCall.ts";
import { writeDo } from "./writeDo.ts";
import { writeFunction } from "./writeFunction.ts";
import { writeIdentifier } from "./writeIdentifier.ts";
import { writeLiteral } from "./writeLiteral.ts";
import { writeLookup } from "./writeLookup.ts";
import { writeObject } from "./writeObject.ts";
import { writeUnary } from "./writeUnary.ts";

export function writeExpression(
  module: OutputModule,
  statement: OutputStatement,
  astExpression: AstExpression,
) {
  switch (astExpression.kind) {
    case AstExpressionKind.Identifier: {
      const astData = astExpression.data as AstIdentifier;
      writeIdentifier(statement, astData);
      break;
    }
    case AstExpressionKind.Literal: {
      const astData = astExpression.data as AstLiteral;
      writeLiteral(module, statement, astData);
      break;
    }
    case AstExpressionKind.Function: {
      const astData = astExpression.data as AstFunction;
      writeFunction(module, statement, astData);
      break;
    }
    case AstExpressionKind.Lookup: {
      const astData = astExpression.data as AstLookup;
      writeLookup(module, statement, astData);
      break;
    }
    case AstExpressionKind.Call: {
      const astData = astExpression.data as AstCall;
      writeCall(module, statement, astData);
      break;
    }
    case AstExpressionKind.Object: {
      const astData = astExpression.data as AstObject;
      writeObject(module, statement, astData);
      break;
    }
    case AstExpressionKind.Do: {
      const astData = astExpression.data as AstDo;
      writeDo(module, statement, astData);
      break;
    }
    case AstExpressionKind.Unary: {
      const astData = astExpression.data as AstUnary;
      writeUnary(module, statement, astData);
      break;
    }
    case AstExpressionKind.Binary: {
      const astData = astExpression.data as AstBinary;
      writeBinary(module, statement, astData);
      break;
    }
  }
}
