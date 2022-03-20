import { AstModule } from '../../../data/ast/AstModule.ts';
import { OutputBlock } from '../../../data/output/OutputBlock.ts';
import { OutputFunctionParam } from '../../../data/output/OutputFunction.ts';
import { OutputModule } from '../../../data/output/OutputModule.ts';
import { OutputStatement } from '../../../data/output/OutputStatement.ts';
import { OutputStructField } from '../../../data/output/OutputStructs.ts';
import { UnitModule } from '../../../data/unit/UnitModule.ts';
import { Stack } from '../../../lib/core/data/Stack.ts';

export class Transpiler {
  private currentUnit: UnitModule;

  private currentOutput: OutputModule;
  private currentStatement?: OutputStatement;

  private stackBlock = new Stack<OutputBlock>();

  constructor(unit: UnitModule) {
    this.currentUnit = unit;
    this.currentOutput = {
      includes: [],
      functions: [],
      structs: [],
    };
  }

  getUnit() {
    return this.currentUnit;
  }

  getOutput() {
    return this.currentOutput;
  }

  pushInclude(path: string) {
    this.currentOutput.includes.push({
      path: path,
    });
  }

  pushStruct(name: string, fields: OutputStructField[]) {
    this.currentOutput.structs.push({
      name: name,
      fields: fields,
    });
  }

  pushFunction(type: string, name: string, params: OutputFunctionParam[]) {
    const outputBlock = {
      statements: [],
    };
    const outputFunction = {
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

  popBlock() {
    this.stackBlock.pop();
    this.resetCurrentStatement();
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

  private resetCurrentStatement() {
    this.currentStatement = undefined;
    const statements = this.stackBlock.peek()?.statements;
    if (statements) {
      this.currentStatement = statements[statements.length - 1];
    }
  }
}
