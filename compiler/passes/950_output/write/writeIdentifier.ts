import { hash } from "../../../util/strings/hash.ts";
import { AstIdentifier } from "../../../data/ast/AstIdentifier.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputStatement } from "../util/OutputStatement.ts";

export function writeIdentifier(
  module: OutputModule,
  statement: OutputStatement,
  astIdentifier: AstIdentifier,
) {
  const declaration = astIdentifier.declaration;
  if (declaration) {
    if (declaration.closure) {
      statement.pushPart("closure_variable(");
      statement.pushPart("closure");
      statement.pushPart(",");
      statement.pushPart(" /*");
      statement.pushPart(declaration.name);
      statement.pushPart("*/ ");
      statement.pushPart(hash(declaration.name).toString());
      statement.pushPart(")->value");
    } else {
      if (declaration.variable) {
        statement.pushPart("__");
        statement.pushPart(declaration.name);
        statement.pushPart("->value");
      } else {
        statement.pushPart("__");
        statement.pushPart(declaration.name);
      }
    }
  } else {
    throw new Error("Unresolved identifier:" + astIdentifier.name);
  }
}
