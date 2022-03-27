import { UnitModule } from '../../data/unit/UnitModule.ts';
import { makeRecursorPassBfs } from '../util/makeRecursorPassBfs.ts';
import { browseExpressionFunction } from './browse/browseExpressionFunction.ts';
import { browseExpressionObject } from './browse/browseExpressionObject.ts';
import { browseExpressionRun } from './browse/browseExpressionRun.ts';
import { browseStatementExport } from './browse/browseStatementExport.ts';
import { browseStatementImport } from './browse/browseStatementImport.ts';
import { browseStatementVariable } from './browse/browseStatementVariable.ts';
import { browseModule } from './browse/browseModule.ts';

const pass = makeRecursorPassBfs({
  recurseStatementExport: browseStatementExport,
  recurseStatementImport: browseStatementImport,
  recurseStatementVariable: browseStatementVariable,
  recurseExpressionFunction: browseExpressionFunction,
  recurseExpressionObject: browseExpressionObject,
  recurseExpressionRun: browseExpressionRun,
  recurseModule: browseModule,
});

export function passSymbolNames(unit: UnitModule) {
  pass(unit.ast).recurseModule(unit.ast);
}
