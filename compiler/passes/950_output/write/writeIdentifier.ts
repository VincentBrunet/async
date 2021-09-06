import { hash } from "../../../util/strings/hash.ts";
import { AstIdentifier } from "../../../data/ast/AstIdentifier.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputStatement } from "../util/OutputStatement.ts";

export function writeIdentifier(
  module: OutputModule,
  statement: OutputStatement,
  astIdentifier: AstIdentifier,
) {
  statement.pushPart("object_variable(");
  statement.pushPart("module");
  statement.pushPart(",");
  statement.pushPart(" /*");
  statement.pushPart(astIdentifier.name);
  statement.pushPart("*/ ");
  statement.pushPart(hash(astIdentifier.name).toString());
  statement.pushPart(")->value");
}
