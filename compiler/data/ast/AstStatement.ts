import { AstStatementExpression } from "./AstStatementExpression.ts";
import { AstStatementReturn } from "./AstStatementReturn.ts";
import { AstStatementTypedef } from "./AstStatementTypedef.ts";
import { AstStatementVariable } from "./AstStatementVariable.ts";
import { AstStatementWhile } from "./AstStatementWhile.ts";

export enum AstStatementKind {
  Variable = "Variable",
  Typedef = "Typedef",
  While = "While",
  Return = "Return",
  Expression = "Expression",
}

export type AstStatementData =
  | AstStatementVariable
  | AstStatementTypedef
  | AstStatementWhile
  | AstStatementReturn
  | AstStatementExpression;

export interface AstStatement {
  kind: AstStatementKind;
  data: AstStatementData;
}
