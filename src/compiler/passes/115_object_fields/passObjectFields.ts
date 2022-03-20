import { UnitModule } from '../../data/unit/UnitModule.ts';
import { makeRecursorPassNaive } from '../util/makeRecursorPassNaive.ts';
import { browseTypeObject } from './browse/browseTypeObject.ts';

const pass = makeRecursorPassNaive({
  recurseTypeObject: browseTypeObject,
});

export function passObjectFields(unit: UnitModule) {
  pass(undefined).recurseModule(unit.ast);
}
