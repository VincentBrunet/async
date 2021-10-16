import { FileModule } from "../../data/file/FileModule.ts";
import { compileCommand } from "../../lib/io/compileCommand.ts";

export async function passFileToObject(file: FileModule) {
  const compileObject = await compileCommand(
    [
      "-Wall",
      "-Wpedantic",
      "-I",
      "stdlib",
      "-c",
      file.source,
      "-o",
      file.object,
    ],
  );

  if (compileObject.stdout) {
    console.log(compileObject.stdout);
  }
  if (compileObject.stderr) {
    console.log(compileObject.stderr);
  }

  return file.object;
}
