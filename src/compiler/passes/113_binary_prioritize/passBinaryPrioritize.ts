import { UnitModule } from '../../data/unit/UnitModule.ts';
import { makeRecursorPassDfs } from '../util/makeRecursorPassDfs.ts';
import { browseExpressionBinary } from './browse/browseExpressionBinary.ts';

const pass = makeRecursorPassDfs({
  recurseExpressionBinary: browseExpressionBinary,
});

export function passBinaryPrioritize(unit: UnitModule) {
  pass(undefined).recurseModule(unit.ast);
}
