import { AstStatementReturn } from "../../../data/ast/AstStatementReturn.ts";
import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";

export class BrowsedScope {
  public parent?: BrowsedScope;

  private collectorStatementVariable = false;
  private collectorStatementReturn = false;

  private statementVariables: AstStatementVariable[] = [];
  private statementReturns: AstStatementReturn[] = [];

  constructor(parent?: BrowsedScope) {
    this.parent = parent;
  }

  markCollectorStatementVariable() {
    this.collectorStatementVariable = true;
  }

  markCollectorStatementReturn() {
    this.collectorStatementReturn = true;
  }

  getStatementVariables() {
    return this.statementVariables;
  }

  getStatementReturns() {
    return this.statementReturns;
  }

  propagateVariable(statementVariable: AstStatementVariable) {
    if (this.collectorStatementVariable) {
      this.statementVariables.push(statementVariable);
      return;
    }
    this.parent?.propagateVariable(statementVariable);
  }

  propagateReturn(statementReturn: AstStatementReturn) {
    if (this.collectorStatementReturn) {
      this.statementReturns.push(statementReturn);
      return;
    }
    this.parent?.propagateReturn(statementReturn);
  }
}
