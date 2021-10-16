import { AstAnnotationTemplateParam } from "../../../data/ast/AstAnnotationTemplate.ts";
import {
  AstResolvedShorthand,
  AstResolvedShorthandKind,
} from "../../../data/ast/AstResolvedShorthand.ts";
import { AstStatementImportSlot } from "../../../data/ast/AstStatementImport.ts";
import { AstStatementTypedef } from "../../../data/ast/AstStatementTypedef.ts";

export class Scope {
  public parent?: Scope;

  private shorthands = new Map<string, AstResolvedShorthand>();

  constructor(parent?: Scope) {
    this.parent = parent;
  }

  pushTypedef(variable: AstStatementTypedef) {
    const name = variable.name;
    this.pushShorthand(name, {
      kind: AstResolvedShorthandKind.Typedef,
      data: variable,
    });
  }

  pushImportSlot(slot: AstStatementImportSlot) {
    this.pushShorthand(slot.name, {
      kind: AstResolvedShorthandKind.ImportSlot,
      data: slot,
    });
  }

  pushTemplateParam(template: AstAnnotationTemplateParam) {
    this.pushShorthand(template.name, {
      kind: AstResolvedShorthandKind.TemplateParam,
      data: template,
    });
  }

  private pushShorthand(name: string, shorthand: AstResolvedShorthand) {
    if (this.shorthands.get(name)) {
      throw new Error(
        "Already defined: " + (this.shorthands.get(name)) +
          " + " + (shorthand.data.name),
      );
    }
    this.shorthands.set(name, shorthand);
  }

  findShorthand(name: string): AstResolvedShorthand | undefined {
    const shorthand = this.shorthands.get(name);
    if (shorthand) {
      return shorthand;
    }
    return this.parent?.findShorthand(name);
  }
}
