import { AstStatement, AstStatementKind } from "../../data/ast/AstStatement.ts";
import { AstVariable } from "../../data/ast/AstVariable.ts";
import { AstWhile } from "../../data/ast/AstWhile.ts";
import { AstExpression } from "../../data/ast/expression/AstExpression.ts";
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
    }
    case AstStatementKind.While: {
      r.recurseWhile(r, p, data as AstWhile);
    }
    case AstStatementKind.Expression: {
      r.recurseExpression(r, p, data as AstExpression);
    }
  }
}
