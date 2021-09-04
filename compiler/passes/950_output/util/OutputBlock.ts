import { OutputStatement } from "./OutputStatement.ts";
import { OutputVariable } from "./OutputVariable.ts";

export enum OutputBlockType {
  Module,
  Object,
  Function,
}

export class OutputBlock {
  private type: OutputBlockType;

  private name: string;

  private variables: OutputVariable[];
  private statements: OutputStatement[];

  constructor(
    type: OutputBlockType,
    name: string,
  ) {
    this.type = type;
    this.name = name;
    this.variables = [];
    this.statements = [];
  }

  pushVariable(variable: OutputVariable) {
    this.variables.push(variable);
  }

  pushStatement(statement: OutputStatement) {
    this.statements.push(statement);
  }

  process() {
    this.variables.sort((a, b) => {
      return a.getHash() - b.getHash();
    });
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

    const size = this.variables.length;

    if (this.type === OutputBlockType.Module) {
      parts.push("  ");
      parts.push("t_value *module = value_factory_object(");
      parts.push("\n");
      parts.push("    ");
      parts.push("type_object"); // TODO
      parts.push(",");
      parts.push("\n");
      parts.push("    ");
      parts.push(size.toString());
      for (const variable of this.variables) {
        parts.push(",");
        parts.push("\n");
        parts.push("    ");
        parts.push(variable.getHash().toString());
      }
      parts.push("\n");
      parts.push("  ");
      parts.push(")");
      parts.push(";\n");
      parts.push("t_object *this = (t_object *)module;\n");
    }

    for (const statement of this.statements) {
      parts.push("  ");
      for (const part of statement.generateParts()) {
        parts.push(part);
      }
      parts.push(";\n");
    }

    if (this.type === OutputBlockType.Module) {
      parts.push("  return module;\n");
    }

    parts.push("}\n");
    return parts;
  }
}
