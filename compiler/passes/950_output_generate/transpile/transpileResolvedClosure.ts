import { AstExpressionFunctionParam } from "../../../data/ast/AstExpressionFunction.ts";
import { AstResolvedClosure } from "../../../data/ast/AstResolvedClosure.ts";
import { AstResolvedReferenceKind } from "../../../data/ast/AstResolvedReference.ts";
import { AstStatementImportSlot } from "../../../data/ast/AstStatementImport.ts";
import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export function transpileResolvedClosure(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstResolvedClosure,
) {
  // Assert
  const resolvedReference = ensure(ast.resolvedReference);
  // Resolve proper lookup
  switch (resolvedReference.kind) {
    case AstResolvedReferenceKind.Closure: {
      const closure = resolvedReference.data as AstResolvedClosure;
      transpiler.pushPart("closure[");
      transpiler.pushPart(closure.idx.toString());
      transpiler.pushPart("]");
      break;
    }
    case AstResolvedReferenceKind.FunctionParam: {
      const param = resolvedReference.data as AstExpressionFunctionParam;
      transpiler.pushPart("ref_make(");
      transpiler.pushPart("__");
      transpiler.pushPart(ensure(param.name));
      transpiler.pushPart(")");
      break;
    }
    case AstResolvedReferenceKind.Variable: {
      const variable = resolvedReference.data as AstStatementVariable;
      transpiler.pushPart("__");
      transpiler.pushPart(variable.name);
      break;
    }
    case AstResolvedReferenceKind.ImportSlot: {
      const slot = resolvedReference.data as AstStatementImportSlot;
      transpiler.pushPart("_import_");
      transpiler.pushPart(slot.name);
      break;
    }
  }
}
