import { UnitModule } from "../../data/unit/UnitModule.ts";
import { makeRecursorPassSimplified } from "../util/makeRecursorPassSimplified.ts";
import { browseExpressionBinary } from "./browse/browseExpressionBinary.ts";

const pass = makeRecursorPassSimplified((no) => no, {
  recurseExpressionBinary: browseExpressionBinary,
});

export function passBinaryPrioritize(unit: UnitModule) {
  pass.recurseModule(unit.ast, unit.ast);
}
