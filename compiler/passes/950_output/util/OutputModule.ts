import { OutputFunc } from "./OutputFunc.ts";

export class OutputModule {
  private funcs = new Array<OutputFunc>();

  pushFunc(func: OutputFunc) {
    this.funcs.push(func);
  }

  generateHeader(): string {
    const parts = new Array<string>();
    parts.push("#include <runtime.h>\n");
    parts.push("\n");
    for (const func of this.funcs) {
      for (const part of func.generateHeader()) {
        parts.push(part);
      }
      parts.push("\n");
    }
    return parts.join("");
  }
  generateSource(): string {
    const parts = new Array<string>();
    parts.push("#include <runtime.h>\n");
    parts.push("\n");
    for (const func of this.funcs) {
      for (const part of func.generateSource()) {
        parts.push(part);
      }
      parts.push("\n");
    }
    parts.push("\n");
    parts.push("t_value *(*main_module)() = module_load");
    parts.push("\n");
    return parts.join("");
  }
}
