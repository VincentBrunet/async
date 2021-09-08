import { OutputScope } from "./OutputScope.ts";

export class OutputModule {
  private scopes = new Array<OutputScope>();

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
    parts.push("t_value *(*main_module)() = module_load");
    parts.push("\n");
    return parts.join("");
  }
}
