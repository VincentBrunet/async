import { OutputStatement } from "./OutputStatement.ts";

export class OutputScope {
  private output: string;
  private name: string;
  private params = new Array<string>();
  private statements = new Array<OutputStatement>();

  constructor(
    output: string,
    name: string,
  ) {
    this.output = output;
    this.name = name;
  }

  pushParam(param: string) {
    this.params.push(param);
  }

  pushStatement(statement: OutputStatement) {
    this.statements.push(statement);
  }

  generateHeader(): Array<string> {
    const parts = new Array<string>();
    parts.push(this.output);
    parts.push(this.name);
    parts.push("(");
    parts.push(this.params.join(", "));
    parts.push(")");
    parts.push(";\n");
    return parts;
  }

  generateSource(): Array<string> {
    const parts = new Array<string>();

    parts.push(this.output);
    parts.push(this.name);
    parts.push("(");
    parts.push(this.params.join(", "));
    parts.push(")");
    parts.push(" {\n");

    for (const statement of this.statements) {
      parts.push("  ");
      for (const part of statement.generateParts()) {
        parts.push(part);
      }
      if (!statement.isSpecial()) {
        parts.push(";");
      }
      parts.push("\n");
    }

    parts.push("}\n");
    return parts;
  }
}
