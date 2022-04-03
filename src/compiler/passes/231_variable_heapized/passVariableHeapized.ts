import { UnitModule } from '../../data/unit/UnitModule.ts';
import { makeRecursorPassBfs } from '../util/makeRecursorPassBfs.ts';
import { browseExpressionFunction } from './browse/browseExpressionFunction.ts';
import { browseStatementExport } from './browse/browseStatementExport.ts';

const pass = makeRecursorPassBfs({
  recurseStatementExport: browseStatementExport,
  recurseExpressionFunction: browseExpressionFunction,
});

export function passVariableHeapized(unit: UnitModule) {
  pass(undefined).recurseModule(unit.ast);
}
