import { UnitModule } from '../../data/unit/UnitModule.ts';
import { makeRecursorPassBfs } from '../util/makeRecursorPassBfs.ts';
import { browseExpressionFunction } from './browse/browseExpressionFunction.ts';
import { browseStatementExport } from './browse/browseStatementExport.ts';
import { Scope } from './util/Scope.ts';

const pass = makeRecursorPassBfs<Scope>({
  recurseStatementExport: browseStatementExport,
  recurseExpressionFunction: browseExpressionFunction,
}, (scope) => {
  return new Scope(scope);
});

export function passVariableDynamic(unit: UnitModule) {
  pass(new Scope()).recurseModule(unit.ast);
}
