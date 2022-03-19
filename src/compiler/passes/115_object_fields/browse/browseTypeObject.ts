import { AstTypeObject } from "../../../data/ast/AstTypeObject.ts";

export function browseTypeObject(
  next: () => void,
  ast: AstTypeObject,
) {
  ast.resolvedFields = new Map();
  for (const field of ast.fields) {
    const name = field.name;
    if (ast.resolvedFields.has(name)) {
      // TODO - throw but continue?
      throw Error("Duplicate field: " + name);
    }
    ast.resolvedFields.set(name, field);
  }
  next();
}
