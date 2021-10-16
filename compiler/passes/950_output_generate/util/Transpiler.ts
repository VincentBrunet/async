import { AstModule } from "../../../data/ast/AstModule.ts";
import { OutputBlock } from "../../../data/output/OutputBlock.ts";
import { OutputFunction } from "../../../data/output/OutputFunction.ts";
import { OutputModule } from "../../../data/output/OutputModule.ts";
import { OutputStatement } from "../../../data/output/OutputStatement.ts";

export class Transpiler {
  private currentModule: OutputModule;
  private currentBlock?: OutputBlock;
  private currentFunction?: OutputFunction;
  private currentStatement?: OutputStatement;

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
    this.currentBlock = {
      statements: [],
    };
    this.currentFunction = {
      type: type,
      name: name,
      params: params,
      block: this.currentBlock,
    };
    this.currentModule.functions.push(this.currentFunction);
  }
  popFunction() {
  }

  pushStatement(parts: Array<string>) {
    this.currentStatement = {
      parts: parts,
    };
    this.currentBlock?.statements?.push(this.currentStatement);
  }

  pushBlock() {
  }
  popBlock() {
  }

  pushPart(part: string) {
    this.currentStatement?.parts?.push(part);
  }
}
