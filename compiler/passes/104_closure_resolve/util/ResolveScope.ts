import { AstParam } from "../../../data/ast/AstFunction.ts";
import { AstVariable } from "../../../data/ast/AstVariable.ts";

export class ResolveScope {

  private names = new Set<string>();

  constructor(parent?: ResolveScope) {
    this.parent = parent;
  }

  pushName(name: string) {
    if (this.names.has(name)) {
      throw new Error("Already defined: " + name);
    }
    this.names.add(name);
  }

}
