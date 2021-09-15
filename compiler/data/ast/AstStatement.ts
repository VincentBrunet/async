import { AstExpression } from "./AstExpression.ts";
import { AstVariable } from "./AstVariable.ts";
import { AstWhile } from "./AstWhile.ts";

export enum AstStatementKind {
  Variable = "Variable",
  While = "While",
  Expression = "Expression",
}

export type AstStatementData =
  | AstVariable
  | AstWhile
  | AstExpression;

export interface AstStatement {
  kind: AstStatementKind;
  data: AstStatementData;
}
