import { UnitModule } from '../../data/unit/UnitModule.ts';
import { makeRecursorPassNaive } from '../util/makeRecursorPassNaive.ts';
import { browseStatementImport } from './browse/browseStatementImport.ts';

const pass = makeRecursorPassNaive({
  recurseStatementImport: browseStatementImport,
});

export function passImportLink(unit: UnitModule) {
  pass(undefined).recurseModule(unit.ast);
}
