import { UnitModule } from '../../data/unit/UnitModule.ts';
import { makeRecursorPassSimplified } from '../util/makeRecursorPassSimplified.ts';
import { browseStatementExport } from './browse/browseStatementExport.ts';

const pass = makeRecursorPassSimplified({
  recurseStatementExport: browseStatementExport,
});

export function passExportRead(unit: UnitModule) {
  pass(undefined).recurseModule(unit.ast);
}
