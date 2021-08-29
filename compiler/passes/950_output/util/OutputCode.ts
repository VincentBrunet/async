import { MapArray } from "../../../utils/data/MapArray.ts";

class OutputFunction {
  name: string = "";
  variables = new Set<string>();
  contents: string[] = []
}

export class OutputCode {

  private functions_stack: OutputFunction[] = [];
  private functions_list: OutputFunction[] = [];
  private functions_top?: OutputFunction = undefined;

  pushFunction(name: string) {
    const fn = new OutputFunction()
    fn.name = name;
    this.functions_stack.push(fn)
    this.functions_list.push(fn);
    this.functions_top = fn;
  }
  popFunction() {
    this.functions_stack.pop();
    this.functions_top = this.functions_stack[this.functions_stack.length - 1];
  }

  addVariable(variable: string) {
    this.functions_top?.variables?.add(variable);
  }
  addContent(content: string) {
    this.functions_top?.contents?.push(content);
  }

  getHeader(): string {
    const parts: string[] = [];
    parts.push("#include \"types.h\"\n");
    parts.push("\n");
    for (const fn of this.functions_list) {
      parts.push("\nt_value *");
      parts.push(fn.name);
      parts.push("();");
      parts.push("\n");
    }
    return parts.join("");
  }
  getSource(): string {
    const parts: string[] = [];
    parts.push("#include \"types.h\"\n");
    for (const fn of this.functions_list) {
      parts.push("\nt_value *");
      parts.push(fn.name);
      parts.push("()");
      parts.push("{\n");
      for (const variable of fn.variables) {
        parts.push("  t_variable *");
        parts.push(variable);
        parts.push(";\n");
      }
      for (const content of fn.contents) {
        parts.push(content);
      }
      parts.push("}\n");
    }
    return parts.join("");
  }
}
