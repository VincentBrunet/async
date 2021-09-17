import { AstStatement, AstStatementKind } from "../../data/ast/AstStatement.ts";
import { AstStatementExpression } from "../../data/ast/AstStatementExpression.ts";
import { AstStatementVariable } from "../../data/ast/AstStatementVariable.ts";
import { AstStatementWhile } from "../../data/ast/AstStatementWhile.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseStatement<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstStatement,
) {
  const kind = ast.kind;
  const data = ast.data;
  switch (kind) {
    case AstStatementKind.Variable: {
      r.recurseStatementVariable(r, p, data as AstStatementVariable);
      break;
    }
    case AstStatementKind.While: {
      r.recurseStatementWhile(r, p, data as AstStatementWhile);
      break;
    }
    case AstStatementKind.Expression: {
      r.recurseStatementExpression(r, p, data as AstStatementExpression);
      break;
    }
  }
}
