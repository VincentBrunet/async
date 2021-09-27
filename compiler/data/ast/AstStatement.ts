import { Ast } from "./Ast.ts";
import { AstStatementCondition } from "./AstStatementCondition.ts";
import { AstStatementExpression } from "./AstStatementExpression.ts";
import { AstStatementReturn } from "./AstStatementReturn.ts";
import { AstStatementTypedef } from "./AstStatementTypedef.ts";
import { AstStatementUnsafe } from "./AstStatementUnsafe.ts";
import { AstStatementVariable } from "./AstStatementVariable.ts";
import { AstStatementWhile } from "./AstStatementWhile.ts";

export enum AstStatementKind {
  Variable = "Variable",
  Typedef = "Typedef",
  While = "While",
  Condition = "Condition",
  Return = "Return",
  Unsafe = "Unsafe",
  Expression = "Expression",
}

export type AstStatementData =
  | AstStatementVariable
  | AstStatementTypedef
  | AstStatementWhile
  | AstStatementCondition
  | AstStatementReturn
  | AstStatementUnsafe
  | AstStatementExpression;

export interface AstStatement extends Ast {
  kind: AstStatementKind;
  data: AstStatementData;
}
