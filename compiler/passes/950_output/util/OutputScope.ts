import { OutputOrder } from "./OutputOrder.ts";
import { OutputStatement } from "./OutputStatement.ts";
import { MapArray } from "../../../util/data/MapArray.ts";
import { AstVariable } from "../../../data/ast/AstVariable.ts";

export class OutputScope {
  private name: string;
  private params = new Array<string>();
  private variables = new Array<AstVariable>();
  private statements = new MapArray<OutputOrder, OutputStatement>();

  constructor(
    name: string,
  ) {
    this.name = name;
  }

  pushParam(param: string) {
    this.params.push(param);
  }

  pushVariable(variable: AstVariable) {
    this.variables.push(variable);
  }

  pushStatement(order: OutputOrder, statement: OutputStatement) {
    this.statements.push(order, statement);
  }

  readVariables(): Array<AstVariable> {
    this.variables.sort((a: AstVariable, b: AstVariable) => {
      if (a.hash < b.hash) {
        return -1;
      } else if (a.hash > b.hash) {
        return 1;
      } else {
        return 0;
      }
    });
    return this.variables;
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
          parts.push(";\n");
        }
      }
    }

    parts.push("}\n");
    return parts;
  }
}