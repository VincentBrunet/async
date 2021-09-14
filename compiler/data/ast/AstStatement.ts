import { AstVariable } from "./AstVariable.ts";
import { AstWhile } from "./AstWhile.ts";
import { AstExpression } from "./expression/AstExpression.ts";

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
