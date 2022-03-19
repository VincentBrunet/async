import { Ast } from "./Ast.ts";

export interface AstStatementUnsafe extends Ast {
  content: string;
}
