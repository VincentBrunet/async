import { MapArray } from "../../../lib/core/data/MapArray.ts";
import { OutputOrder } from "./OutputOrder.ts";
import { OutputStatement } from "./OutputStatement.ts";

export class OutputScope {
  private name: string;
  private params = new Array<string>();
  private statements = new MapArray<OutputOrder, OutputStatement>();

  constructor(
    name: string,
  ) {
    this.name = name;
  }

  pushParam(param: string) {
    this.params.push(param);
  }

  pushStatement(order: OutputOrder, statement: OutputStatement) {
    this.statements.push(order, statement);
  }

  generateHeader(): Array<string> {
    const parts = new Array<string>();
    parts.push("t_value *");
    parts.push(this.name);
    parts.push("(");
    parts.push(this.params.join(", "));
    parts.push(")");
    parts.push(";\n");
    return parts;
  }

  generateSource(): Array<string> {
    const parts = new Array<string>();

    parts.push("t_value *");
    parts.push(this.name);
    parts.push("(");
    parts.push(this.params.join(", "));
    parts.push(")");
    parts.push(" {\n");

    const keys = [...this.statements.keys()];
    keys.sort((a, b) => {
      return a - b;
    });

    for (const key of keys) {
      const statements = this.statements.list(key);
      if (statements) {
        parts.push("  ");
        parts.push("// ");
        parts.push(OutputOrder[key]);
        parts.push("\n");
        for (const statement of statements) {
          parts.push("  ");
          for (const part of statement.generateParts()) {
            parts.push(part);
          }
          if (!statement.isSpecial()) {
            parts.push(";");
          }
          parts.push("\n");
        }
      }
    }

    parts.push("}\n");
    return parts;
  }
}
