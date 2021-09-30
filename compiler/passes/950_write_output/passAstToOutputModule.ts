import { AstModule } from "../../data/ast/AstModule.ts";
import { OutputModule } from "./util/OutputModule.ts";
import { writeModule } from "./write/writeModule.ts";

export async function passAstToOutputModule(
  ast: AstModule,
) {
  const output = new OutputModule(ast.hash);
  writeModule(output, ast);
  return output;
}
