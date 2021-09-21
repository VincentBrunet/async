import { AstStatementTypedef } from "./AstStatementTypedef.ts";

export enum AstResolvedShorthandKind {
  Typedef = "Typedef",
}

export type AstResolvedShorthandData = AstStatementTypedef;

export interface AstResolvedShorthand {
  kind: AstResolvedShorthandKind;
  data: AstResolvedShorthandData;
}
