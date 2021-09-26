import { Ast } from "./Ast.ts";
import { AstStatementExpression } from "./AstStatementExpression.ts";
import { AstStatementReturn } from "./AstStatementReturn.ts";
import { AstStatementTypedef } from "./AstStatementTypedef.ts";
import { AstStatementVariable } from "./AstStatementVariable.ts";
import { AstStatementWhile } from "./AstStatementWhile.ts";
import { AstStatementCondition } from "./AstStatementCondition.ts";

export enum AstStatementKind {
  Variable = "Variable",
  Typedef = "Typedef",
  While = "While",
  Condition = "Condition",
  Return = "Return",
  Expression = "Expression",
}

export type AstStatementData =
  | AstStatementVariable
  | AstStatementTypedef
  | AstStatementWhile
  | AstStatementCondition
  | AstStatementReturn
  | AstStatementExpression;

export interface AstStatement extends Ast {
  kind: AstStatementKind;
  data: AstStatementData;
}
