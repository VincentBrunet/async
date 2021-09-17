import { AstStatementExpression } from "./AstStatementExpression.ts";
import { AstStatementVariable } from "./AstStatementVariable.ts";
import { AstStatementWhile } from "./AstStatementWhile.ts";

export enum AstStatementKind {
  Variable = "Variable",
  While = "While",
  Expression = "Expression",
}

export type AstStatementData =
  | AstStatementVariable
  | AstStatementWhile
  | AstStatementExpression;

export interface AstStatement {
  kind: AstStatementKind;
  data: AstStatementData;
}
