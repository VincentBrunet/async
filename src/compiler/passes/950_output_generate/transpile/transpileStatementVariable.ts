import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";
import { hashLocalSymbol } from "../../../lib/hash/hashLocalSymbol.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export function transpileStatementVariable(
  pass: RecursorPass,
  ast: AstStatementVariable,
  transpiler: Transpiler,
) {
  if (ast.value) {
    transpiler.pushStatement([
      hashLocalSymbol("variable", ast.name),
      "->value",
      " = ",
    ]);
    pass.recurseExpression(ast.value);
  }
}
