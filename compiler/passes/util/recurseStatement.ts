import { AstStatement, AstStatementKind } from "../../data/ast/AstStatement.ts";
import { AstStatementCondition } from "../../data/ast/AstStatementCondition.ts";
import { AstStatementEmpty } from "../../data/ast/AstStatementEmpty.ts";
import { AstStatementExpression } from "../../data/ast/AstStatementExpression.ts";
import { AstStatementReturn } from "../../data/ast/AstStatementReturn.ts";
import { AstStatementTypedef } from "../../data/ast/AstStatementTypedef.ts";
import { AstStatementUnsafe } from "../../data/ast/AstStatementUnsafe.ts";
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
    case AstStatementKind.Condition: {
      r.recurseStatementCondition(p, data as AstStatementCondition);
      break;
    }
    case AstStatementKind.Return: {
      r.recurseStatementReturn(p, data as AstStatementReturn);
      break;
    }
    case AstStatementKind.Unsafe: {
      r.recurseStatementUnsafe(p, data as AstStatementUnsafe);
      break;
    }
    case AstStatementKind.Expression: {
      r.recurseStatementExpression(p, data as AstStatementExpression);
      break;
    }
    case AstStatementKind.Empty: {
      r.recurseStatementEmpty(p, data as AstStatementEmpty);
      break;
    }
  }
}
