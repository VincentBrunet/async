import { OutputModule } from "../../data/output/OutputModule.ts";
import { compileCommand } from "../../lib/io/compileCommand.ts";

export async function passFileToObject(output: OutputModule) {
  const dir = output.sourceAst.sourceToken.sourceCode.cache;

  const compileObject = await compileCommand(
    [
      "-Wall",
      "-Wpedantic",
      "-I",
      "stdlib",
      "-c",
      dir + "/output.c",
      "-o",
      dir + "/output.o",
    ],
  );

  if (compileObject.stdout) {
    console.log(compileObject.stdout);
  }
  if (compileObject.stderr) {
    console.log(compileObject.stderr);
  }

  return dir + "/output.o";
}
