import { UnitModule } from '../../data/unit/UnitModule.ts';
import { makeRecursorPassDfs } from '../util/makeRecursorPassDfs.ts';
import { browseStatementExport } from './browse/browseStatementExport.ts';

const pass = makeRecursorPassDfs({
  recurseStatementExport: browseStatementExport,
});

export function passExportRead(unit: UnitModule) {
  pass(undefined).recurseModule(unit.ast);
}
