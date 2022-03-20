import { UnitModule } from '../../data/unit/UnitModule.ts';
import { makeRecursorPassNaive } from '../util/makeRecursorPassNaive.ts';
import { browseExpressionBinary } from './browse/browseExpressionBinary.ts';

const pass = makeRecursorPassNaive({
  recurseExpressionBinary: browseExpressionBinary,
});

export function passBinaryPrioritize(unit: UnitModule) {
  pass(undefined).recurseModule(unit.ast);
}
