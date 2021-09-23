import { AstAnnotationTemplateParam } from "../../../data/ast/AstAnnotationTemplate.ts";
import {
  AstResolvedShorthand,
  AstResolvedShorthandKind,
} from "../../../data/ast/AstResolvedShorthand.ts";
import { AstStatementTypedef } from "../../../data/ast/AstStatementTypedef.ts";

export class BrowsedScope {
  public parent?: BrowsedScope;

  private shorthands = new Map<string, AstResolvedShorthand>();

  constructor(parent?: BrowsedScope) {
    this.parent = parent;
  }

  pushTypedef(variable: AstStatementTypedef) {
    const name = variable.name;
    this.pushShorthand(name, {
      kind: AstResolvedShorthandKind.Typedef,
      data: variable,
    });
  }

  pushTemplateParam(template: AstAnnotationTemplateParam) {
    this.pushShorthand(template.name, {
      kind: AstResolvedShorthandKind.TemplateParam,
      data: template,
    });
  }

  private pushShorthand(name: string, reference: AstResolvedShorthand) {
    if (this.shorthands.get(name)) {
      throw new Error(
        "Already defined: " + (this.shorthands.get(name)) +
          " + " + (reference.data.name),
      );
    }
    this.shorthands.set(name, reference);
  }

  findShorthand(name: string): AstResolvedShorthand | undefined {
    const reference = this.shorthands.get(name);
    if (reference) {
      return reference;
    }
    return this.parent?.findShorthand(name);
  }
}
