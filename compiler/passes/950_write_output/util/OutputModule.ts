import { AstModule } from "../../../data/ast/AstModule.ts";
import { OutputScope } from "./OutputScope.ts";

export class OutputModule {
  private meta: AstModule;

  private scopes = new Array<OutputScope>();

  constructor(meta: AstModule) {
    this.meta = meta;
  }

  getMeta() {
    return this.meta;
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
    return parts.join("");
  }
}
