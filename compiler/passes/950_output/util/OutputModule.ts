import { OutputBlock } from "./OutputBlock.ts";

export class OutputModule {
  private blocks: OutputBlock[] = [];

  pushBlock(block: OutputBlock) {
    this.blocks.push(block);
  }

  generateHeader(): string {
    const parts: string[] = [];
    parts.push('#include "runtime.h"\n');
    parts.push("\n");
    for (const block of this.blocks) {
      for (const part of block.generateHeader()) {
        parts.push(part);
      }
      parts.push("\n");
    }
    return parts.join("");
  }
  generateSource(): string {
    const parts: string[] = [];
    parts.push('#include "runtime.h"\n');
    parts.push("\n");
    for (const block of this.blocks) {
      for (const part of block.generateSource()) {
        parts.push(part);
      }
      parts.push("\n");
    }
    return parts.join("");
  }
}
