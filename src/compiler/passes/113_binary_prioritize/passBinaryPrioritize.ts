import { UnitModule } from '../../data/unit/UnitModule.ts';
import { makeRecursorPassSimplified } from '../util/makeRecursorPassSimplified.ts';
import { browseExpressionBinary } from './browse/browseExpressionBinary.ts';

const pass = makeRecursorPassSimplified({
  recurseExpressionBinary: browseExpressionBinary,
});

export function passBinaryPrioritize(unit: UnitModule) {
  pass(undefined).recurseModule(unit.ast);
}
