import { AstExpression } from "../../data/ast/AstExpression.ts";
import { AstStatement, AstStatementKind } from "../../data/ast/AstStatement.ts";
import { AstVariable } from "../../data/ast/AstVariable.ts";
import { AstWhile } from "../../data/ast/AstWhile.ts";
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
      r.recurseVariable(r, p, data as AstVariable);
      break;
    }
    case AstStatementKind.While: {
      r.recurseWhile(r, p, data as AstWhile);
      break;
    }
    case AstStatementKind.Expression: {
      r.recurseExpression(r, p, data as AstExpression);
      break;
    }
  }
}
