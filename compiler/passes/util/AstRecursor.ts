import { AstBlock } from "../../data/ast/AstBlock.ts";
import { AstExpression } from "../../data/ast/AstExpression.ts";
import { AstExpressionBinary } from "../../data/ast/AstExpressionBinary.ts";
import { AstExpressionCall } from "../../data/ast/AstExpressionCall.ts";
import { AstExpressionFunction } from "../../data/ast/AstExpressionFunction.ts";
import { AstExpressionIdentifier } from "../../data/ast/AstExpressionIdentifier.ts";
import { AstExpressionLiteral } from "../../data/ast/AstExpressionLiteral.ts";
import { AstExpressionLookup } from "../../data/ast/AstExpressionLookup.ts";
import { AstExpressionObject } from "../../data/ast/AstExpressionObject.ts";
import { AstExpressionParenthesis } from "../../data/ast/AstExpressionParenthesis.ts";
import { AstExpressionRun } from "../../data/ast/AstExpressionRun.ts";
import { AstExpressionUnary } from "../../data/ast/AstExpressionUnary.ts";
import { AstModule } from "../../data/ast/AstModule.ts";
import { AstStatement } from "../../data/ast/AstStatement.ts";
import { AstVariable } from "../../data/ast/AstVariable.ts";
import { AstWhile } from "../../data/ast/AstWhile.ts";

export interface AstRecursor<Param> {
  recurseModule: (
    recursor: AstRecursor<Param>,
    param: Param,
    ast: AstModule,
  ) => void;

  recurseBlock: (
    recursor: AstRecursor<Param>,
    param: Param,
    ast: AstBlock,
  ) => void;
  recurseStatement: (
    recursor: AstRecursor<Param>,
    param: Param,
    ast: AstStatement,
  ) => void;

  recurseWhile: (
    recursor: AstRecursor<Param>,
    param: Param,
    ast: AstWhile,
  ) => void;
  recurseVariable: (
    recursor: AstRecursor<Param>,
    param: Param,
    ast: AstVariable,
  ) => void;

  recurseExpression: (
    recursor: AstRecursor<Param>,
    param: Param,
    ast: AstExpression,
  ) => void;
  recurseExpressionBinary: (
    recursor: AstRecursor<Param>,
    param: Param,
    ast: AstExpressionBinary,
  ) => void;
  recurseExpressionUnary: (
    recursor: AstRecursor<Param>,
    param: Param,
    ast: AstExpressionUnary,
  ) => void;
  recurseExpressionIdentifier: (
    recursor: AstRecursor<Param>,
    param: Param,
    ast: AstExpressionIdentifier,
  ) => void;
  recurseExpressionLiteral: (
    recursor: AstRecursor<Param>,
    param: Param,
    ast: AstExpressionLiteral,
  ) => void;
  recurseExpressionCall: (
    recursor: AstRecursor<Param>,
    param: Param,
    ast: AstExpressionCall,
  ) => void;
  recurseExpressionLookup: (
    recursor: AstRecursor<Param>,
    param: Param,
    ast: AstExpressionLookup,
  ) => void;
  recurseExpressionFunction: (
    recursor: AstRecursor<Param>,
    param: Param,
    ast: AstExpressionFunction,
  ) => void;
  recurseExpressionObject: (
    recursor: AstRecursor<Param>,
    param: Param,
    ast: AstExpressionObject,
  ) => void;
  recurseExpressionRun: (
    recursor: AstRecursor<Param>,
    param: Param,
    ast: AstExpressionRun,
  ) => void;
  recurseExpressionParenthesis: (
    recursor: AstRecursor<Param>,
    param: Param,
    ast: AstExpressionParenthesis,
  ) => void;
}
