import { UnitModule } from '../../data/unit/UnitModule.ts';
import { makeRecursorPassNaive } from '../util/makeRecursorPassNaive.ts';
import { browseStatementExport } from './browse/browseStatementExport.ts';

const pass = makeRecursorPassNaive({
  recurseStatementExport: browseStatementExport,
});

export function passExportRead(unit: UnitModule) {
  pass(undefined).recurseModule(unit.ast);
}
