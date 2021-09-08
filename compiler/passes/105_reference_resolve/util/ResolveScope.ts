import { AstParam } from "../../../data/ast/AstParam.ts";
import { AstVariable } from "../../../data/ast/AstVariable.ts";

export class ResolveScope {

  private parent?: ResolveScope;

  private references = new Map<string, AstReference>();

  constructor(parent?: ResolveScope) {
    this.parent = parent;
  }

  pushVariable(variable: AstVariable) {
    const name = variable.name;
    this.pushReference(name, {
      name: name,
      kind: AstReferenceType.Variable,
      data: variable,
    });
  }

  pushClosure(closure: AstClosure) {
    const name = closure.name;
    this.pushReference(name, {
      name: name,
      kind: AstReferenceType.Closure,
      data: closure,
    })
  }

  pushParam(param: AstParam) {
    const name = param.name;
    if (!name) {
      return;
    }
    this.pushReference(name, {
      name: name,
      kind: AstReferenceType.Param,
      data: param,
    });
  }

  private pushReference(name: string, reference: AstReference) {
    if (this.references.get(name)) {
      throw new Error("Already defined: " + name);
    }
    this.references.set(name, reference);
  }

  findReference(name: string): AstReference | undefined {
    const reference = this.references.get(name);
    if (reference) {
      return reference;
    }
    return this.parent?.findReference(name);
  }

}
