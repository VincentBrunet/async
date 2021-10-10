import { AstModule } from "../../../data/ast/AstModule.ts";
import { OutputScope } from "./OutputScope.ts";

export class OutputModule {
  private meta: AstModule;

  private dependencies = new Array<string>();
  private scopes = new Array<OutputScope>();

  constructor(meta: AstModule) {
    this.meta = meta;
  }

  getMeta() {
    return this.meta;
  }
  getHash() {
    return this.meta.meta.meta.hash;
  }

  pushDependency(hash: string) {
    this.dependencies.push(hash);
  }

  pushScope(scope: OutputScope) {
    this.scopes.push(scope);
  }

  generateDocs(): string {
    return [
      "// ",
      this.meta.meta.meta.url.href,
      "\n",
    ].join("");
  }

  generateIncludes(): string {
    const parts = new Array<string>();
    for (const dependency of this.dependencies) {
      parts.push("#include");
      parts.push(" ");
      parts.push("<");
      parts.push("../");
      parts.push(dependency);
      parts.push("/output.h");
      parts.push(">");
      parts.push("\n");
    }
    return parts.join("");
  }

  generateHeader(): string {
    const define = "__" + this.getHash() + "_H";
    const parts = new Array<string>();
    parts.push(this.generateDocs());
    parts.push("\n");
    parts.push("#ifndef ");
    parts.push(define);
    parts.push("\n");
    parts.push("#define ");
    parts.push(define);
    parts.push("\n");
    parts.push("\n");
    parts.push("#include <runtime.h>\n");
    parts.push("\n");
    parts.push(this.generateIncludes());
    parts.push("\n");
    for (const scope of this.scopes) {
      for (const part of scope.generateHeader()) {
        parts.push(part);
      }
      parts.push("\n");
    }
    parts.push("#endif\n");
    return parts.join("");
  }

  generateSource(): string {
    const parts = new Array<string>();
    parts.push(this.generateDocs());
    parts.push("\n");
    parts.push("#include <runtime.h>\n");
    parts.push("\n");
    parts.push(this.generateIncludes());
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
