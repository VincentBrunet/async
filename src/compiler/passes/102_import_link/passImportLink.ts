import { UnitModule } from '../../data/unit/UnitModule.ts';
import { makeRecursorPassDfs } from '../util/makeRecursorPassDfs.ts';
import { browseStatementImport } from './browse/browseStatementImport.ts';

const pass = makeRecursorPassDfs({
  recurseStatementImport: browseStatementImport,
});

export function passImportLink(unit: UnitModule) {
  pass(undefined).recurseModule(unit.ast);
}
