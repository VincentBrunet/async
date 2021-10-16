import { AstStatementExport } from "../../../data/ast/AstStatementExport.ts";
import { AstStatementImport } from "../../../data/ast/AstStatementImport.ts";
import { AstStatementReturn } from "../../../data/ast/AstStatementReturn.ts";
import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";

export class Scope {
  public parent?: Scope;

  private collectorStatementImport = false;
  private collectorStatementExport = false;
  private collectorStatementReturn = false;
  private collectorStatementVariable = false;

  private statementImports = new Array<AstStatementImport>();
  private statementExports = new Array<AstStatementExport>();
  private statementReturns = new Array<AstStatementReturn>();
  private statementVariables = new Array<AstStatementVariable>();

  constructor(parent?: Scope) {
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
  markCollectorStatementVariable() {
    this.collectorStatementVariable = true;
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
  getStatementVariables() {
    return this.statementVariables;
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
  propagateVariable(statementVariable: AstStatementVariable) {
    if (this.collectorStatementVariable) {
      this.statementVariables.push(statementVariable);
      return;
    }
    this.parent?.propagateVariable(statementVariable);
  }
}
