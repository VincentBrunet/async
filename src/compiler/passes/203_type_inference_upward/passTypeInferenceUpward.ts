import { UnitModule } from '../../data/unit/UnitModule.ts';
import { makeRecursorPassSimplified } from '../util/makeRecursorPassSimplified.ts';
import { browseExpression } from './browse/browseExpression.ts';
import { browseExpressionBinary } from './browse/browseExpressionBinary.ts';
import { browseExpressionCall } from './browse/browseExpressionCall.ts';
import { browseExpressionFunction } from './browse/browseExpressionFunction.ts';
import { browseExpressionIdentifier } from './browse/browseExpressionIdentifier.ts';
import { browseExpressionLiteral } from './browse/browseExpressionLiteral.ts';
import { browseExpressionObject } from './browse/browseExpressionObject.ts';
import { browseExpressionParenthesis } from './browse/browseExpressionParenthesis.ts';
import { browseExpressionRun } from './browse/browseExpressionRun.ts';
import { browseExpressionUnary } from './browse/browseExpressionUnary.ts';
import { browseStatementExport } from './browse/browseStatementExport.ts';
import { browseStatementImport } from './browse/browseStatementImport.ts';
import { browseStatementReturn } from './browse/browseStatementReturn.ts';
import { browseStatementVariable } from './browse/browseStatementVariable.ts';
import { Tracker } from './util/Tracker.ts';

const pass = makeRecursorPassSimplified<Tracker>({
  recurseExpression: browseExpression,
  recurseExpressionBinary: browseExpressionBinary,
  recurseExpressionCall: browseExpressionCall,
  recurseExpressionFunction: browseExpressionFunction,
  recurseExpressionObject: browseExpressionObject,
  recurseExpressionRun: browseExpressionRun,
  recurseExpressionLiteral: browseExpressionLiteral,
  recurseExpressionIdentifier: browseExpressionIdentifier,
  recurseExpressionParenthesis: browseExpressionParenthesis,
  recurseExpressionUnary: browseExpressionUnary,
  recurseStatementImport: browseStatementImport,
  recurseStatementExport: browseStatementExport,
  recurseStatementReturn: browseStatementReturn,
  recurseStatementVariable: browseStatementVariable,
}, (scope) => {
  return new Tracker(scope);
});

export function passTypeInferenceUpward(unit: UnitModule) {
  pass(new Tracker()).recurseModule(unit.ast);
}
