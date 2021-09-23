import { AstStatementTypedef } from "../../../data/ast/AstStatementTypedef.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseStatementTypedef(
  scope: BrowsedScope,
  ast: AstStatementTypedef,
  next: () => void,
) {
  scope.parent?.pushTypedef(ast);
  for (const param of ast.template.params) {
    scope.pushTemplateParam(param);
  }
  next();
}
