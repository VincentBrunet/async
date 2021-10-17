import { AstModule } from "../../../data/ast/AstModule.ts";
import { OutputBlock } from "../../../data/output/OutputBlock.ts";
import { OutputModule } from "../../../data/output/OutputModule.ts";
import { OutputStatement } from "../../../data/output/OutputStatement.ts";
import { Stack } from "../../../lib/core/data/Stack.ts";

export class Transpiler {
  private currentModule: OutputModule;
  private currentStatement?: OutputStatement;

  private stackBlock = new Stack<OutputBlock>();

  constructor(ast: AstModule) {
    this.currentModule = {
      sourceAst: ast,
      includes: [],
      functions: [],
    };
  }

  getOutput() {
    return this.currentModule;
  }

  pushInclude(path: string) {
    this.currentModule.includes.push({
      path: path,
    });
  }

  pushFunction(type: string, name: string, params: string[]) {
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
    this.currentModule.functions.push(outputFunction);
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

  pushPart(part: string) {
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
