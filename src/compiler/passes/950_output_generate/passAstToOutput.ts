import { UnitModule } from '../../data/unit/UnitModule.ts';
import { makeRecursorPassAdvanced } from '../util/makeRecursorPassAdvanced.ts';
import { transpileBlock } from './transpile/transpileBlock.ts';
import { transpileExpressionBinary } from './transpile/transpileExpressionBinary.ts';
import { transpileExpressionCall } from './transpile/transpileExpressionCall.ts';
import { transpileExpressionFunction } from './transpile/transpileExpressionFunction.ts';
import { transpileExpressionIdentifier } from './transpile/transpileExpressionIdentifier.ts';
import { transpileExpressionLiteral } from './transpile/transpileExpressionLiteral.ts';
import { transpileExpressionLookup } from './transpile/transpileExpressionLookup.ts';
import { transpileExpressionObject } from './transpile/transpileExpressionObject.ts';
import { transpileExpressionParenthesis } from './transpile/transpileExpressionParenthesis.ts';
import { transpileExpressionRun } from './transpile/transpileExpressionRun.ts';
import { transpileExpressionTyping } from './transpile/transpileExpressionTyping.ts';
import { transpileExpressionUnary } from './transpile/transpileExpressionUnary.ts';
import { transpileModule } from './transpile/transpileModule.ts';
import { transpileStatementBlock } from './transpile/transpileStatementBlock.ts';
import { transpileStatementCondition } from './transpile/transpileStatementCondition.ts';
import { transpileStatementExport } from './transpile/transpileStatementExport.ts';
import { transpileStatementExpression } from './transpile/transpileStatementExpression.ts';
import { transpileStatementImport } from './transpile/transpileStatementImport.ts';
import { transpileStatementReturn } from './transpile/transpileStatementReturn.ts';
import { transpileStatementUnsafe } from './transpile/transpileStatementUnsafe.ts';
import { transpileStatementVariable } from './transpile/transpileStatementVariable.ts';
import { transpileStatementWhile } from './transpile/transpileStatementWhile.ts';
import { Transpiler } from './util/Transpiler.ts';

const pass = makeRecursorPassAdvanced({
  recurseModule: transpileModule,
  recurseBlock: transpileBlock,
  recurseExpressionBinary: transpileExpressionBinary,
  recurseExpressionCall: transpileExpressionCall,
  recurseExpressionFunction: transpileExpressionFunction,
  recurseExpressionIdentifier: transpileExpressionIdentifier,
  recurseExpressionLiteral: transpileExpressionLiteral,
  recurseExpressionLookup: transpileExpressionLookup,
  recurseExpressionObject: transpileExpressionObject,
  recurseExpressionParenthesis: transpileExpressionParenthesis,
  recurseExpressionRun: transpileExpressionRun,
  recurseExpressionTyping: transpileExpressionTyping,
  recurseExpressionUnary: transpileExpressionUnary,
  recurseStatementCondition: transpileStatementCondition,
  recurseStatementExport: transpileStatementExport,
  recurseStatementExpression: transpileStatementExpression,
  recurseStatementBlock: transpileStatementBlock,
  recurseStatementImport: transpileStatementImport,
  recurseStatementReturn: transpileStatementReturn,
  recurseStatementUnsafe: transpileStatementUnsafe,
  recurseStatementVariable: transpileStatementVariable,
  recurseStatementWhile: transpileStatementWhile,
});

export function passAstToOutput(unit: UnitModule) {
  const transpiler = new Transpiler(unit);
  pass(transpiler).recurseModule(unit.ast);
  unit.output = transpiler.getOutput();
}
