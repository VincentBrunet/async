import { OutputScope } from "./OutputScope.ts";

export class OutputModule {
  private hash: string;

  private scopes = new Array<OutputScope>();

  constructor(hash: string) {
    this.hash = hash;
  }

  getHash() {
    return this.hash;
  }

  pushScope(scope: OutputScope) {
    this.scopes.push(scope);
  }

  generateHeader(): string {
    const parts = new Array<string>();
    parts.push("#include <runtime.h>\n");
    parts.push("\n");
    for (const scope of this.scopes) {
      for (const part of scope.generateHeader()) {
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
    for (const scope of this.scopes) {
      for (const part of scope.generateSource()) {
        parts.push(part);
      }
      parts.push("\n");
    }
    parts.push("t_value *(*entry_module)() = module_load;");
    parts.push("\n");
    return parts.join("");
  }
}
