import { AstParam } from "../../../data/ast/AstParam.ts";
import { AstResolvedClosure } from "../../../data/ast/AstResolvedClosure.ts";
import { AstResolvedReferenceKind } from "../../../data/ast/AstResolvedReference.ts";
import { AstVariable } from "../../../data/ast/AstVariable.ts";
import { OutputStatement } from "../util/OutputStatement.ts";

export function writeResolvedClosure(
  statement: OutputStatement,
  astClosure: AstResolvedClosure,
) {
  const reference = astClosure.reference;
  if (reference) {
    switch (reference.kind) {
      case AstResolvedReferenceKind.Closure: {
        const closure = reference.data as AstResolvedClosure;
        statement.pushPart("closure[");
        statement.pushPart(closure.idx.toString());
        statement.pushPart("]");
        break;
      }
      case AstResolvedReferenceKind.Param: {
        const param = reference.data as AstParam;
        statement.pushPart("ref_make(");
        statement.pushPart("__");
        statement.pushPart(param.name);
        statement.pushPart(")");
        break;
      }
      case AstResolvedReferenceKind.Variable: {
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
