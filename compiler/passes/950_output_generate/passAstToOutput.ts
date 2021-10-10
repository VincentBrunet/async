import { AstModule } from "../../data/ast/AstModule.ts";
import { makeRecursorPassAdvanced } from "../util/makeRecursorPassAdvanced.ts";
import { OutputModule } from "./util/OutputModule.ts";
import { writeModule } from "./write/writeModule.ts";

const pass = makeRecursorPassAdvanced((scope) => scope, {});

export async function passAstToOutput(
  ast: AstModule,
) {
  const output = new OutputModule(ast);
  writeModule(output, ast);
  return output;
}
