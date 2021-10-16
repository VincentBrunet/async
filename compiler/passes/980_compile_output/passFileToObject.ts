import { OutputModule } from "../../data/output/OutputModule.ts";
import { cacheFileFromHash } from "../../lib/io/cacheFileFromHash.ts";
import { compileCommand } from "../../lib/io/compileCommand.ts";

export async function passFileToObject(output: OutputModule) {
  const hash = output.sourceAst.sourceToken.sourceCode.hash;

  const compileObject = await compileCommand(
    [
      "-Wall",
      "-Wpedantic",
      "-I",
      "stdlib",
      "-c",
      await cacheFileFromHash(hash, "output.c"),
      "-o",
      await cacheFileFromHash(hash, "output.o"),
    ],
  );

  if (compileObject.stdout) {
    console.log(compileObject.stdout);
  }
  if (compileObject.stderr) {
    console.log(compileObject.stderr);
  }

  return await cacheFileFromHash(hash, "output.o");
}
