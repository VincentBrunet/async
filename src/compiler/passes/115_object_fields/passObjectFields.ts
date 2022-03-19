import { UnitModule } from '../../data/unit/UnitModule.ts';
import { makeRecursorPassSimplified } from '../util/makeRecursorPassSimplified.ts';
import { browseTypeObject } from './browse/browseTypeObject.ts';

const pass = makeRecursorPassSimplified({
  recurseTypeObject: browseTypeObject,
});

export function passObjectFields(unit: UnitModule) {
  pass(undefined).recurseModule(unit.ast);
}
