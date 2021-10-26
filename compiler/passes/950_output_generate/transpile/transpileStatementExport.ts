import { AstStatementExport } from "../../../data/ast/AstStatementExport.ts";
import { hashLocalSymbol } from "../../../lib/hash/hashLocalSymbol.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export async function transpileStatementExport(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstStatementExport,
) {
  const resolvedStatementVariable = ast.resolvedStatementVariable;
  if (resolvedStatementVariable) {
    transpiler.pushStatement([
      hashLocalSymbol("export", resolvedStatementVariable.name),
      " = ",
      hashLocalSymbol("variable", resolvedStatementVariable.name),
    ]);
  }
  await pass.recurseStatement(transpiler, ast.statement);
}
