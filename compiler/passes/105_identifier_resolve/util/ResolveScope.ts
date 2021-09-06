import { AstFunctionParam } from "../../../data/ast/AstFunction.ts";
import { AstVariable } from "../../../data/ast/AstVariable.ts";
import { ResolveDeclaration } from "./ResolveDeclaration.ts";

export class ResolveScope {
  private closure: boolean;
  private parent?: ResolveScope;

  private declarations = new Map<string, ResolveDeclaration>();

  constructor(closure: boolean, parent?: ResolveScope) {
    this.closure = closure;
    this.parent = parent;
  }

  pushVariable(variable: AstVariable) {
    const name = variable.name;
    const type = variable.type;
    this.pushDeclaration(name, {
      name: name,
      type: type,
      variable: variable,
    });
  }

  pushFunctionParam(param: AstFunctionParam) {
    const name = param.name;
    const type = param.type;
    if (name) {
      this.pushDeclaration(name, {
        name: name,
        type: type,
        param: param,
      });
    }
  }

  pushDeclaration(name: string, declaration: ResolveDeclaration) {
    if (this.declarations.get(name)) {
      throw new Error("Already defined: " + name);
    }
    this.declarations.set(name, declaration);
  }

  findDeclaration(name: string): ResolveDeclaration | undefined {
    return this.declarations.get(name);
  }

  getParent(): ResolveScope | undefined {
    return this.parent;
  }

  needClosure() {
    return this.closure;
  }
}
