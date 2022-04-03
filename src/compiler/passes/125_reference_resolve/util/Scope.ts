import { AstAnnotationTemplateParam } from '../../../data/ast/AstAnnotationTemplate.ts';
import { AstExpressionFunctionParam } from '../../../data/ast/AstExpressionFunction.ts';
import { AstReferenceClosure } from '../../../data/ast/AstReferenceClosure.ts';
import { AstReferenceType, AstReferenceTypeKind } from '../../../data/ast/AstReferenceType.ts';
import { AstReferenceValue, AstReferenceValueKind } from '../../../data/ast/AstReferenceValue.ts';
import { AstStatementImportSlot } from '../../../data/ast/AstStatementImport.ts';
import { AstStatementTypedef } from '../../../data/ast/AstStatementTypedef.ts';
import { AstStatementVariable } from '../../../data/ast/AstStatementVariable.ts';
import { ensure } from '../../../passes/errors/ensure.ts';

export class Scope {
  public parent?: Scope;

  private referenceTypes = new Map<string, AstReferenceType>();
  private referenceValues = new Map<string, AstReferenceValue>();

  constructor(parent?: Scope) {
    this.parent = parent;
  }

  pushAnnotationTemplateParam(template: AstAnnotationTemplateParam): void {
    this.pushReferenceType(template.name, {
      kind: AstReferenceTypeKind.AnnotationTemplateParam,
      data: template,
    });
  }

  pushStatementTypedef(typedef: AstStatementTypedef): void {
    const name = typedef.name;
    this.pushReferenceType(name, {
      kind: AstReferenceTypeKind.StatementTypedef,
      data: typedef,
    });
  }

  pushStatementImportSlot(statementImportSlot: AstStatementImportSlot) {
    const name = statementImportSlot.name;
    this.pushReferenceType(name, {
      kind: AstReferenceTypeKind.StatementImportSlot,
      data: statementImportSlot,
    });
    this.pushReferenceValue(name, {
      kind: AstReferenceValueKind.StatementImportSlot,
      data: statementImportSlot,
    });
  }

  pushStatementVariable(statementVariable: AstStatementVariable) {
    const name = statementVariable.name;
    this.pushReferenceValue(name, {
      kind: AstReferenceValueKind.StatementVariable,
      data: statementVariable,
    });
  }

  pushExpressionFunctionParam(expressionFunctionParam: AstExpressionFunctionParam) {
    const name = ensure(expressionFunctionParam.name);
    this.pushReferenceValue(name, {
      kind: AstReferenceValueKind.ExpressionFunctionParam,
      data: expressionFunctionParam,
    });
  }

  pushReferenceClosure(resolvedClosure: AstReferenceClosure) {
    const name = resolvedClosure.name;
    this.pushReferenceValue(name, {
      kind: AstReferenceValueKind.ReferenceClosure,
      data: resolvedClosure,
    });
  }

  private pushReferenceType(name: string, referenceType: AstReferenceType) {
    if (this.referenceTypes.get(name)) {
      throw new Error(
        'Already defined type: ' + (this.referenceTypes.get(name)) +
          ' + ' + (referenceType.data.name),
      );
    }
    this.referenceTypes.set(name, referenceType);
  }

  private pushReferenceValue(name: string, reference: AstReferenceValue) {
    if (this.referenceValues.get(name)) {
      throw new Error(
        'Already defined value: ' + (this.referenceValues.get(name)) +
          ' + ' + (reference.data.name),
      );
    }
    this.referenceValues.set(name, reference);
  }

  findReferenceType(name: string): AstReferenceType | undefined {
    const reference = this.referenceTypes.get(name);
    if (reference) {
      return reference;
    }
    return this.parent?.findReferenceType(name);
  }

  findReferenceValue(name: string): AstReferenceValue | undefined {
    const reference = this.referenceValues.get(name);
    if (reference) {
      return reference;
    }
    return this.parent?.findReferenceValue(name);
  }
}
