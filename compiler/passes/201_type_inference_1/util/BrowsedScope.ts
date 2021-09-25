import { AstExpressionFunction } from "../../../data/ast/AstExpressionFunction.ts";
import { AstStatementReturn } from "../../../data/ast/AstStatementReturn.ts";

export class BrowsedScope {
  public parent?: BrowsedScope;

  private expressionFunction?: AstExpressionFunction;

  private statementReturns: AstStatementReturn[] = [];

  constructor(parent?: BrowsedScope) {
    this.parent = parent;
  }

  setFunction(expressionFunction: AstExpressionFunction) {
    this.expressionFunction = expressionFunction;
  }

  getStatementReturns() {
    return this.statementReturns;
  }

  propagateReturn(statementReturn: AstStatementReturn) {
    if (this.expressionFunction) {
      this.statementReturns.push(statementReturn);
      return;
    }
    this.parent?.propagateReturn(statementReturn);
  }

  /*
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
  */
}
