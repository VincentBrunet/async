import { UnitModule } from "../../data/unit/UnitModule.ts";
import { makeRecursorPassSimplified } from "../util/makeRecursorPassSimplified.ts";
import { browseStatementImport } from "./browse/browseStatementImport.ts";

const pass = makeRecursorPassSimplified((no) => no, {
  recurseStatementImport: browseStatementImport,
});

export function passImportLink(unit: UnitModule) {
  pass.recurseModule(unit.ast, unit.ast);
}
