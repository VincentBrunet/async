import { AstModule } from '../../data/ast/AstModule.ts';
import { UnitModule } from '../../data/unit/UnitModule.ts';
import { makeRecursorPassSimplified } from '../util/makeRecursorPassSimplified.ts';
import { browseBlock } from './browse/browseBlock.ts';
import { browseExpressionFunction } from './browse/browseExpressionFunction.ts';
import { browseExpressionRun } from './browse/browseExpressionRun.ts';
import { browseModule } from './browse/browseModule.ts';
import { browseStatementExport } from './browse/browseStatementExport.ts';
import { browseStatementImport } from './browse/browseStatementImport.ts';
import { browseStatementReturn } from './browse/browseStatementReturn.ts';
import { browseStatementVariable } from './browse/browseStatementVariable.ts';
import { Scope } from './util/Scope.ts';

const pass = makeRecursorPassSimplified<Scope>({
  recurseBlock: browseBlock,
  recurseExpressionFunction: browseExpressionFunction,
  recurseExpressionRun: browseExpressionRun,
  recurseModule: browseModule,
  recurseStatementImport: browseStatementImport,
  recurseStatementExport: browseStatementExport,
  recurseStatementReturn: browseStatementReturn,
  recurseStatementVariable: browseStatementVariable,
}, (scope) => {
  return new Scope(scope);
});

export function passStatementCollector(unit: UnitModule) {
  pass(new Scope()).recurseModule(unit.ast);
}
