import { Ast } from "./Ast.ts";
import { AstStatementCondition } from "./AstStatementCondition.ts";
import { AstStatementEmpty } from "./AstStatementEmpty.ts";
import { AstStatementExport } from "./AstStatementExport.ts";
import { AstStatementExpression } from "./AstStatementExpression.ts";
import { AstStatementImport } from "./AstStatementImport.ts";
import { AstStatementReturn } from "./AstStatementReturn.ts";
import { AstStatementTypedef } from "./AstStatementTypedef.ts";
import { AstStatementUnsafe } from "./AstStatementUnsafe.ts";
import { AstStatementVariable } from "./AstStatementVariable.ts";
import { AstStatementWhile } from "./AstStatementWhile.ts";

export enum AstStatementKind {
  Import = "Import",
  Export = "Export",
  Variable = "Variable",
  Typedef = "Typedef",
  While = "While",
  Condition = "Condition",
  Return = "Return",
  Unsafe = "Unsafe",
  Expression = "Expression",
  Empty = "Empty",
}

export type AstStatementData =
  | AstStatementImport
  | AstStatementExport
  | AstStatementVariable
  | AstStatementTypedef
  | AstStatementWhile
  | AstStatementCondition
  | AstStatementReturn
  | AstStatementUnsafe
  | AstStatementExpression
  | AstStatementEmpty;

export interface AstStatement extends Ast {
  kind: AstStatementKind;
  data: AstStatementData;
}
