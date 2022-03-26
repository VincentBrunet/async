import { UnitModule } from '../../data/unit/UnitModule.ts';
import { makeRecursorPassDfs } from '../util/makeRecursorPassDfs.ts';
import { browseTypeObject } from './browse/browseTypeObject.ts';

const pass = makeRecursorPassDfs({
  recurseTypeObject: browseTypeObject,
});

export function passObjectFields(unit: UnitModule) {
  pass(undefined).recurseModule(unit.ast);
}
