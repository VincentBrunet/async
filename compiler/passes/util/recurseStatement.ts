import { AstStatement, AstStatementKind } from "../../data/ast/AstStatement.ts";
import { AstStatementExpression } from "../../data/ast/AstStatementExpression.ts";
import { AstStatementReturn } from "../../data/ast/AstStatementReturn.ts";
import { AstStatementTypedef } from "../../data/ast/AstStatementTypedef.ts";
import { AstStatementVariable } from "../../data/ast/AstStatementVariable.ts";
import { AstStatementWhile } from "../../data/ast/AstStatementWhile.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseStatement<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstStatement,
) {
  const kind = ast.kind;
  const data = ast.data;
  switch (kind) {
    case AstStatementKind.Variable: {
      r.recurseStatementVariable(p, data as AstStatementVariable);
      break;
    }
    case AstStatementKind.Typedef: {
      r.recurseStatementTypedef(p, data as AstStatementTypedef);
      break;
    }
    case AstStatementKind.While: {
      r.recurseStatementWhile(p, data as AstStatementWhile);
      break;
    }
    case AstStatementKind.Return: {
      r.recurseStatementReturn(p, data as AstStatementReturn);
      break;
    }
    case AstStatementKind.Expression: {
      r.recurseStatementExpression(p, data as AstStatementExpression);
      break;
    }
  }
}
