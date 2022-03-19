import { AstStatement, AstStatementKind } from '../../data/ast/AstStatement.ts';
import { AstStatementBlock } from '../../data/ast/AstStatementBlock.ts';
import { AstStatementCondition } from '../../data/ast/AstStatementCondition.ts';
import { AstStatementEmpty } from '../../data/ast/AstStatementEmpty.ts';
import { AstStatementExport } from '../../data/ast/AstStatementExport.ts';
import { AstStatementExpression } from '../../data/ast/AstStatementExpression.ts';
import { AstStatementImport } from '../../data/ast/AstStatementImport.ts';
import { AstStatementReturn } from '../../data/ast/AstStatementReturn.ts';
import { AstStatementTypedef } from '../../data/ast/AstStatementTypedef.ts';
import { AstStatementUnsafe } from '../../data/ast/AstStatementUnsafe.ts';
import { AstStatementVariable } from '../../data/ast/AstStatementVariable.ts';
import { AstStatementWhile } from '../../data/ast/AstStatementWhile.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseStatement(r: RecursorPass, ast: AstStatement) {
  const kind = ast.kind;
  const data = ast.data;
  switch (kind) {
    case AstStatementKind.Import: {
      r.recurseStatementImport(data as AstStatementImport);
      break;
    }
    case AstStatementKind.Export: {
      r.recurseStatementExport(data as AstStatementExport);
      break;
    }
    case AstStatementKind.Variable: {
      r.recurseStatementVariable(data as AstStatementVariable);
      break;
    }
    case AstStatementKind.Typedef: {
      r.recurseStatementTypedef(data as AstStatementTypedef);
      break;
    }
    case AstStatementKind.Block: {
      r.recurseStatementBlock(data as AstStatementBlock);
      break;
    }
    case AstStatementKind.While: {
      r.recurseStatementWhile(data as AstStatementWhile);
      break;
    }
    case AstStatementKind.Condition: {
      r.recurseStatementCondition(data as AstStatementCondition);
      break;
    }
    case AstStatementKind.Return: {
      r.recurseStatementReturn(data as AstStatementReturn);
      break;
    }
    case AstStatementKind.Unsafe: {
      r.recurseStatementUnsafe(data as AstStatementUnsafe);
      break;
    }
    case AstStatementKind.Expression: {
      r.recurseStatementExpression(data as AstStatementExpression);
      break;
    }
    case AstStatementKind.Empty: {
      r.recurseStatementEmpty(data as AstStatementEmpty);
      break;
    }
  }
}
