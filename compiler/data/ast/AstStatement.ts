import { AstStatementExpression } from "./AstStatementExpression.ts";
import { AstStatementTypedef } from "./AstStatementTypedef.ts";
import { AstStatementVariable } from "./AstStatementVariable.ts";
import { AstStatementWhile } from "./AstStatementWhile.ts";

export enum AstStatementKind {
  Variable = "Variable",
  Typedef = "Typedef",
  While = "While",
  Expression = "Expression",
}

export type AstStatementData =
  | AstStatementVariable
  | AstStatementTypedef
  | AstStatementWhile
  | AstStatementExpression;

export interface AstStatement {
  kind: AstStatementKind;
  data: AstStatementData;
}
