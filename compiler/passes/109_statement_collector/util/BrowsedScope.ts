import { AstStatementReturn } from "../../../data/ast/AstStatementReturn.ts";

export class BrowsedScope {
  public parent?: BrowsedScope;

  private collectorStatementReturn = false;

  private statementReturns: AstStatementReturn[] = [];

  constructor(parent?: BrowsedScope) {
    this.parent = parent;
  }

  markCollectorStatementReturn() {
    this.collectorStatementReturn = true;
  }

  getStatementReturns() {
    return this.statementReturns;
  }

  propagateReturn(statementReturn: AstStatementReturn) {
    if (this.collectorStatementReturn) {
      this.statementReturns.push(statementReturn);
      return;
    }
    this.parent?.propagateReturn(statementReturn);
  }
}
