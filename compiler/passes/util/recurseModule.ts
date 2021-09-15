import { AstModule } from "../../data/ast/AstModule.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseModule<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstModule,
) {
  for (const statement of ast.statements) {
    r.recurseStatement(r, p, statement);
  }
}
