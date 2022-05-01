import { OutputBlock } from '../../../data/output/OutputBlock.ts';
import { OutputFunctionParam } from '../../../data/output/OutputFunction.ts';
import { OutputModule } from '../../../data/output/OutputModule.ts';
import { OutputStatement } from '../../../data/output/OutputStatement.ts';
import { OutputStructField } from '../../../data/output/OutputStructs.ts';
import { Stack } from '../../../lib/core/data/Stack.ts';

export class Transpiler {
  private currentOutput: OutputModule;
  private currentStatement?: OutputStatement;

  private stackBlock = new Stack<OutputBlock>();

  constructor() {
    this.currentOutput = {
      includes: [],
      functions: [],
      structs: [],
      statics: [],
    };
  }

  getOutput() {
    return this.currentOutput;
  }

  pushInclude(path: string) {
    this.currentOutput.includes.push({
      path: path,
    });
  }

  pushStatic(type: string, name: string, value: string) {
    this.currentOutput.statics.push({
      type: type,
      name: name,
      value: value,
    });
  }

  pushStruct(exported: boolean, name: string, fields: OutputStructField[], inherit?: string) {
    this.currentOutput.structs.push({
      exported: exported,
      name: name,
      inherit: inherit,
      fields: fields,
    });
  }

  pushFunction(exported: boolean, type: string, name: string, params: OutputFunctionParam[]) {
    const outputBlock = {
      statements: [],
    };
    const outputFunction = {
      exported: exported,
      type: type,
      name: name,
      params: params,
      block: outputBlock,
    };
    this.stackBlock.push(outputBlock);
    this.currentOutput.functions.push(outputFunction);
  }

  popFunction() {
    this.stackBlock.pop();
    this.resetCurrentStatement();
  }

  pushBlock() {
    const outputBlock = {
      statements: [],
    };
    this.stackBlock.push(outputBlock);
    if (this.currentStatement) {
      this.currentStatement.inner = outputBlock;
    }
  }

  popBlock(closed?: boolean) {
    this.stackBlock.pop();
    this.resetCurrentStatement(closed);
  }

  pushStatement(parts: Array<string>) {
    this.currentStatement = {
      parts: parts,
    };
    this.stackBlock.peek()?.statements?.push(this.currentStatement);
  }

  pushStatementPart(part: string) {
    this.currentStatement?.parts?.push(part);
  }

  private resetCurrentStatement(closed?: boolean) {
    this.currentStatement = undefined;
    const statements = this.stackBlock.peek()?.statements;
    if (statements) {
      this.currentStatement = statements[statements.length - 1];
      if (this.currentStatement) {
        this.currentStatement.closed = closed;
      }
    }
  }
}
