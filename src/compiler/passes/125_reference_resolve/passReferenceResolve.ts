import { UnitModule } from '../../data/unit/UnitModule.ts';
import { makeRecursorPassNaive } from '../util/makeRecursorPassNaive.ts';
import { browseExpressionFunction } from './browse/browseExpressionFunction.ts';
import { browseExpressionIdentifier } from './browse/browseExpressionIdentifier.ts';
import { browseExpressionObject } from './browse/browseExpressionObject.ts';
import { browseExpressionRun } from './browse/browseExpressionRun.ts';
import { browseStatementImport } from './browse/browseStatementImport.ts';
import { browseStatementVariable } from './browse/browseStatementVariable.ts';
import { Scope } from './util/Scope.ts';

const pass = makeRecursorPassNaive<Scope>({
  recurseStatementImport: browseStatementImport,
  recurseStatementVariable: browseStatementVariable,
  recurseExpressionFunction: browseExpressionFunction,
  recurseExpressionObject: browseExpressionObject,
  recurseExpressionRun: browseExpressionRun,
  recurseExpressionIdentifier: browseExpressionIdentifier,
}, (scope) => {
  return new Scope(scope);
});

export function passReferenceResolve(unit: UnitModule) {
  pass(new Scope()).recurseModule(unit.ast);
}
