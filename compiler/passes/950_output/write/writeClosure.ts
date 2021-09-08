import { hash } from "../../../util/strings/hash.ts";
import { AstClosure } from "../../../data/ast/AstClosure.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { AstReferenceKind } from "../../../data/ast/AstReference.ts";
import { AstParam } from "../../../data/ast/AstParam.ts";
import { AstVariable } from "../../../data/ast/AstVariable.ts";

export function writeClosure(
  module: OutputModule,
  statement: OutputStatement,
  astClosure: AstClosure,
) {
  const reference = astClosure.reference;
  if (reference) {
    switch (reference.kind) {
      case AstReferenceKind.Closure: {
        const closure = reference.data as AstClosure;
        statement.pushPart("closure_variable(");
        statement.pushPart("closure");
        statement.pushPart(",");
        statement.pushPart(" /*");
        statement.pushPart(closure.name);
        statement.pushPart("*/ ");
        statement.pushPart(hash(closure.name).toString());
        statement.pushPart(")");
        break;
      }
      case AstReferenceKind.Param: {
        const param = reference.data as AstParam;
        statement.pushPart("variable_make(");
        statement.pushPart(" /*");
        statement.pushPart(param.name);
        statement.pushPart("*/ ");
        statement.pushPart(hash(param.name).toString());
        statement.pushPart(", ");
        statement.pushPart("__");
        statement.pushPart(param.name);
        statement.pushPart(")");
        break;
      }
      case AstReferenceKind.Variable: {
        const variable = reference.data as AstVariable;
        statement.pushPart("__");
        statement.pushPart(variable.name);
        break;
      }
    }
  } else {
    throw new Error("Unresolved Closure:" + astClosure.name);
  }
}
