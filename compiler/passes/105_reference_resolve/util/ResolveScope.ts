import { AstFunctionParam } from "../../../data/ast/AstFunction.ts";
import { AstVariable } from "../../../data/ast/AstVariable.ts";

export class ResolveScope {
  private closure: boolean;
  private parent?: ResolveScope;

  private references = new Map<string, AstReference>();

  constructor(closure: boolean, parent?: ResolveScope) {
    this.closure = closure;
    this.parent = parent;
  }

  pushVariable(variable: AstVariable) {
    const name = variable.name;
    const type = variable.type;
    this.pushReference(name, {
      name: name,
      type: type,
      variable: variable,
    });
  }

  pushFunctionParam(param: AstFunctionParam) {
    const name = param.name;
    const type = param.type;
    if (name) {
      this.pushReference(name, {
        name: name,
        type: type,
        param: param,
      });
    }
  }

  pushReference(name: string, reference: AstReference) {
    if (this.references.get(name)) {
      throw new Error("Already defined: " + name);
    }
    this.references.set(name, reference);
  }

  findReference(name: string): AstReference | undefined {
    return this.references.get(name);
  }

  getParent(): ResolveScope | undefined {
    return this.parent;
  }

  needClosure() {
    return this.closure;
  }
}
