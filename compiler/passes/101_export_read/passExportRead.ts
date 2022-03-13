import { UnitModule } from "../../data/unit/UnitModule.ts";
import { makeRecursorPassSimplified } from "../util/makeRecursorPassSimplified.ts";
import { browseStatementExport } from "./browse/browseStatementExport.ts";

const pass = makeRecursorPassSimplified((no) => no, {
  recurseStatementExport: browseStatementExport,
});

export function passExportRead(unit: UnitModule) {
  pass.recurseModule(unit.ast, unit.ast);
}
