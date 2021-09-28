import { AstExpressionImport } from "../../data/ast/AstExpressionImport.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseExpressionImport<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstExpressionImport,
) {
}
