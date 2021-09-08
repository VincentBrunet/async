import { hash } from "../../../util/strings/hash.ts";
import { AstIdentifier } from "../../../data/ast/AstIdentifier.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { AstClosure } from "../../../data/ast/AstClosure.ts";
import { AstReferenceKind } from "../../../data/ast/AstReference.ts";
import { AstParam } from "../../../data/ast/AstParam.ts";
import { AstVariable } from "../../../data/ast/AstVariable.ts";

export function writeIdentifier(
  module: OutputModule,
  statement: OutputStatement,
  astIdentifier: AstIdentifier,
) {
  const reference = astIdentifier.reference;
  if (reference) {
    switch (reference.kind) {
      case AstReferenceKind.Closure: {
        const closure = reference.data as AstClosure;
        statement.pushPart("closure[");
        statement.pushPart(closure.idx.toString());
        statement.pushPart("]->value");
        break;
      }
      case AstReferenceKind.Param: {
        const param = reference.data as AstParam;
        statement.pushPart("__");
        statement.pushPart(param.name);
        break;
      }
      case AstReferenceKind.Variable: {
        const variable = reference.data as AstVariable;
        statement.pushPart("__");
        statement.pushPart(variable.name);
        statement.pushPart("->value");
        break;
      }
    }
  } else {
    throw new Error("Unresolved identifier:" + astIdentifier.name);
  }
}
