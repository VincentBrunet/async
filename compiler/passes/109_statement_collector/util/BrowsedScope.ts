import { AstStatementExport } from "../../../data/ast/AstStatementExport.ts";
import { AstStatementImport } from "../../../data/ast/AstStatementImport.ts";
import { AstStatementReturn } from "../../../data/ast/AstStatementReturn.ts";

export class BrowsedScope {
  public parent?: BrowsedScope;

  private collectorStatementImport = false;
  private collectorStatementExport = false;
  private collectorStatementReturn = false;

  private statementImports: AstStatementImport[] = [];
  private statementExports: AstStatementExport[] = [];
  private statementReturns: AstStatementReturn[] = [];

  constructor(parent?: BrowsedScope) {
    this.parent = parent;
  }

  markCollectorStatementImport() {
    this.collectorStatementImport = true;
  }
  markCollectorStatementExport() {
    this.collectorStatementExport = true;
  }
  markCollectorStatementReturn() {
    this.collectorStatementReturn = true;
  }

  getStatementImports() {
    return this.statementImports;
  }
  getStatementExports() {
    return this.statementExports;
  }
  getStatementReturns() {
    return this.statementReturns;
  }

  propagateImport(statementImport: AstStatementImport) {
    if (this.collectorStatementImport) {
      this.statementImports.push(statementImport);
      return;
    }
    this.parent?.propagateImport(statementImport);
  }
  propagateExport(statementExport: AstStatementExport) {
    if (this.collectorStatementExport) {
      this.statementExports.push(statementExport);
      return;
    }
    this.parent?.propagateExport(statementExport);
  }
  propagateReturn(statementReturn: AstStatementReturn) {
    if (this.collectorStatementReturn) {
      this.statementReturns.push(statementReturn);
      return;
    }
    this.parent?.propagateReturn(statementReturn);
  }
}
