import { hash } from "../../../utils/strings/hash.ts";
import { AstIdentifier } from "../../101_ast/data/AstIdentifier.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputStatement } from "../util/OutputStatement.ts";

export function writeIdentifier(
  module: OutputModule,
  statement: OutputStatement,
  astIdentifier: AstIdentifier,
) {
  statement.pushPart("object_get(module, ");
  statement.pushPart(hash(astIdentifier.name).toString());
  statement.pushPart(")->value");
}
