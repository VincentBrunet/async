import { OutputOrder } from "./OutputOrder.ts";
import { OutputStatement } from "./OutputStatement.ts";
import { OutputVariable } from "./OutputVariable.ts";
import { MapArray } from "../../../utils/data/MapArray.ts";

export class OutputFunc {
  private name: string;
  private variables = new Array<OutputVariable>();
  private statements = new MapArray<OutputOrder, OutputStatement>();

  constructor(
    name: string,
  ) {
    this.name = name;
  }

  pushVariable(variable: OutputVariable) {
    this.variables.push(variable);
  }

  getVariables(): Array<OutputVariable> {
    return this.variables;
  }

  pushStatement(order: OutputOrder, statement: OutputStatement) {
    this.statements.push(order, statement);
  }

  generateHeader(): string[] {
    const parts: string[] = [];
    parts.push("t_value *");
    parts.push(this.name);
    parts.push("()");
    parts.push(";\n");
    return parts;
  }

  generateSource(): string[] {
    const parts: string[] = [];

    parts.push("t_value *");
    parts.push(this.name);
    parts.push("()");
    parts.push(" {\n");

    const keys = [...this.statements.keys()];
    keys.sort((a, b) => {
      return a - b;
    });

    for (const key of keys) {
      const statements = this.statements.list(key);
      if (statements) {
        for (const statement of statements) {
          parts.push("  ");
          for (const part of statement.generateParts()) {
            parts.push(part);
          }
          parts.push(";\n");
        }
      }
    }

    parts.push("}\n");
    return parts;
  }
}
