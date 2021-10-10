import { AstStatement, AstStatementKind } from "../../data/ast/AstStatement.ts";
import { AstStatementCondition } from "../../data/ast/AstStatementCondition.ts";
import { AstStatementEmpty } from "../../data/ast/AstStatementEmpty.ts";
import { AstStatementExport } from "../../data/ast/AstStatementExport.ts";
import { AstStatementExpression } from "../../data/ast/AstStatementExpression.ts";
import { AstStatementImport } from "../../data/ast/AstStatementImport.ts";
import { AstStatementReturn } from "../../data/ast/AstStatementReturn.ts";
import { AstStatementTypedef } from "../../data/ast/AstStatementTypedef.ts";
import { AstStatementUnsafe } from "../../data/ast/AstStatementUnsafe.ts";
import { AstStatementVariable } from "../../data/ast/AstStatementVariable.ts";
import { AstStatementWhile } from "../../data/ast/AstStatementWhile.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseStatement<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstStatement,
) {
  const kind = ast.kind;
  const data = ast.data;
  switch (kind) {
    case AstStatementKind.Import: {
      await r.recurseStatementImport(p, data as AstStatementImport);
      break;
    }
    case AstStatementKind.Export: {
      await r.recurseStatementExport(p, data as AstStatementExport);
      break;
    }
    case AstStatementKind.Variable: {
      await r.recurseStatementVariable(p, data as AstStatementVariable);
      break;
    }
    case AstStatementKind.Typedef: {
      await r.recurseStatementTypedef(p, data as AstStatementTypedef);
      break;
    }
    case AstStatementKind.While: {
      await r.recurseStatementWhile(p, data as AstStatementWhile);
      break;
    }
    case AstStatementKind.Condition: {
      await r.recurseStatementCondition(p, data as AstStatementCondition);
      break;
    }
    case AstStatementKind.Return: {
      await r.recurseStatementReturn(p, data as AstStatementReturn);
      break;
    }
    case AstStatementKind.Unsafe: {
      await r.recurseStatementUnsafe(p, data as AstStatementUnsafe);
      break;
    }
    case AstStatementKind.Expression: {
      await r.recurseStatementExpression(p, data as AstStatementExpression);
      break;
    }
    case AstStatementKind.Empty: {
      await r.recurseStatementEmpty(p, data as AstStatementEmpty);
      break;
    }
  }
}
