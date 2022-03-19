import { AstStatementExport } from "../../../data/ast/AstStatementExport.ts";
import { hashLocalSymbol } from "../../../lib/hash/hashLocalSymbol.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export function transpileStatementExport(
  pass: RecursorPass,
  ast: AstStatementExport,
  transpiler: Transpiler,
) {
  const resolvedStatementVariable = ast.resolvedStatementVariable;
  if (resolvedStatementVariable) {
    transpiler.pushStatement([
      hashLocalSymbol("export", resolvedStatementVariable.name),
      " = ",
      hashLocalSymbol("variable", resolvedStatementVariable.name),
    ]);
  }
  pass.recurseStatement(ast.statement);
}
