import { UnitModule } from '../../data/unit/UnitModule.ts';
import { makeRecursorPassSimplified } from '../util/makeRecursorPassSimplified.ts';
import { browseStatementImport } from './browse/browseStatementImport.ts';

const pass = makeRecursorPassSimplified({
  recurseStatementImport: browseStatementImport,
});

export function passImportLink(unit: UnitModule) {
  pass(undefined).recurseModule(unit.ast);
}
