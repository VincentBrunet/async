import { expandGlob } from "https://deno.land/std@0.63.0/fs/mod.ts";
import { AstModule } from "../../data/ast/AstModule.ts";
import { hashAstKey } from "../../lib/hash/hashAstKey.ts";
import { compileCommand } from "../../lib/io/compileCommand.ts";

const stdlibs = new Array<string>();
for await (const file of expandGlob("stdlib/**/*.c")) {
  stdlibs.push(file.path);
}

export async function passObjectToBinary(
  mainAst: AstModule,
  objects: Array<string>,
) {
  const mainPath = await Deno.makeTempFile({
    suffix: ".c",
  });

  const mainContent = new Array<string>();
  mainContent.push("#include <runtime.h>\n");
  mainContent.push("\n");
  mainContent.push("#include");
  mainContent.push(" ");
  mainContent.push("<");
  mainContent.push(mainAst.meta.meta.cache + "/output.h");
  mainContent.push(">");
  mainContent.push("\n");
  mainContent.push("\n");
  mainContent.push("t_ref **(*entry_module)() = ");
  mainContent.push(hashAstKey(mainAst, mainAst, "module"));
  mainContent.push(";");
  mainContent.push("\n");

  await Deno.writeTextFile(
    mainPath,
    mainContent.join(""),
  );

  const compileBinary = await compileCommand(
    [
      "-Wall",
      "-Wpedantic",
      "-I",
      "stdlib",
      ...objects,
      mainPath,
      ...stdlibs,
    ],
  );
}
