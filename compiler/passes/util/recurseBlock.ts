import { AstBlock } from "../../data/ast/AstBlock.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseBlock<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstBlock,
) {
  for (const statement of ast.statements) {
    r.recurseStatement(r, p, statement);
  }
}
